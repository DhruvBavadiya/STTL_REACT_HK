import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

const CheckoutPage = () => {
  // State for form inputs
  const [formData, setFormData] = React.useState({
    email: '',
    cardHolder: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    billingAddress: '',
    billingState: 'State',
    billingZIP: '',
  });

  // State for form field errors
  const [formErrors, setFormErrors] = React.useState({
    email: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  // Validation rules
  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return '';
  };

  const validateCardNumber = (cardNumber: string): string => {
    if (!cardNumber) return 'Card number is required';
    if (!/^\d{12}$/.test(cardNumber)) return 'Card number must be 12 digits';
    return '';
  };

  const validateCardCVC = (cardCVC: string): string => {
    if (!cardCVC) return 'CVC is required';
    if (!/^\d{3}$/.test(cardCVC)) return 'CVC must be 3 digits';
    return '';
  };

  // Handle form input change with validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'cardNumber':
        error = validateCardNumber(value);
        break;
      case 'cardCVC':
        error = validateCardCVC(value);
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there are any validation errors
    for (const key in formData) {
      if (key !== 'billingState' && !formData[key as keyof typeof formData]) {
        const error = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        setFormErrors({ ...formErrors, [key]: error });
        return;
      }
    }

    // Add logic for submitting data or making API calls here
    console.log('Form submitted with:', formData);
  };

  
  const [total,setTotal] = useState(0)
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    setTotal(calculateTotal());
   
  }, [])

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-50 px-6 py-8 rounded-lg shadow-lg">
      <p className="text-xl font-medium mb-4">Payment Details</p>
      <p className="text-gray-400 mb-6">Complete your order by providing your payment details.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
       
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`mt-1 w-full p-4 rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            placeholder="your.email@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        {/* Card Holder */}
        <div>
          <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="card-no"
            name="cardNumber"
            className={`mt-1 w-full p-4 rounded-md border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            placeholder="xxxx-xxxx-xxxx-xxxx"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
          {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
        </div>

        {/* Card Details */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="card-no" className="block text-sm font-medium text-gray-700">
              Card Holder
            </label>
            <input
              type="text"
              id="card-holder"
              name="cardHolder"
              className="mt-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
              value={formData.cardHolder}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">
              Expiry Date (MM/YY)
            </label>
            <input
              type="month"
              id="card-expiry"
              name="cardExpiry"
              className={`mt-1 w-full p-2 rounded-md border ${formErrors.cardExpiry ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              value={formData.cardExpiry}
              onChange={handleInputChange}
              required
            />
            {formErrors.cardExpiry && <p className="text-red-500 text-sm mt-1">{formErrors.cardExpiry}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="password"
              id="card-cvc"
              name="cardCVC"
              className={`mt-1 w-full p-2 rounded-md border ${formErrors.cardCVC ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              placeholder="CVC"
              value={formData.cardCVC}
              onChange={handleInputChange}
              required
            />
            {formErrors.cardCVC && <p className="text-red-500 text-sm mt-1">{formErrors.cardCVC}</p>}
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700">
            Billing Address
          </label>
          <input
            type="text"
            id="billing-address"
            name="billingAddress"
            className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Street Address"
            value={formData.billingAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Total Section */}
        <div className="border-t border-b py-4">
          <div className="flex justify-between mt-4">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-gray-900 text-white rounded-md px-6 py-3 font-medium hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
