import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./App.module.css";
import ImageModal from "../ImageModal/ImageModal";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const KEY = "W4xQh8Ib6Ep7JQzOIs7raJW1EJLkqDfOm5oS3SvTF-g";
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#000");
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
      {loader && (
        <div className={s.wrapper}>
          <ClipLoader
            color={color}
            loading={loader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
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
