import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Testimonials from './Components/Testimonials'
function App() {
const [count, setCount] = useState(0)

  return (
    <>
     <Navbar></Navbar>
     <Hero></Hero>
     <Testimonials></Testimonials>
     
    </>
  )
}

export default App
