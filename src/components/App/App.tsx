import { useEffect, useState } from "react";
import { fetchImages } from "../../../services/api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";

Modal.setAppElement("#root");
type Image = {
  id: string;
  url: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description?: string;
}

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

 useEffect(() => {
   const getImages = async () => {
     try {
       setIsError(false);
       setIsLoading(true);
       const data = await fetchImages(page, query);
       setIsLoading(false);
       setImages((prev) => [...prev, ...data]);
     } catch {
       setIsError(true);
     } finally {
       setIsLoading(false);
     }
   };

   if (query) {
     getImages();
   }
 }, [page, query]);

  useEffect(() => {
    if (imageModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [imageModal]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (url: string) => {
    setLargeImageUrl(url);
    setImageModal(true);
  };

  return (
    <div>
      <SearchBar setQuery={handleSearchSubmit} onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn handleChangePage={handleChangePage} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <ImageModal
        imageModal={imageModal}
        setImageModal={setImageModal}
        largeImageUrl={largeImageUrl}
      />
    </div>
  );
};

export default App;
