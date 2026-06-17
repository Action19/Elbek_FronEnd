import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import './teststyle.css';
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw, Maximize, Minimize, Check, Circle } from "lucide-react";
import { lessonsData } from '../assets/json/lessons';
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



function Player() {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);  // ✅ Test holati qo'shildi
  const [currentTestIndex, setCurrentTestIndex] = useState(null);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [endVideo, setEndVideo] = useState(false)
  
  const { id } = useParams();


  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(Math.floor(playerRef.current.getCurrentTime()));
      }
    }, 500); // Har 0.5 soniyada yangilanadi

    return () => clearInterval(interval);
  }, []);


  const navigate = useNavigate();

  const ended = async () => {
    setEndVideo(false);


    const lessonId = id; // Keyingi dars ID'si

    const userId = jwtDecode(localStorage.getItem('token')).userId; // Bu yerda userId olish kerak (localStorage yoki global state orqali)
    const response = await fetch('https://elbek-backend.onrender.com/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, lessonId }) // Obyekt sifatida yuborish kerak!
    });

    const data = await response.json();
    console.log(data); // Javobni konsolda ko‘rish

    navigate('/courses');

  };


  const togglePlay = () => setPlaying(!playing);

  const skipTime = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds, "seconds");
    }
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
    const currentTime = Math.floor(playerRef.current.getCurrentTime());

    lessonsData[id - 1].tests.forEach((test, index) => {
      if (currentTime === test.time && !showTest) {
        setShowTest(true);
        setPlaying(false);
        setCurrentTestIndex(index)
      }
    });

  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  // const handleSeek = (newTime) => {
  // if (newTime >= lessonsData[id-1].tests[0].time && !testCompleted) {
  //   playerRef.current.seekTo(lessonsData[0].tests[0].time, "seconds");
  // }
  // };


  const checkAnswer = () => {

    if (currentTestIndex === null) return; // Agar test yo'q bo'lsa, hech narsa qilmaymiz

    const correctAnswerIndex = lessonsData[id - 1].tests[currentTestIndex].correct; // To‘g‘ri javob indeksi

    if (selectedAnswer === correctAnswerIndex) {
      setShowTest(false);
      setPlaying(true);
      setCurrentTestIndex(null); // Test tugadi, indeksni tiklash
    } else {
      playerRef.current.seekTo(lessonsData[id - 1].tests[currentTestIndex].time, "seconds"); // Xatolik bo‘lsa, test vaqtiga qaytarish
      setSelectedAnswer(null); // Tanlovni tozalash
    }
  };



  // const checkAnswer = () => {
  //   if (selectedAnswer === "B") {
  //     setShowTest(false);
  //     setPlaying(true);
  //   } else {
  //     playerRef.current.seekTo(10, "seconds");
  //     setShowTest(false);
  //     setPlaying(true);
  //   }
  // };

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


      <div className="video-wrapper">
        <div ref={containerRef} className={`video-container ${isFullScreen ? "fullscreen" : ""}`}>
          <ReactPlayer
            ref={playerRef}
            url={`/video/${lessonsData[id - 1].video}`}
            playing={playing}
            volume={volume}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onEnded={() => setEndVideo(true)}
          // onSeek={handleSeek}
          />


          {showTest && currentTestIndex !== null && (
            <div className="test-overlay">
              <h2>{lessonsData[id - 1].tests[currentTestIndex].question}</h2>
              <div className="options">
                {lessonsData[id - 1].tests[currentTestIndex].answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={selectedAnswer === i ? "selected" : ""}
                  >
                    {String.fromCharCode(65 + i)}. {answer}
                  </button>
                ))}
              </div>
              <button className="ok-button" onClick={checkAnswer}><Check size={24} /> OK</button>
            </div>
          )}


          {endVideo && (
            <div className="test-overlay">
              <h2>Siz darsni muvaffaqqiyatli o'zlasshtirdingiz, Keyingi darsni ko'rishga ruxsat bo'lishi uchun tasdiqlash tugmasini bosing </h2>
              <button className="ok-button" onClick={ended}><Check size={24} /> TASDIQLASH</button>
            </div>
          )}

          {/* {showTest && (
            <div className="test-overlay">
              <h2>📚 {lessonsData[0].tests[currentTestIndex].question}</h2>
              <div className="options">
                <button onClick={() => setSelectedAnswer("A")} className={selectedAnswer === "A" ? "selected" : ""}>A. {lessonsData[0].tests[currentTestIndex].answers[0]}</button>
                <button onClick={() => setSelectedAnswer("B")} className={selectedAnswer === "B" ? "selected" : ""}>B. {lessonsData[0].tests[currentTestIndex].answers[1]}</button>
                <button onClick={() => setSelectedAnswer("C")} className={selectedAnswer === "C" ? "selected" : ""}>C. {lessonsData[0].tests[currentTestIndex].answers[2]}</button>
                <button onClick={() => setSelectedAnswer("D")} className={selectedAnswer === "D" ? "selected" : ""}>D. {lessonsData[0].tests[currentTestIndex].answers[3]}</button>
              </div>
              <button className="ok-button" onClick={checkAnswer}><Check size={24} /> OK</button>
            </div>
          )} */}

          <div className="controls">
            <button onClick={() => skipTime(-5)}><RotateCcw size={24} /></button>
            <button onClick={togglePlay}>{playing ? <Pause size={28} /> : <Play size={28} />}</button>
            <button onClick={() => skipTime(5)}><RotateCw size={24} /></button>

            <div className="progress-container">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  const newTime = (parseFloat(e.target.value) / 100) * playerRef.current.getDuration();
                  playerRef.current.seekTo(newTime, "seconds");
                  setProgress(parseFloat(e.target.value));
                }}

                onMouseMove={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const percent = ((e.clientX - rect.left) / rect.width) * 100;
                  const newTime = (percent / 100) * playerRef.current.getDuration();
                  setHoverTime(Math.floor(newTime));
                  setHoverPosition(percent); // Joylashuvni belgilash


                }}
                onMouseLeave={() => setHoverTime(null)}
              />

              <div className="current-time-display">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
              </div>

              {hoverTime !== null && (
                <div className="hover-time" style={{ left: `${hoverPosition}%` }}>
                  {Math.floor(hoverTime / 60)}:{String(Math.floor(hoverTime % 60)).padStart(2, "0")}
                </div>
              )}
              {/* 41-sekunddagi belgi */}
              {lessonsData[id - 1].tests.map((test, index) => (
                <div
                  key={index}
                  className="marker"
                  style={{
                    left: playerRef.current?.getDuration()
                      ? `${(test.time / playerRef.current.getDuration()) * 100}%`
                      : "0%",
                  }}
                ></div>
              ))}

            </div>
            {/* 2330.935147 */}
            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
              {volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <button onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>



    </>
  )
}
export default Player