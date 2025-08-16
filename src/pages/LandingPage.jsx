import React from 'react'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Featuredtherapists from '../components/FeaturedTherapist.jsx'
import CtaSection from '../components/CtaSection.jsx'
import Footer from '../components/FooterSection.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Galleryhome from '../components/Galleryhome.jsx'
import LandingVideoSection from '../components/VideoHome.jsx'
import WhyChooseNoira from '../components/WhyChooseNoira.jsx'
import MembershipSection from '../components/MembershipSection.jsx'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseNoira />
      <Galleryhome />
      <Services />

      <HowItWorks />
      <MembershipSection />

      <Featuredtherapists />

      <LandingVideoSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

export default LandingPage
