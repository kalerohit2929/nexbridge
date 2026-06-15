import React from 'react'
import Hero from '../Components/Hero'
import TrustSection from '../Components/Trust'
import Services from '../Components/Services'
import Industries from '../Components/Industries'
import Process from '../Components/Process'
import Regions from '../Components/Map'
import Cards from '../Components/Cards'
import ContactForm from '../Components/Form'

const Home = () => {
  return (
    <>
      <Hero />
      <TrustSection />
      <Services />
      <Industries />
      <Process />
      <Regions />
      <Cards />

      {/* scroll-mt offsets the fixed navbar (72px height) so the form isn't hidden behind it */}
      <div id="contact-form" style={{ scrollMarginTop: '72px' }}>
        <ContactForm />
      </div>
    </>
  )
}

export default Home

