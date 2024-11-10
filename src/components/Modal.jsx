export default function Modal(props) {
  let message = "";
  let gameColor = "";
  if (props.message == "won") {
    message = "You've Won!";
    gameColor = "green";
  }
  if (props.message == "lost") {
    message = "You've Lost.";
    gameColor = "red";
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="won-lost" style={{ color: gameColor }}>
          {message}
        </div>
        {props.message == "won" ? (
          <div className="won-description">
            You stand a chance to visit Hogwarts
          </div>
        ) : null}
        <button
          className="harry-potter-button"
          style={{ margin: "0vh" }}
          onClick={() => props.setDisplayModal(false)}
        >
          play again
        </button>
      </div>
    </div>
  );
}
