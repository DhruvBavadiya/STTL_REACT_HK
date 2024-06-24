import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/auth';
import { AuthContext } from '../Context/authContext';
import { useDispatch } from 'react-redux';
import { updateUserId } from '../Store/cartSlice';
import { fetchUserCartFromDatabase } from '../Service/product';

interface LoginProps {
  // Define any props if needed
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    setFormError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!password) {
      setFormError('Password is required');
      return;
    }

    try {
      const userData = await loginUser(email, password);
      console.log('User logged in:', userData);

      localStorage.setItem('userData', JSON.stringify(userData._id));
      setIsLoggedIn(true);
      dispatch(updateUserId(userData._id));

      // Fetch user's cart items from database after successful login
      // Assuming you have a function to fetch user's cart from database

      // Compare with local storage cart items
      

      // Update local storage with merged cart items

      // Navigate to home page after syncing cart items
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error === 'user is not registered.') {
        setFormError('User is not registered.');
      } else if (error === 'password is wrong.') {
        setFormError('Password is incorrect.');
      } else {
        setFormError('Login failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userData');
    if (storedUserId) {
      // Optionally, you can redirect the user if already logged in
      // navigate('/');
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Background image container */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          flexGrow: 1,
          flexShrink: 1,
        }}
      ></div>

      {/* Login form container */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Logo and title */}
          <div className="px-6 py-8 sm:px-10">
            <div className="flex items-center justify-center">
              <img
                className="h-16 w-16 rounded-full"
                src="https://www.shutterstock.com/shutterstock/photos/1849361008/display_1500/stock-vector-initial-based-hk-kh-logo-template-unique-monogram-alphabet-letters-design-and-vector-1849361008.jpg"
                alt="Your Company"
              />
              <h2 className="ml-2 text-xl font-bold leading-9 text-gray-900">
                Sign in to your account
              </h2>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Email input */}
              <div>
                <label
                  htmlFor="email"
                  className="text-left block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={`block w-full p-4 py-4 rounded-md border ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 sm:text-sm sm:leading-5`}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-500">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Password input */}
              <div className="mt-6">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full p-4 py-4 rounded-md border ${
                      formError ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 sm:text-sm sm:leading-5`}
                  />
                  {formError && (
                    <p className="mt-2 text-sm text-red-500">{formError}</p>
                  )}
                </div>
              </div>

              {/* Sign in button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
