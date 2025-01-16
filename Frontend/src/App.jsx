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
// Create a Home component that includes Hero, Features, and Pricing
function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar is displayed on all pages */}
      <Navbar />

      {/* Routes define which components to render based on the URL */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>

      {/* Footer is displayed on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
