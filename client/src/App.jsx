import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Testimonials from './Components/Testimonials'
import Footer from './Components/Footer'
import Projects from './Components/Projects'
function App() {
const [count, setCount] = useState(0)

  return (
    <>
     <Navbar></Navbar>
     <Hero></Hero>
     <Projects />
     <Testimonials></Testimonials>
     <Footer></Footer>
    </>
  )
}

export default App
