import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sliderarea from './Sliderarea'


function Login() {
    const navigate = useNavigate(); // 🔹 Navigatsiya uchun hook
    const [userData, setUserData] = useState([]);
    const [spin, setSpin] = useState(false)

    async function loginHandle(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let newUser = Object.fromEntries(formData);

        if (newUser.email === '' || newUser.password === '') {
            alert("Barcha maydonlarni to'ldirish shart!");
            return;
        }

        const response = await fetch("https://elbek-backend.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        const data = await response.json();
        

        if (response.ok) {
            localStorage.setItem("token", data.token); // 🔹 Tokenni saqlash
            alert("Tizimga kirdingiz!");
            navigate("/"); // 🔹 Foydalanuvchini bosh sahifaga yo'naltirish
            setUserData(data)
        } else {
            alert("Xatolik: " + data.message);
        }
    }

    return (
        <>

            <section className="slider-area ">
                <div className="slider-active">
                    {/* Single Slider */}
                    <div className="single-slider slider-height d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-7 col-md-12">
                                    <div className="hero__caption">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <form className="form-default " method="POST" onSubmit={loginHandle}>
                <div className="login-form">
                    <h2>Shu yerdan kiring</h2>
                    <div className="form-input">
                        <label htmlFor="name">Email</label>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form-input">
                        <label htmlFor="name">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-input pt-30">
                        <button type="submit" name="submit" >Kirish</button>
                    </div>

                    <a href="#" className="forget">Parolni unutdingizmi?</a>

                    <Link to={"/register"} className="registration" disabled={spin}>{spin ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}</Link>
                </div>
            </form>





        </>
    )
}

export default Login