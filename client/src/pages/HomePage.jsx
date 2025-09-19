import React from 'react'
import Hero from '../components/Home/Hero'
import WhyChoose from '../components/Home/WhyChoose'
import CallToAction from '../components/Home/CallToAction'
import ContactSection from '../components/Home/Contact'

const HomePage = () => {
  return (
    <div>
        <Hero />
        <WhyChoose />
        <CallToAction />
        <ContactSection />
        
    </div>
  )
}

export default HomePage