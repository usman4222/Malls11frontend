import HeroSection from './LandingPageSections/HeroSection'
import Services from './LandingPageSections/Services'
import FeaturedServices from './LandingPageSections/FeaturedServices'
import Freelancer from './LandingPageSections/Freelancer'
import ServicesSlider from './LandingPageSections/ServicesSlider'

const LandingPage = () => {
    return (
        <>
            <HeroSection />
            <Services />
            <FeaturedServices />
            <ServicesSlider />
            <Freelancer />
        </>
    )
}

export default LandingPage
