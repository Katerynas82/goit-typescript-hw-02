import style from "../ImageCard/ImageCard.module.css";

type Image = {
  url: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description?: string;
};

type ImageCardProps = {
  images: Image;
  handleImageClick: (url: string) => void;
};
const ImageCard: React.FC<ImageCardProps> = ({ images, handleImageClick }) => {
  return (
    <>
      <a href={images.url} rel="noopener noreferrer">
        <img
          src={images.urls.small}
          className={style.img}
          alt={images.alt_description || "No description"}
          onClick={() => handleImageClick(images.urls.full)}
        ></img>
      </a>
    </>
  );
};

export default ImageCard;
