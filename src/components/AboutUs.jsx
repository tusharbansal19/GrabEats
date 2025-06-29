import React from 'react';
import LogoCard from './LogoCard';
import { FaGithub, FaTwitter, FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">About Us</h1>
         
            <FaGithub size={24} />
          <div className="flex  w-full justify-center 2xl:justify-start gap-4 mb-4">
          <a href="https://github.com" className="text-white hover:text-gray-400 transition-colors">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-pink-500 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://youtube.com" className="text-white hover:text-red-500 transition-colors">
            <FaYoutube size={24} />
          </a>
          <a href="https://discord.com" className="text-white hover:text-indigo-500 transition-colors">
            <FaDiscord size={24} />
          </a>
        </div>
          <p className="text-lg md:text-xl text-gray-300">
            Discover who we are, what we do, and how we strive to make a difference.
          </p>
        </header>

        {/* Our Mission Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-lg text-gray-300">
            At SMA, our mission is to deliver exceptional culinary experiences that bring people together.
            We are dedicated to providing high-quality dishes and outstanding service, ensuring that every meal
            is memorable. Our goal is to foster community and connection through the love of food.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="text-lg text-gray-300">
            Founded in [Year], SMA started with a simple idea: to create a space where food lovers could gather, share
            experiences, and enjoy delicious meals. What began as a small kitchen has grown into a thriving community
            focused on culinary excellence and innovation. 
            <br />
            We believe that food is not just sustenance; it's a celebration of culture, creativity, and connection.
          </p>
        </section>

        {/* Meet Our Team Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* <div className="bg-white text-black p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Chef John Doe</h3>
              <p className="text-sm">Head Chef</p>
              <p className="text-gray-700">
                John is a culinary artist with over 10 years of experience in creating mouth-watering dishes.
              </p>
            </div> */}
            <LogoCard/>
        <LogoCard/>
        <LogoCard/>
          </div>
        </section>

        {/* Connect With Us Section */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">Connect With Us</h2>
          <p className="text-lg text-gray-300">
            We would love to hear from you! Reach out to us with any questions, feedback, or concerns.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  );





























  
};

export default AboutUsPage;
