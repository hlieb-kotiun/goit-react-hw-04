import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.list}>
      {images.map((item) => {
        return (
          <li key={item.id}>
            <ImageCard
              altDescription={item.alt_description}
              small={item.urls.small}
              onClick={() => onImageClick(item.urls.regular)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
