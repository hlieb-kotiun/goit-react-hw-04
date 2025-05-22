import s from "./ImageCard.module.css";

const ImageCard = ({ openModal, item }) => {
  return (
    <div>
      <img
        onClick={() => openModal(item.id)}
        className={s.img}
        src={item.urls.small}
        alt={item.alt_description}
      />
    </div>
  );
};
export default ImageCard;
