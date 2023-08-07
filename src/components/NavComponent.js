import { useNavigate } from "react-router-dom";

export default function Nav({ onNavClick }) {
    const endpointToId = {
        Listings: "Listings",
        CreatePost: "CreatePost",
        Profile: "Profile",
        SecSettings: "SecSettings",
        MyServices: "MyServices",
        MyBookings: "MyBookings",
        Booking: "Booking",
    };

    const handleNavClick = (endpoint) => {
        onNavClick(endpoint);
        const activeId = endpointToId[endpoint] || "Listings";
        const links = document.querySelectorAll(".links span");
        links.forEach((link) => {
            if (link.id === activeId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    };

    let navigate = useNavigate();
    const routeLogin = () => {
        let path = `/`;
        navigate(path);
    }

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("user");
        routeLogin();
    };

    return (
        <div className="nav">
            <div className="title">
                <h2>Pearl</h2>
            </div>
            <div className="links">
                <div className="item">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span className="hover-underline-animation active" id="Listings" onClick={() => handleNavClick("Listings")}>Book a Service</span>
                </div>
                <div className="item">
                    <i className="fa-solid fa-plus"></i>
                    <span className="hover-underline-animation" id="CreatePost" onClick={() => handleNavClick("CreatePost")}>Offer a Service</span>
                </div>
                <div className="item">
                    <i className="fa-solid fa-book"></i>
                    <span className="hover-underline-animation" id="MyBookings" onClick={() => handleNavClick("MyBookings")}>My Bookings</span>
                </div>
                <div className="item">
                    <i className="fa-solid fa-list-ul"></i>
                    <span className="hover-underline-animation" id="MyServices" onClick={() => handleNavClick("MyServices")}>My Services</span>
                </div>
                <div className="item">
                    <i className="fa-regular fa-user"></i>
                    <span className="hover-underline-animation" id="Profile" onClick={() => handleNavClick("Profile")}>My Profile</span>
                </div>
                <div className="item">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="hover-underline-animation logout" onClick={handleLogout}>Log Out</span>
                </div>
            </div>
            <p className="copyright">All right reserved. &copy; 2023</p>
        </div>
    );
}