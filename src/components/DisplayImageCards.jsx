import { useEffect, useState } from "react";
import "../styles/styles.css";
import ImageCard from "./ImageCard";
import Modal from "./Modal";

export default function DisplayImageCards(props) {
  const [cardNames, setCardNames] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const targetScore = props.targetScore;
  const data = props.data;
  const limitedData = data.slice(0, props.level);
  const [displayModal, setDisplayModal] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    setShuffledCards(shuffleArray([...limitedData]));
  }, [data, props.level]);

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffleWithSelectedCards = (characters, selectedCharacters) => {
    let shuffled = shuffleArray([...characters]);
    const selectedNames = selectedCharacters.map((character) => character.name);
    const shuffledNames = shuffled.map((character) => character.name);

    if (!shuffledNames.some((name) => selectedNames.includes(name))) {
      const randomSelected =
        selectedCharacters[
          Math.floor(Math.random() * selectedCharacters.length)
        ];
      shuffled[Math.floor(Math.random() * shuffled.length)] = randomSelected;
      shuffled = shuffleArray(shuffled);
    }

    let slicedShuffled = shuffled.slice(0, props.level);
    console.log(props.level);
    const slicedShuffledNames = slicedShuffled.map(
      (character) => character.name
    );

    if (selectedNames.every((name) => slicedShuffledNames.includes(name))) {
      const randomSelectedName =
        selectedNames[Math.floor(Math.random() * selectedNames.length)];
      const indexToRemove = slicedShuffled.findIndex(
        (character) => character.name === randomSelectedName
      );

      if (indexToRemove !== -1) {
        slicedShuffled.splice(indexToRemove, 1);
        const nonSelectedCharacters = characters.filter(
          (character) =>
            !selectedNames.includes(character.name) &&
            !slicedShuffledNames.includes(character.name)
        );
        const randomNonSelected =
          nonSelectedCharacters[
            Math.floor(Math.random() * nonSelectedCharacters.length)
          ];
        slicedShuffled.push(randomNonSelected);
      }

      slicedShuffled = shuffleArray(slicedShuffled);
    }

    return slicedShuffled;
  };

  const handleClick = (cardName) => {
    if (cardNames.includes(cardName)) {
      console.log("Already selected");
      setDisplayModal(true);
      props.setHighScore((prev) =>
        prev < props.currentScore ? props.currentScore : prev
      );
      setGameStatus("lost");
      setCardNames([]);
      props.setCurrentScore(0);
      return;
    }

    if (targetScore == props.currentScore + 1) {
      setDisplayModal(true);
      props.setHighScore((prev) =>
        prev < props.currentScore + 1 ? props.currentScore + 1 : prev
      );
      setGameStatus("won");
      props.setCurrentScore(0);
      setCardNames([]);
      return;
    }

    setCardNames((prevCardNames) => {
      const updatedCardNames = [...prevCardNames, cardName];

      const updatedShuffledCards = shuffleWithSelectedCards(
        data,
        updatedCardNames.map((name) => data.find((item) => item.name === name))
      );
      setShuffledCards(updatedShuffledCards);

      props.setCurrentScore((prev) =>
        parseInt(prev) < parseInt(targetScore) ? prev + 1 : prev
      );

      return updatedCardNames;
    });
  };

  return (
    <div className="image-display">
      {shuffledCards.map(
        (eachData, index) =>
          eachData &&
          eachData.name &&
          eachData.image && (
            <div key={index}>
              <ImageCard
                name={eachData.name}
                url={eachData.image}
                handleClick={() => handleClick(eachData.name)}
              />
            </div>
          )
      )}
      {displayModal && (
        <Modal message={gameStatus} setDisplayModal={setDisplayModal} />
      )}
    </div>
  );
}
