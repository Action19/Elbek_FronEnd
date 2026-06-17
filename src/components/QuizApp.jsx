import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";

const originalQuestions = [
  {
    question: "1. Infografikaning asosiy vazifasi nima?",
    options: [
      "A) Kompyuter tezligini oshirish",
      "B) Ma'lumotlarni vizual va tushunarli ko‘rinishda taqdim etish",
      "C) Fayllarni siqish",
      "D) Matn hajmini oshirish"
    ],
    answer: "B"
  },
  {
    question: "2. PowerPointda aylana shaklidagi diagrammalar yaratish uchun odatda qaysi vositadan foydalaniladi?",
    options: [
      "A) SmartArt yoki Shapes (Shakllar)",
      "B) Spell Check",
      "C) Format Painter",
      "D) Slide Master"
    ],
    answer: "A"
  },
  {
    question: "3. Infografikada turli ranglardan foydalanishning asosiy maqsadi nima?",
    options: [
      "A) Fayl hajmini kattalashtirish",
      "B) Slaydni sekinlashtirish",
      "C) Ma'lumotlarni guruhlarga ajratish va e'tiborni jalb qilish",
      "D) Matnni yashirish"
    ],
    answer: "C"
  },
  {
    question: "4. Video davomida yaratilgan infografikada valyutalar (Dollar, Yevro, Rubl) nima yordamida tasvirlangan?",
    options: [
      "A) Jadval (Table) yordamida",
      "B) Aylana diagramma va grafik elementlar yordamida",
      "C) Audio fayl yordamida",
      "D) WordArt yordamida"
    ],
    answer: "B"
  },
  {
    question: "5. Prezentatsiya dizaynida infografikadan foydalanishning afzalligi qaysi?",
    options: [
      "A) Taqdimotni tushunishni qiyinlashtiradi",
      "B) Ma'lumotlarni tezroq qabul qilishga yordam beradi",
      "C) Slaydlar sonini kamaytiradi",
      "D) Kompyuterni tezlashtiradi"
    ],
    answer: "B"
  },
  {
    question: "6. PowerPoint prezentatsiyasiga 3D model qo‘shish uchun qaysi menyudan foydalaniladi?",
    options: [
      "A) Design (Dizayn)",
      "B) Review (Tekshirish)",
      "C) Insert (Vstavka)",
      "D) Slide Show"
    ],
    answer: "C"
  },
  {
    question: "7. Videoda 3D model sifatida qaysi obyekt ishlatilgan?",
    options: [
      "A) Samolyot",
      "B) Telefon",
      "C) Nexia avtomobili",
      "D) Bino"
    ],
    answer: "C"
  },
  {
    question: "8. Sketchfab saytidan yuklab olingan 3D modelning asosiy vazifasi nima?",
    options: [
      "A) Ovoz yozish",
      "B) Prezentatsiyada uch o‘lchamli obyekt sifatida foydalanish",
      "C) Matn tahrirlash",
      "D) Video montaj qilish"
    ],
    answer: "B"
  },
  {
    question: "9. 3D modelga harakat berish uchun PowerPointning qaysi bo‘limidan foydalaniladi?",
    options: [
      "A) View (Vid)",
      "B) Home (Glavnaya)",
      "C) Animations (Animatsiya)",
      "D) Review (Retsenzirovanie)"
    ],
    answer: "C"
  },
  {
    question: "10. 3D modellarni prezentatsiyada ishlatishning afzalligi nima?",
    options: [
      "A) Slayd hajmini kichraytiradi",
      "B) Taqdimotni yanada ko‘rgazmali va qiziqarli qiladi",
      "C) Printer tezligini oshiradi",
      "D) Faylni PDF ga aylantiradi"
    ],
    answer: "B"
  },
  {
    question: "11. Zamonaviy prezentatsiya yaratishda asosiy e'tibor nimaga qaratiladi?",
    options: [
      "A) Slaydlarga ko‘p matn yozishga",
      "B) Vizual dizayn va ma'lumotni tushunarli taqdim etishga",
      "C) Fayl hajmini kattalashtirishga",
      "D) Slaydlar sonini ko‘paytirishga"
    ],
    answer: "B"
  },
  {
    question: "12. Videoda yangi telefon taqdimoti uchun qaysi elementdan foydalanilgan?",
    options: [
      "A) Audio yozuv",
      "B) Video montaj",
      "C) Mahsulot rasmi (telefon surati)",
      "D) Excel jadvali"
    ],
    answer: "C"
  },
  {
    question: "13. Slaydda qizil strelka (arrow) qo‘shishning asosiy maqsadi nima?",
    options: [
      "A) Fayl hajmini oshirish",
      "B) Muhim obyektga e'tiborni qaratish",
      "C) Ovoz sifatini yaxshilash",
      "D) Slaydni yashirish"
    ],
    answer: "B"
  },
  {
    question: "14. PowerPointda strelka kabi grafik elementlar qaysi bo‘lim orqali qo‘shiladi?",
    options: [
      "A) Review",
      "B) Design",
      "C) Insert → Shapes",
      "D) Slide Show"
    ],
    answer: "C"
  },
  {
    question: "15. Mahsulot taqdimotlarida katta va sifatli rasmlardan foydalanishning afzalligi nima?",
    options: [
      "A) Taqdimotni yanada professional va ta'sirchan qiladi",
      "B) Kompyuter tezligini oshiradi",
      "C) Internet tezligini oshiradi",
      "D) Fayllarni avtomatik saqlaydi"
    ],
    answer: "A"
  },
  {
    question: "16. iSpring Kinetics oynasidagi yuqori menyu tasmasida nechta asosiy bo'lim (tab) mavjud?",
    options: [
      "A) 2 ta (Книга va Помощь)",
      "B) 3 ta",
      "C) 4 ta",
      "D) 5 ta"
    ],
    answer: "D"
  },
  {
    question: "17. Kitobga yangi sahifa juftligini qo'shish uchun qaysi tugma ishlatiladi?",
    options: [
      "A) Изображение",
      "B) Создать разворот",
      "C) Публикация",
      "D) Надпись"
    ],
    answer: "B"
  },
  {
    question: "18. 'Cancelling a Recording' qadamlariga ko'ra, 'Save Camtasia Recording As' oynasi chiqqanda nima qilinadi?",
    options: [
      "A) Fayl nomi kiritiladi",
      "B) Cancel tugmasi bosiladi",
      "C) Produce tugmasi bosiladi",
      "D) Oyna yopib yuboriladi"
    ],
    answer: "A"
  },
  {
    question: "19. '3 Ways to Record PowerPoint' slaydiga asosan, PowerPoint taqdimotini necha xil usulda yozib olish mumkin?",
    options: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5"
    ],
    answer: "B"
  },
  {
    question: "20. Quyidagi variantlardan qaysi biri iSpring Pro nashr oynasidagi to'rt asosiy bo'limga KIRMAYDI?",
    options: [
      "A) Web",
      "B) LMS",
      "C) CD",
      "D) Видео"
    ],
    answer: "D"
  }
];



const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [generate, setGenerate] = useState(false);
  const navigate = useNavigate()

  const userId = jwtDecode(localStorage.getItem('token')).userId;
  const userName = jwtDecode(localStorage.getItem('token')).fullname;
  
      const generateCertificate = async () => {
        try {
            setGenerate(true);
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
            setGenerate(false);
            navigate('/');
        } catch (error) {
            console.error("❌ Xatolik yuz berdi:", error);
        }
    };





  if(!localStorage.getItem('token')){
    alert('Siz tizimga kirmagansiz. Iltimos tizimga kiring!');
    return navigate('/login');
  }

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...originalQuestions]).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setFinished(true);
    }
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNavigation = (direction) => {
    setCurrentQuestion((prev) => prev + direction);
  };

  const handleFinish = async () => {
    const correctAnswers = selectedAnswers.filter(
        (ans, index) => ans === questions[index]?.answer
    ).length;
    const finalScore = correctAnswers; // Asosiy muammo shu joyda
    setScore(finalScore); // State o‘zgaradi, lekin fetch ishlayotganda eski qiymat bo‘lishi mumkin
    setFinished(true);

    const userId = jwtDecode(localStorage.getItem('token')).userId;

    console.log("Yuborilayotgan ma'lumot:", { userId, score: finalScore }); // Konsolda tekshirish
    
    const response = await fetch('http://localhost:5001/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, score: finalScore }) // To‘g‘ri qiymat jo‘natish
    });

    const data = await response.json();
    console.log("Server javobi:", data); // Backenddan qaytayotgan javobni tekshirish
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
                                            <h1 data-animation="bounceIn" data-delay="0.2s">Yakuniy imtixon</h1>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-5">
      <div className="card p-4 shadow-sm w-50 text-center">
        {finished ? (
          <div>
            <h1 className="text-success">Test yakunlandi!</h1>
            <p className="lead">Siz {score} ta to'g'ri javob berdingiz.</p>
            <p className="lead"> {score/originalQuestions.length*100} foiz ball to'pladingiz.</p>
            {(score/originalQuestions.length*100 > 86) && <button className="btn btn-primary" disabled={generate ? true : false} onClick={generateCertificate} style={{width:120, height: 60}}>{<h2>{generate ? "Yuklanmoqda..." : "OK"}</h2>}</button>}
          </div>
        ) : (
          questions.length > 0 && (
            <div>
              <h1 className="mb-4">{questions[currentQuestion].question}</h1>
              <div className="d-grid gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.charAt(0))}
                    className={`btn ${selectedAnswers[currentQuestion] === option.charAt(0) ? 'btn-success' : 'btn-primary'}`}
                  >
                    <h2>{option}</h2>
                  </button>
                ))}
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-secondary" disabled={currentQuestion === 0} onClick={() => handleNavigation(-1)}><h2>Oldingi</h2></button>
                <button className="btn btn-secondary" disabled={currentQuestion === questions.length - 1} onClick={() => handleNavigation(1)}><h2>Keyingi</h2></button>
              </div>
              <div className="mt-3">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`btn ${selectedAnswers[index] ? 'btn-info' : 'btn-light'} mx-1`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    <h1>{index + 1}</h1>
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <p>Qolgan vaqt: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
              </div>
              {currentQuestion === questions.length - 1 && (
                <button className="btn btn-danger mt-3" onClick={handleFinish}><h1>Tugatish</h1></button>
              )}
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
}
