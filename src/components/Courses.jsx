import { Link } from "react-router-dom"
import Header from "./Header"
import { lessonsData } from '../assets/json/lessons';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Courses() {
    const [data, setData] = useState([]);


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
    // console.log(data?.lastlessons[data?.lastlessons.length - 1]);



    return (
        <>

            <main>
                {/*? slider Area Start*/}
                <section className="slider-area slider-area2">
                    <div className="slider-active">
                        {/* Single Slider */}
                        <div className="single-slider slider-height2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-11 col-md-12">
                                        <div className="hero__caption hero__caption2">
                                            <h1 data-animation="bounceIn" data-delay="0.2s">Pedagogik texnologiyalar</h1>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Courses area start */}
                <div className="courses-area section-padding40 fix">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8">
                                <div className="section-tittle text-center mb-55">
                                    <h2>Bizning kurlarimiz</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            {Array.isArray(data?.lastlessons) && data.lastlessons.length > 0 ? (
                                lessonsData.length + 1 !== data.lastlessons.length ? (
                                    data.lastlessons.map((_, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="properties properties2 mb-30">
                                                <div className="properties__card">
                                                    <div className="properties__img overlay1">
                                                        <a href="#"><img src="assets/img/gallery/ispring-suite-max.jpg" alt="Lesson image" /></a>
                                                    </div>
                                                    <div className="properties__caption">
                                                        <p>{index + 1}-dars</p>
                                                        <h3><a href="#">{lessonsData?.[index]?.title}</a></h3>
                                                        <Link to={`/courses/${index + 1}`} className="border-btn border-btn3">
                                                            Boshlash
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {lessonsData.map((item, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <div className="properties properties2 mb-30">
                                                    <div className="properties__card">
                                                        <div className="properties__img overlay1">
                                                            <a href="#"><img src="assets/img/gallery/ispring-suite-max.jpg" alt="Lesson image" /></a>
                                                        </div>
                                                        <div className="properties__caption">
                                                            <p>{index + 1}-dars</p>
                                                            <h3><a href="#">{item.title}</a></h3>
                                                            <Link to={`/courses/${index + 1}`} className="border-btn border-btn3">
                                                                Boshlash
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div>
                                            <p>
                                                <Link to={`/test`} className="btn btn-success">
                                                    Test ishlash
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                )
                            ) : (
                                <p>Ma'lumot yuklanmoqda...</p>
                            )}











                        </div>


                    </div>
                </div>
                {/* Courses area End */}





            </main>


        </>
    )
}
export default Courses