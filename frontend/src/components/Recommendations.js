import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations({ userId }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get(`/api/recommendations/${userId}`)
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Recommended Products</h2>
      <ul>
        {recommendations.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
