import torch

def download_pretrained_model(model_name):
    model = torch.hub.load('pytorch/vision:v0.10.0', model_name, pretrained=True)
    return model
