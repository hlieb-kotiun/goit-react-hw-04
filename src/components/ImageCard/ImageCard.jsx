import s from "./ImageCard.module.css";

const ImageCard = ({ altDescription, small, onClick }) => {
  return (
    <div onClick={() => onClick()}>
      <img className={s.image} src={small} alt={altDescription} />
    </div>
  );
};

export default ImageCard;
