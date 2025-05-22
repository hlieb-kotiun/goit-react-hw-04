import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { FcLike } from "react-icons/fc";
import { IoIosCreate } from "react-icons/io";

const ImageModal = ({ closeModal, modalIsOpen, selectedImgId, images }) => {
  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
  };

  const selectedImage = images.find((item) => item.id === selectedImgId);

  const time = new Date(selectedImage.created_at);

  const month = time.getMonth();
  const year = time.getFullYear();

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          className={s.img}
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
        />
        <div className={s.info}>
          <p className={s.txt}>
            <FcLike /> {selectedImage.likes}
          </p>
          <p className={s.txt}>
            <IoIosCreate /> at {(month, year)}
          </p>
        </div>
      </Modal>
      ;
    </div>
  );
};
export default ImageModal;

// likes, updated_at, urls, alt_description;
