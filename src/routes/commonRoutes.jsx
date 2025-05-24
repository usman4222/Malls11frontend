import { Route } from 'react-router-dom';
import LandingPage from '../pages/site/LandingPage';
import AboutUs from '../pages/site/AboutUs';
import ContactUs from '../pages/site/ContactUs';
import Faq from '../pages/site/Faq';
import TermCondition from '../pages/site/TermCondition';
import Blogs from '../pages/site/blog/blogs';

const siteRoutes = () => ([
    <Route path="/" element={<LandingPage />} key="landing" />,
    <Route path="/about" element={<AboutUs />} key="about" />,
    <Route path="/contact" element={<ContactUs />} key="contact" />,
    <Route path="/faq" element={<Faq />} key="faq" />,
    <Route path="/terms" element={<TermCondition />} key="terms" />,
    <Route path="/blogs" element={<Blogs />} key="blogs" />,
]);

export default siteRoutes;
