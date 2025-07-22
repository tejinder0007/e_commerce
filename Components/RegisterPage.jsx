// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 // Corrected this line
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleNameChange = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoading(true); // Start loading

  if (name === '' || email === '' || password === '') {
    setError(true);
    setIsLoading(false); // Stop loading
  } else {
    console.log('User registered:', { name, email, password });
    setSubmitted(true);
    setError(false);
    setIsLoading(false); // Stop loading
  }
};


  const successMessage = () => {
    return (
      <div className="success text-green-600 text-center mb-4" style={{ display: submitted? '' : 'none' }}>
        <h1>User {name} successfully registered!</h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="error text-red-600 text-center mb-4" style={{ display: error? '' : 'none' }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-md mt-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h1>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
       <button
  type="submit"
  disabled={isLoading}
  className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {isLoading ? 'Registering...' : 'Register'}
</button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;