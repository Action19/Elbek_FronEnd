import "./assets/css/bootstrap.min.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/slicknav.css";
import "./assets/css/flaticon.css";
import "./assets/css/progressbar_barfiller.css";
import "./assets/css/gijgo.css";
import "./assets/css/animate.min.css";
import "./assets/css/animated-headline.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/themify-icons.css";
import "./assets/css/slick.css";
import "./assets/css/nice-select.css";
import "./assets/css/style.css"; // Asosiy CSS fayl

import { createPopper } from "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "jquery/dist/jquery.min";
// import "jquery/dist/jquery.min.js"; // Agar jQuery ishlatilsa
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap uchun

// import "./assets/js/popper.min.js";
// import "./assets/js/jquery.slicknav.min.js";
// import "./assets/js/owl.carousel.min.js";
// import "./assets/js/slick.min.js";
// import "./assets/js/wow.min.js";
// import "./assets/js/animated.headline.js";
// import "./assets/js/jquery.magnific-popup.js";
// import "./assets/js/gijgo.min.js";
// import "./assets/js/jquery.nice-select.min.js";
// import "./assets/js/jquery.sticky.js";
// import "./assets/js/jquery.barfiller.js";
// import "./assets/js/jquery.counterup.min.js";
// import "./assets/js/waypoints.min.js";
// import "./assets/js/jquery.countdown.min.js";
// import "./assets/js/hover-direction-snake.min.js";
// import "./assets/js/contact.js";
// import "./assets/js/jquery.form.js";
// import "./assets/js/jquery.validate.min.js";
// import "./assets/js/mail-script.js";
// import "./assets/js/jquery.ajaxchimp.min.js";
// import "./assets/js/plugins.js";
// import "./assets/js/main.js";


import { useEffect, useState } from 'react'
import Home from './components/home.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/Login.jsx'
import Courses from "./components/Courses.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScroolUp from "./components/ScroolUp.jsx";
import Player from "./components/Player.jsx";
import QuizApp from "./components/QuizApp.jsx";
import Register from "./components/Register.jsx";
import Users from "./components/Users.jsx";
import { lessonsData } from './assets/json/lessons';
import { jwtDecode } from "jwt-decode";
import Profile from "./components/Profile.jsx";
import Certificate from "./components/Certificate.jsx";

function App() {
  const [endFulllesson, setendFulllesson] = useState(false);
  const [data, setData] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token topilmadi!");
                return;
            }

            const decoded = jwtDecode(token);
            const userId = decoded.userId; // `userId` token ichida bo'lishi kerak

            const response = await fetch(`https://elbek-backend.onrender.com/users/${userId}`);

            if (!response.ok) {
                throw new Error(`Server xatosi: ${response.status}`);
            }

            const d = await response.json();
            setData(d);
        } catch (error) {
            console.error("Ma'lumotni olishda xatolik:", error);
        }
    };

    fetchData();

    // Cleanup uchun funksiya (agar kerak bo'lsa)
    return () => {
        setData(null);
    };
}, []);
  
 


  useEffect(() => {
    const scripts = [
      "/assets/js/vendor/jquery-1.12.4.min.js",
      "/assets/js/popper.min.js",
      "/assets/js/bootstrap.min.js",
      "/assets/js/jquery.slicknav.min.js",
      "/assets/js/owl.carousel.min.js",
      "/assets/js/slick.min.js",
      "/assets/js/wow.min.js",
      "/assets/js/animated.headline.js",
      "/assets/js/jquery.magnific-popup.js",
      "/assets/js/gijgo.min.js",
      "/assets/js/jquery.nice-select.min.js",
      "/assets/js/jquery.sticky.js",
      "/assets/js/jquery.barfiller.js",
      "/assets/js/jquery.counterup.min.js",
      "/assets/js/waypoints.min.js",
      "/assets/js/jquery.countdown.min.js",
      "/assets/js/hover-direction-snake.min.js",
      "/assets/js/contact.js",
      "/assets/js/jquery.form.js",
      "/assets/js/jquery.validate.min.js",
      "/assets/js/mail-script.js",
      "/assets/js/jquery.ajaxchimp.min.js",
      "/assets/js/plugins.js",
      "/assets/js/main.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

// console.log(lessonsData.length);
 

// if (Array.isArray(data?.lastlessons) && data?.lastlessons.length === lessonsData.length){
//     setendFulllesson(true);
    
// } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/auth/login' element ={<Login />} />
        <Route path='/courses' element ={<Courses endFulllesson={endFulllesson} setendFulllesson = {setendFulllesson} />} /> 
        <Route path='/courses/:id' element ={<Player />} /> 
        <Route path='/test' element ={<QuizApp />} /> 
        <Route path='/register' element ={<Register />} /> 
        <Route path='/users' element ={<Users />} /> 
        <Route path='/profile' element ={<Profile />} /> 
        <Route path='/certificate' element ={<Certificate />} /> 

        
      </Routes>
<Header endFulllesson={endFulllesson} setendFulllesson = {setendFulllesson}/>
<Footer />
<ScroolUp />
    </BrowserRouter>

  )
}

export default App
