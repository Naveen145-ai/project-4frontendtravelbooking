import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-blue-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-800">About Us</h1>
        <p className="text-gray-700 mt-4 text-lg text-center">
          Welcome to <span className="font-semibold">Your Travel Portal</span> – Your Gateway to Unforgettable Journeys!
        </p>
        <p className="text-gray-600 mt-4 text-center">
          At <span className="font-semibold">Your Travel Portal</span>, we believe that travel is about more than just destinations—it's about experiences, adventure, and creating memories. 
          We provide the best deals on flights, hotels, and vacation packages with seamless booking experiences.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <p>✅ Best Price Guarantee – Competitive rates for flights, hotels, and more.</p>
            <p>✅ Easy & Secure Bookings – Safe payment options and instant confirmations.</p>
            <p>✅ 24/7 Customer Support – Dedicated support whenever you need it.</p>
            <p>✅ Customized Travel Plans – Tailored experiences to match your preferences.</p>
          </ul>
        </div>
        <p className="text-center text-gray-700 mt-6">
          🌍 Your journey starts with us. Let’s make it memorable! ✈️
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
