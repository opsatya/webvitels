import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Testimonials from './Components/Testimonials'
import Footer from './Components/Footer'
import Projects from './Components/Projects'
import AboutUs from './Components/AboutUs'
import Error from './Components/Error'
import VisionSection from './Components/VisionSection'
import Service from './Components/Service.jsx'
import Contact from './Components/Contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          {/* Home page route with Hero, Projects, and Testimonials components */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Projects />
                <VisionSection />
                <Testimonials />
              </>
            } 
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
