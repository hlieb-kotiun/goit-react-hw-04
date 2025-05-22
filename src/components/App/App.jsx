import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { searchImagesByParams } from "../../unsplash-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import s from "./App.module.css";
import LoadMore from "../LoadMore/LoadMore";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState(null);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetchImages = async () => {
      try {
        setError(false);
        setLoader(true);

        const results = await searchImagesByParams(query, page);
        console.log(results.data.results);

        setImages((prev) => [...prev, ...results.data.results]);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleQuery = (userQuery) => {
    setImages([]);
    setPage(1);
    setQuery(userQuery);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Modal toggle

  const openModal = (id) => {
    setSelectedImgId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <SearchBar setQuery={handleQuery} query={query} />
      <h2>Gallery</h2>
      {images.length === 0 ? (
        <p className={s.message}>There is no images yet!</p>
      ) : (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {error && <p>Opss, something went wrong! Try again later</p>}

      {loader && <p>Loading...</p>}
      {images.length > 0 && <LoadMore handleLoadMore={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          selectedImgId={selectedImgId}
          images={images}
        />
      )}
      {/* <button onClick={openModal}>Open Modal</button> */}
    </div>
  );
}

export default App;
