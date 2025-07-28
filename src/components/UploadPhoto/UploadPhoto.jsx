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
    <div className={css.form}>
      <button className={css.close} onClick={onClose}>×</button>
      <h1 className={css.title}>Upload your photo</h1>
      <div className={css.photoCircle} onClick={handleCircleClick}>
        {preview ? (
          <img src={preview} alt="preview" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <span role="img" aria-label="camera">📷</span>
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
        className={css.saveButton}
        onClick={handleSave}
        disabled={!photo}
      >
        Save
      </button>
    </div>
  );
};