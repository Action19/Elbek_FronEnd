import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Certificate = () => {
    
    const userId = jwtDecode(localStorage.getItem('token')).userId;
    const userName = jwtDecode(localStorage.getItem('token')).fullname;

    const generateCertificate = async () => {
      try {
          const formData = new FormData();
          formData.append("userName", userName);
          formData.append("userId", userId);
          formData.append("certificate", new Blob(["PDF"], { type: "application/pdf" }), "certificate.pdf");
  
          console.log("🚀 Yuborilayotgan FormData:", [...formData.entries()]); // ✅ FormData tarkibini tekshirish
  
          const response = await fetch('http://localhost:5001/upload', {
              method: 'POST',
              body: formData, // JSON emas, FormData bo‘lishi kerak!
          });
  
          const data = await response.json();
          console.log("✅ Serverdan javob:", data);
  
      } catch (error) {
          console.error("❌ Xatolik yuz berdi:", error);
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
                        <h1 data-animation="bounceIn" data-delay="0.2s">1-dars</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </section>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Sertifikat yaratish</h2>
            
            <button 
              className="btn btn-primary"
                onClick={generateCertificate} 
                style={{ padding: "10px 20px", cursor: "pointer" }}>
                Generate Certificate
            </button>

            
        </div>
       </>
    );
};

export default Certificate;
