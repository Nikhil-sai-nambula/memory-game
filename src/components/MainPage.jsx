import { useContext, useEffect, useRef, useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import harry_audio from "../assets/audio/harry_audio.mp3";
import DisplayImageCards from "./DisplayImageCards";
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";

function MainPage() {
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState(null);
  const [targetScore, setTargetScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://hp-api.onrender.com/api/characters"
        );
        const filteredData = response.data.filter((item) => item.image);
        const limitedData = filteredData.slice(0, 11);
        setData(limitedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (cardsChosen, scoreSet) => {
    setIsDisplayed(false);
    setCurrentScore(0);
    setLevel(cardsChosen);
    setTargetScore(scoreSet);
    const modifiedData = data.slice(0, parseInt(scoreSet) + 1);
    setData(modifiedData);
    console.log(modifiedData);
    playAudio();
  };

  useEffect(() => {
    document.body.classList.add("main-page");
    return () => {
      document.body.classList.remove("main-page");
    };
  }, []);

  const audio = useRef(new Audio(harry_audio));

  const playAudio = () => {
    if (!isPlaying) {
      audio.current.play();
      audio.current.loop = true;
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {isDisplayed && (
        <>
          <div>Play The Game To Visit Hogwarts</div>
          <p>Choose the level</p>
          <div className="select-level">
            <button
              className="harry-potter-button dark"
              onClick={() => handleClick(3, 5)}
            >
              Easy
            </button>
            <button
              className="harry-potter-button dark"
              onClick={() => handleClick(4, 7)}
            >
              Medium
            </button>
            <button
              className="harry-potter-button dark"
              onClick={() => handleClick(5, 10)}
            >
              Hard
            </button>
          </div>
        </>
      )}

      {!isDisplayed && (
        <>
          <div className="heading-audio">
            <div className="game-info-text">
              You should not choose the same card twice to win the Game
            </div>
            {isPlaying ? (
              <AiOutlineAudioMuted className="audio" onClick={playAudio} />
            ) : (
              <AiOutlineAudio className="audio" onClick={playAudio} />
            )}
          </div>
          <div className="score">
            <div className="score current">current score:{currentScore}</div>
            <div className="score high">High Score:{highScore}</div>
            <div className="score target">Target Score:{targetScore}</div>
          </div>

          <DisplayImageCards
            data={data}
            setCurrentScore={setCurrentScore}
            currentScore={currentScore}
            targetScore={targetScore}
            level={level}
            setHighScore={setHighScore}
          />
        </>
      )}
    </>
  );
}

export default MainPage;
