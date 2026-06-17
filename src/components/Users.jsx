import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

 function Users() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://elbek-backend.onrender.com/users");

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
    }, []);



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
                                        <h1 data-animation="bounceIn" data-delay="0.2s">Foydalanuvchilar</h1>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='container justify-content-between m-3 '>
            <div className='d-flex justify-content-between'>
                <table className="table table-bordered">
                    <thead>
                        <tr >
                            <th className='bg-primary' scope="col"><h2>#</h2></th>
                            <th className='bg-primary' scope="col"><h2>Foydalanuvchi nomi</h2></th>
                            <th className='bg-primary' scope="col"><h2>E-Mail</h2></th>
                            <th className='bg-primary' scope="col"><h2>Huquqi</h2></th>
                            <th className='bg-primary' scope="col"><h2>Amallar</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index)=> {
                        return(
                        <tr key={item._id}>
                            <th scope="row"><h2>{index+1}</h2></th>
                            <td><h2>{item.fullname}</h2></td>
                            <td><h2>{item.email}</h2></td>
                            <td><h2>{item.role}</h2></td>
                            <td><button type="button" class="btn btn-danger"><i class='fa fa-trash'></i></button></td>
                        </tr>
                            
                        )
                    } )}
                        
                    </tbody>
                </table>

                </div>
            </div>






        </>
    )

}

export default Users