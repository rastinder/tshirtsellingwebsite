import React, { useState } from 'react';
import { useReplicateClient } from '@replicate/react';

export default function AIDesigner() {
  const [prompt, setPrompt] = useState('');
  const [design, setDesign] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Here you would integrate with your chosen AI image generation service
      // This is a placeholder for the actual implementation
      const response = await new Promise(resolve => 
        setTimeout(() => resolve('/placeholder-design.jpg'), 2000)
      );
      setDesign(response as string);
    } catch (error) {
      console.error('Error generating design:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Describe your t-shirt design
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., A cosmic wolf howling at a neon moon with abstract geometric patterns"
        />
      </div>

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        onClick={handleGenerate}
        disabled={!prompt || loading}
      >
        {loading ? 'Generating...' : 'Generate Design'}
      </button>

      {design && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Your Design</h3>
          <div className="relative aspect-square">
            <img 
              src={design} 
              alt="Generated t-shirt design" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}