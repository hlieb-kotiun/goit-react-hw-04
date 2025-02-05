import Modal from "react-modal";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal = ({
  openModal,
  afterOpenModal,
  closeModal,
  modalIsOpen,
  selectedImage,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={s.wrapper}>
          <img className={s.img} src={selectedImage} alt="img" />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
