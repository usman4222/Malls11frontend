import { Outlet } from 'react-router-dom';
import NavBar from '../../components/SiteComponents/NavBar';
import Footer from '../../components/SiteComponents/Footer';
import FollowCursor from '../../components/SiteComponents/CursorComponents/FollowCursor';
import FluidCursor from '../../components/SiteComponents/CursorComponents/FluidCursor';

const CommonLayout = () => (
    <>
        <FollowCursor />
        <FluidCursor />
        <NavBar />
        <Outlet />
        <Footer />
    </>
);

export default CommonLayout;
