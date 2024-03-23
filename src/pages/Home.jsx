import Productslist from "../components/Productslist";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx'

const Home =({children})=>{
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home;