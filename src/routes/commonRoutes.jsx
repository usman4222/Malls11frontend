import { Route } from 'react-router-dom';
import LandingPage from '../pages/site/LandingPage';
import AboutUs from '../pages/site/AboutUs';
import ContactUs from '../pages/site/ContactUs';
import Faq from '../pages/site/Faq';
import TermCondition from '../pages/site/TermCondition';
import Blogs from '../pages/site/blog/blogs';
import Projects from '../pages/site/Projects';
import Freelancers from '../pages/site/Freelancers';
import ProjectDetail from '../pages/site/ProjectDetail';
import { ProtectedRoute } from './protectedRoutes/protectedRoute';
import FreelancerProfile from '../pages/site/FreelancerProfile';

const siteRoutes = () => ([
    <Route path="/" element={<LandingPage />} key="landing" />,
    <Route path="/about" element={<AboutUs />} key="about" />,
    <Route path="/contact" element={<ContactUs />} key="contact" />,
    <Route path="/faq" element={<Faq />} key="faq" />,
    <Route path="/terms" element={<TermCondition />} key="terms" />,
    <Route path="/blogs" element={<Blogs />} key="blogs" />,
    <Route path="/projects" element={<Projects />} key="projects" />,
    <Route path="/frelancers" element={<Freelancers />} key="frelancers" />,
    <Route
        path="/projects/project-details/:id"
        element={
            // <ProtectedRoute>
                <ProjectDetail />
            // </ProtectedRoute>
        }
        key="project-details"
    />,
    <Route
        path="/frelancers/frelancer-details/:id"
        element={
            // <ProtectedRoute>
                <FreelancerProfile />
            // </ProtectedRoute>
        }
        key="frelancer-details"
    />,
]);

export default siteRoutes;
