import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MiroodlesSticker from "../components/MiroodlesSticker.png";

function TypingEffect() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Your story, AI's voice";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed by changing the interval (in milliseconds)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <h2 style={{ fontFamily: "'Poppins', sans-serif" }}>{displayedText}</h2>
  );
}
const Homescreen = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate("/storygenerator");
  };

  return (
    <div className="main">
      <img
        style={{ width: "45%", height: "auto" }}
        src={MiroodlesSticker}
      ></img>
      <h1>BETWEEN THE LINES</h1>

      <TypingEffect />

      <Button
        variant="round"
        size="medium"
        onClick={handleClick}
        sx={{ marginTop: "20px" }}
      >
        Create
      </Button>
    </div>
  );
};

export default Homescreen;
