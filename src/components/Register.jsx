import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sliderarea from './Sliderarea'


function Register() {
const navigate = useNavigate();
const [valid, setValid] = useState(false)
const [spin, setSpin] = useState(false)
const [message, setMessage] = useState('')

function handleChange(e) {
    setValid(false)
    setMessage('')
  }
    async function registerHandle(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        let newUser = Object.fromEntries(formData)
        
       
        

        if (newUser.fullname === '' ||
            newUser.email === '' ||
            newUser.password === ''||
            newUser.password2 === '') {
            setValid(true)
            setMessage("Barcha maydonlarni to'ldirish shart")
            return
        }

        if(newUser.password !== newUser.password2){
            setValid(true)
            setMessage("Parolni tasdiqlash mos kelmadi")
            return
        }

         delete newUser?.password2

        // newUser = JSON.stringify(newUser);
        try {
            setSpin(true)     
            const response = await fetch('https://elbek-backend.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                 
                body: JSON.stringify(newUser)
            })

            const data = await response.json();
            if(response.ok) {
                alert("Mvaffaqqiyatli ro'yhatdan o'tdingiz")
                navigate("/login");
                setSpin(false)
                return
            }
            else {
                alert("Xatolik: " + data.message);
            }

        } catch (error) {
            console.log(error);
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



            <form className="form-default" onSubmit={registerHandle}>
                <div className="login-form">
                    
                    <h2>Ro'yhatdan o'tish</h2>
                    {valid && <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>}
                    <div className="form-input">
                        <label htmlFor="name">Ismi va familiyangiz</label>
                        <input type="text" name="fullname" onChange={handleChange} placeholder="Ismi va familiyangiz" />
                    </div>
                    <div className="form-input">
                        <label htmlFor="name">Email Address</label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Email Address" />
                    </div>
                    <div className="form-input">
                        <label htmlFor="name">Parol</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                    </div>
                    <div className="form-input">
                        <label htmlFor="name">Parolni tasdiqlang</label>
                        <input type="password" name="password2" onChange={handleChange} placeholder="Parolni tasdiqlang" />
                    </div>
                    <div className="form-input pt-30">
                        <button type="submit" name="submit">Ro'yhatdan o'tish</button>
                    </div>
                    {/* Forget Password */}
                    <Link to={"/login"} className="registration">Kirish</Link>
                </div>
            </form>






        </>
    )
}

export default Register