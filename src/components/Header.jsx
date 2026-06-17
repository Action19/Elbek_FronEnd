import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
function Header({endFulllesson}) {
const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear();
        navigate("/login"); // 🚀 Login sahifasiga yo‘naltirish
    }

    
    return (

        <>


            <div>
               
            <header>
                    <div className="header-area header-transparent">
                        <div className="main-header ">
                            <div className="header-bottom  header-sticky">
                                <div className="container-fluid">
                                    <div className="row align-items-center">
                                        {/* Logo */}
                                        <div className="col-xl-2 col-lg-2">
                                            <div className="logo">
                                                <a href="index.html"><img src="assets/img/logo/logo.png" alt={true} /></a>
                                            </div>
                                        </div>
                                        <div className="col-xl-10 col-lg-10">
                                            <div className="menu-wrapper d-flex align-items-center justify-content-end">
                                                {/* Main-menu */}
                                                <div className="main-menu d-none d-lg-block">
                                                    <nav>
                                                        <ul id="navigation">
                                                            <li className="active"><Link to={"/"}>Bosh sahifa</Link></li>
                                                            {localStorage.getItem('token') && <li><Link to={"/courses"}>Darslar</Link></li>}
                                                            {localStorage.getItem('token') && endFulllesson && <li><Link to={"/test"}>Test</Link></li>}
                                                            {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'))?.role === "Admin" && <li><Link to={"/users"}>Foydalanuvchilar</Link> </li>}
                                                        
                                                            <li><a href="contact.html">Contact</a></li>
                                                            {/* Button */}
                                                            {localStorage.getItem('token') && <li className="button-header margin-left "><Link to={'/profile'} className="btn btn3">Salom {jwtDecode(localStorage.getItem('token')).fullname}</Link></li>}
                                                            {!localStorage.getItem('token') && <li className="button-header"><Link to={"/login"} className="btn btn3">Kirish</Link></li>}
                                                            {localStorage.getItem('token') && <li className="button-header"><a href="#" onClick={handleLogout} className="btn btn3">Chiqish</a></li>}
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Mobile Menu */}
                                        <div className="col-12">
                                            <div className="mobile_menu d-block d-lg-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Header End */}
                </header>
                
                
                {/* Scroll Up */}
              
            </div>





        </>
    )

}

export default Header