import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx'

const Home =({children})=>{
    return (
        <ErrorBoundary >
            <Navbar />
            <Outlet />
            <Footer />
        </ErrorBoundary>
    )
}

export default Home;