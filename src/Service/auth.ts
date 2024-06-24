const URL = 'http://localhost:8000'

export const loginUser = async (email: string, password: string) => {
    try {
      // Make sure both email and password are provided
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      // Define the endpoint URL where your backend is hosted
      const endpoint = 'http://localhost:8000/login-user'; // Replace with your actual backend URL
  
      // Make a POST request to the login endpoint
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Handle the response from the server
      if (!response.ok) {
        const errorData = await response.json(); // Assuming server returns JSON error messages
        throw new Error(errorData.message || 'Failed to login');
      }
  
      // Successful login, extract and return the user data
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  

  export const registerUser = async (name: string, email: string, password: string) => {
    try {
        
      const response = await fetch(`${URL}/register-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          throw 'user is registered';
        }
        throw 'registration failed';
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  