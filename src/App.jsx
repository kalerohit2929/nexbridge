import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import ServicePage from './Pages/ServicePage'
import IndustriesPage from './Pages/IndustriesPage'
import Coverage from './Pages/Coverage'
import Footer from './Components/Footer'
import ContactPage from './Pages/ContactPage'
import PrivacyPolicy       from './Pages/PrivacyPolicy'
import TermsAndConditions  from './Pages/TermsAndConditions'
import CookiePolicy        from './Pages/CookiePolicy'
// import About from './pages/About'

// import Industries from './pages/Industries'
// import Coverage from './pages/Coverage'
// import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/coverage" element={<Coverage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Footer />
    </>
  )
}
