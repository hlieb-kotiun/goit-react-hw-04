import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map((item) => {
        return (
          <li className={s.item} key={item.id}>
            <ImageCard
              item={item}
              img={item.urls.small}
              alt={item.slug}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ImageGallery;
