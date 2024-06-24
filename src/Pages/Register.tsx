import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom'; // Assuming you have react-router-dom installed and properly configured
import { registerUser } from '../Service/auth';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  // Define any props if needed
}

const Register: React.FC<RegisterProps> = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateUsername = (username: string): boolean => {
    return username.length >= 4;
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/; // At least 8 characters, one letter, one number, and allows @
    return re.test(password);
  };


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (!validateUsername(e.target.value)) {
      setUsernameError('Username must be at least 4 characters long');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number');
    } else {
      setPasswordError('');
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError('');
    setFormError('');
    setSuccessMessage('');

    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!username) {
      setFormError('Username is required');
      return;
    }

    if (!password) {
      setFormError('Password is required');
      return;
    }

    try {
      const response = await registerUser(username,email,password);
      console.log('User registered:', response);
      setSuccessMessage('Registration successful! You can now log in.');
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error);

      if (error === 'user is registered') {
        setFormError('User is already registered.');
      } else {
        setFormError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          flexGrow: 1,
          flexShrink: 1,
        }}
      ></div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-8 sm:px-10">
            <div className="flex items-center justify-center">
              <img
                className="h-16 w-16 rounded-full"
                src="https://www.shutterstock.com/shutterstock/photos/1849361008/display_1500/stock-vector-initial-based-hk-kh-logo-template-unique-monogram-alphabet-letters-design-and-vector-1849361008.jpg"
                alt="Your Company"
              />
              <h2 className="ml-2 text-xl font-bold leading-9 text-gray-900">
                Create your account
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="text-left block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                    // onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full p-4 py-4 rounded-md border ${
                      usernameError ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 sm:text-sm sm:leading-5`}
                  />
                  {usernameError && (
                    <p className="mt-2 text-sm text-red-500">{usernameError}</p>
                  )}
                </div>
              </div>

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
                    // name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter Email"
                    // required
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

              <div className="mt-6">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
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
                    onChange={handlePasswordChange}
                    className={`block w-full p-4 py-4 rounded-md border ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 sm:text-sm sm:leading-5`}
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-500">{passwordError}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>

            {successMessage && (
              <p className="mt-6 text-center text-sm text-green-500">
                {successMessage}
              </p>
            )}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
