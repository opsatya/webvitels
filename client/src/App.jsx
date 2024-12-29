import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Testimonials from './Components/Testimonials'
import Footer from './Components/Footer'
import Projects from './Components/Projects'
import AboutUs from './Components/AboutUs'
import Error from './Components/Error'
import Service from './Components/Service.jsx'
import ServicePages from './pages/ServicePages'
import Contact from './Components/Contact'
import TeamSection from './Components/TeamSection.jsx'
import TeamMemberPage from './pages/TeamMemberPage'

import What_We_Do from './Components/What_We_Do.jsx'
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
                <What_We_Do />
                <Testimonials />
              </>
            } 
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<TeamSection />} />
          <Route path="/team/:id" element={<TeamMemberPage />} />
          <Route path="/services/:id" element={<ServicePages />} />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
