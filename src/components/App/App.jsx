import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import { TailSpin } from "react-loader-spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./App.module.css";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const KEY = "W4xQh8Ib6Ep7JQzOIs7raJW1EJLkqDfOm5oS3SvTF-g";
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  let subtitle;

  useEffect(() => {
    async function fetchData() {
      try {
        if (!query.trim()) {
          console.log("fill the field");
          return;
        }
        setLoader(true);
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${KEY}&page=${page}&query=${query}`
        );
        console.log(response.data.results);
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [query, page]);

  const onSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const handleClick = () => {
    console.log("Load More clicked");
    setPage((prev) => prev + 1);
  };

  function openModal(image) {
    console.log(image);

    setSelectedImage(image);
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {/* {loader && (
        <div className={s.wrapper}>
          <TailSpin
            visible={true}
            height="50"
            width="50"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )} */}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && <LoadMoreBtn handleClick={handleClick} />}
      {error && <ErrorMessage />}
      <ImageModal
        selectedImage={selectedImage}
        openModal={openModal}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
    </>
  );
}

export default App;
