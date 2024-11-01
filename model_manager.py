import os
import socket
import logging
import json
import shutil
import hashlib
from pathlib import Path
from typing import Optional, Dict
from datetime import datetime
import zeroconf
import asyncio
import aiohttp
from zeroconf.asyncio import AsyncZeroconf
from zeroconf import ServiceStateChange
from huggingface_hub import snapshot_download, HfFolder
from tqdm import tqdm

logger = logging.getLogger(__name__)

class ModelManager:
    # ... rest of the code ...

    async def get_model(self, model_id: str, token: str) -> bool:
        model_path = self._get_model_path(model_id)
        if model_path.exists():
            logger.info(f"Model {model_id} already in cache")
            return True

        # Try LAN first
        peer_ip = await self.discover_model(model_id)
        if peer_ip:
            try:
                success = await self._transfer_from_peer(model_id, peer_ip)
                if success:
                    logger.info(f"Model {model_id} transferred from LAN peer")
                    return True
            except Exception as e:
                logger.warning(f"LAN transfer failed: {str(e)}")

        # Download only the pretrained model files from Hugging Face
        try:
            logger.info(f"Downloading model {model_id} from Hugging Face")

            download_path = self.downloads_dir / f"{model_id.replace('/', '_')}_temp"
            if download_path.exists():
                shutil.rmtree(download_path)

            # Define patterns for the pretrained model files
            pretrained_patterns = [
                "*.safetensors",  # Model weights
                "*.bin",          # Binary files
                "*.json",         # JSON config files
                "*.txt",          # Text files
                "*.yaml",         # YAML config files
                "*.py",            # Python files
                "config.json"      # Main config
            ]

            snapshot_path = snapshot_download(
                model_id,
                cache_dir=str(download_path),
                token=token,
                resume_download=True,
                local_files_only=False,
                allow_patterns=pretrained_patterns,
                force_download=True  # Force fresh download
            )

            if model_path.exists():
                shutil.rmtree(model_path)
            shutil.move(snapshot_path, model_path)

            if download_path.exists():
                shutil.rmtree(download_path)

            model_hash = self._calculate_hash(model_path)
            self.model_info[model_id] = {
                "path": str(model_path),
                "hash": model_hash,
                "timestamp": str(datetime.now())
            }
            self._save_model_info()

            return True

        except Exception as e:
            logger.error(f"Failed to download model: {str(e)}")
            if download_path.exists():
                shutil.rmtree(download_path)
            return False

    # ... rest of the code ...
