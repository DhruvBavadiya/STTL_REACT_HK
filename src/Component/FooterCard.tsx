import React from 'react'
import { Link } from 'react-router-dom'

export const FooterCard = () => {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link> {/* Replace <a> with <Link> */}
              </li>
              <li>
                <Link to="/all-products" className="text-gray-400 hover:text-white">Products</Link> {/* Replace <a> with <Link> */}
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link> {/* Replace <a> with <Link> */}
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link> {/* Replace <a> with <Link> */}
              </li>
            </nav>
          </div>
  )
}
