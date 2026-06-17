import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

function Profile() {
    const [data, setData] = useState([]);
    const [certificateUrl, setCertificateUrl] = useState(null);
    const [userId, setUserId] = useState(null);


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

                const response = await fetch(`http://localhost:5001/users/${userId}`);

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
        const fetchCertificate = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/certificate/${userId}`, {
                    responseType: "blob" // 🔹 PDF faylni olish uchun
                });

                const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
                setCertificateUrl(url);
            } catch (error) {
                console.error("❌ Sertifikatni olishda xatolik:", error);
            }
        };

        if (userId) fetchCertificate();
    }, [userId]);
   

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const decoded = jwtDecode(localStorage.getItem("token"));
            setUserId(decoded.userId);
        }
    }, []);

    const fetchCertificate = async () => {
        try {
            const response = await axios.get(`https://elbek-backend.onrender.com/certificate/${userId}`, { responseType: "blob" });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            setCertificateUrl(url);
        } catch (error) {
            console.error("❌ Sertifikatni yuklashda xatolik:", error);
        }
    };




    return (

        <>
            <section className="slider-area slider-area2">
                <div className="slider-active">
                    {/* Single Slider */}
                    <div className="single-slider slider-height2">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-11 col-md-12">
                                    <div className="hero__caption hero__caption2">
                                        <h1 data-animation="bounceIn" data-delay="0.2s">Foydalanuvchi saxifasi</h1>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='row m-3'>
                <div className="col-lg-6 col-md-8">
                    <h3 className="mb-30">Foydalanuvchi ma'lumotlari</h3>
                    <h2>

                    {data && <form action="#">
                        
                        <div className="mt-10">
                            <input type="text" name="fullname" placeholder={data?.fullname}  />
                        </div>
                        <div className="mt-10">
                            <input type="email"  name="email" placeholder={data?.email}  />
                        </div>
                        <div className="mt-10">
                            <input type="password" name="password" placeholder={data?.password}  />
                        </div>
                        <a href="#" className="genric-btn primary circle m-3">Saqlash</a>


                    </form >}
                    </h2>
                </div>

                <div className='col'>

                <div className="profile-container">
            <h2>Profil Sahifasi</h2>

            {certificateUrl ? (
                <div className="certificate-section">
                    <h3>Sizning Sertifikatingiz:</h3>
                    <iframe src={certificateUrl} width="100%" height="400px" title="Sertifikat" />

                </div>
            ) : (
                <p>🚫 Sizda hali sertifikat mavjud emas.</p>
            )}
        </div>

                </div>

            </div>









        </>
    )

}

export default Profile