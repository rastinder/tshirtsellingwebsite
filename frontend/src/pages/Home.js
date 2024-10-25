import React from 'react';
import Recommendations from '../components/Recommendations';

function Home() {
  const userId = 1; // Dummy user ID for now

  return (
    <div>
      <h1>Welcome to Our AI-Generated T-Shirt Store</h1>
      <p>Browse our collection of custom T-shirts designed with the latest Stable Diffusion models.</p>
      <Recommendations userId={userId} />
    </div>
  );
}

export default Home;
