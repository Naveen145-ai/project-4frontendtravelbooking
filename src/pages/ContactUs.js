import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Contact Us</h1>
        <p className="text-gray-700 text-center mt-2">
          Have questions? Need help with your booking? Contact us anytime!
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Our Office</h2>
          <p className="text-gray-600">📍 [Your Company Address]</p>
          <p className="text-gray-600">📞 Phone: [+Your Contact Number]</p>
          <p className="text-gray-600">✉️ Email: [support@yourtravelportal.com]</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Customer Support Hours</h2>
          <p className="text-gray-600">🕘 Monday - Friday: 9:00 AM - 8:00 PM</p>
          <p className="text-gray-600">🕒 Saturday - Sunday: 10:00 AM - 6:00 PM</p>
        </div>

        <form className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Send Us a Message</h2>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input type="email" className="w-full p-2 border rounded-md" placeholder="Your Email" />
          </div>
         
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-dark-700">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
