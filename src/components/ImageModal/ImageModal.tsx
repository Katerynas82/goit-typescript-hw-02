import Modal from "react-modal";
import style from "../ImageModal/ImageModal.module.css";


type ImageModalProps = {
  imageModal: boolean;
  setImageModal: (isOpen: boolean) => void;
  largeImageUrl?: string;
};

const ImageModal: React.FC<ImageModalProps> = ({
  imageModal,
  setImageModal,
  largeImageUrl,
}) => {
  function closeModal() {
    setImageModal(false);
  }
  return (
    <>
      <div>
        <Modal
          isOpen={imageModal}
          onRequestClose={closeModal}
          className={style.content}
          overlayClassName={style.overlay}
          contentLabel="Image Modal"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className={style.overlayModal}>
            {largeImageUrl && <img src={largeImageUrl} alt="Large view" />}
            <button className={style.button} onClick={closeModal}>
              close
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ImageModal;
