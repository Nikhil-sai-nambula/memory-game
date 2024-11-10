import { useNavigate } from "react-router-dom";
import "../index.css";
import "../styles/styles.css";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/mainPage");
  };
  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <>
      <div className="home-page">Wanna Visit Hogwarts</div>
      <button className="harry-potter-button" onClick={handleClick}>
        Let's go
      </button>
    </>
  );
}

export default HomePage;
