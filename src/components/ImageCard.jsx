export default function ImageCard(props) {
  return (
    <div className="image-container">
      <div className="card-front">
        <img
          src={props.url}
          alt={props.name}
          width={"100vw"}
          onClick={props.handleClick}
        />
      </div>
    </div>
  );
}
