import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserRole, setUserRole] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://localhost:44304/api/Login/SignIn", {
      userName: username,
      password: password,
      userRole: UserRole
    })
    .then((response) => {
      // Assuming your API response contains a property named 'token'
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token); // Store the token in local storage
      console.log('Token:', token);
    })
    .catch((error) => {
      // Handle login error
      console.error('Login failed', error);
    });
  };
  //loutout call function
  // Inside your component or where you handle user actions
const handleLogout = () => {
  logout();
  // Redirect or update the UI as needed after logout
};
  //Logout
  const logout = async () => {
    try {
      await axios.post('https://localhost:44304/api/Login/SignIn');
      console.log('Token removed from localStorage');
      localStorage.removeItem('token'); // Clear the token from localStorage
      // Redirect or update the UI as needed after logout
    } catch (error) {
      // Handle error, if any
      console.error('Logout failed', error);
    }
  };
  
  // Check if the user is already logged in (token exists in local storage)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Perform actions for an authenticated user (e.g., redirect to dashboard)
      // You can also set user state or perform additional API calls here
      console.log('User is logged in with token:', storedToken);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            UserRole:
            <input
              type="text"
              value={UserRole}
              onChange={(e) => setUserRole(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleLogout}>LogOut</button>
      </header>
    </div>
  );
}

export default App;
