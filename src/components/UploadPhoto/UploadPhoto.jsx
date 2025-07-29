import React, { useRef, useState } from "react";
import css from "./UploadPhoto.module.css";

export const UploadPhoto = ({ onClose, onSave }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleCircleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const handleSave = () => {
    if (photo) {
      onSave(photo);
    }
  };

  return (
    <div className={css.formAuth }>
      <button className={css.close} onClick={onClose}>
        <svg width="24" height="28" stroke="black" fill="none">
          <use  href="/src/assets/img/sprite.svg#icon-close">
          </use>
        </svg>
      </button>
      <h1 className={css.title}>Upload your photo</h1>
      <div className={css.photoCircle} onClick={handleCircleClick}>
        {preview ? (
          <img src={preview} alt="preview" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
        ) : (
            <svg width="69" height="58" stroke="black" fill="none">
              <use href="/src/assets/img/sprite.svg#icon-photo"></use>
          </svg>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={css.UploadPhotoInput}
      />
      <button
        className={preview ? css.saveButtonOn : css.saveButton}
        onClick={handleSave}
        disabled={!photo}
      >
        Save
      </button>
    </div>
  );
};