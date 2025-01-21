import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import Features from './Components/Features.jsx';
import Pricing from './Components/Pricing.jsx';
import Footer from './Components/Footer.jsx';
import About from './Components/About.jsx';
import SignIn from './Components/Signin.jsx';
import SignUp from './Components/Signup.jsx';
import Exercise from './Components/Exercise.jsx';
import Chat from './Components/Chat.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Bicep from './Exercises/Bicepcurl.jsx';

// Create a Home component that includes Hero, Features, and Pricing
function Home({ isLoggedIn }) {
  return (
    <div>
      <Hero isLoggedIn={isLoggedIn} />
      <Features />
      <Pricing />
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Check if the user is logged in on app load
  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {/* Navbar is displayed on all pages */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Routes define which components to render based on the URL */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Pricing Page */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Sign In Page */}
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />

        {/* Sign Up Page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Exercise Page */}
        <Route path="/exercise" element={<Exercise />}>
          {/* Nested route for individual exercises */}
          <Route path=":exerciseName" element={<Exercise />} />
        </Route>

        {/* Chat Page */}
        <Route path="/chat" element={<Chat />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise/bicep-curls" element={<Bicep />} />
      </Routes>

      {/* Footer is displayed on all pages */}
      <Footer />
    </Router>
  );
}

export default App;