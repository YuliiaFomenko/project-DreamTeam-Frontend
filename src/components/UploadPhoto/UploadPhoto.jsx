import React, { useRef, useState } from "react";
import css from "./UploadPhoto.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk, logInThunk } from "../../redux/auth/operations";
import { clearPendingRegistration } from "../../redux/auth/slice";
import { selectPendingRegistration } from "../../redux/auth/selectors";

export const UploadPhoto = ({ onClose }) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const pendingRegistration = useSelector(selectPendingRegistration);

 const [photo, setPhoto] = useState(null);
 const [preview, setPreview] = useState(null);
 const [loading, setLoading] = useState(false);
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

 const handleRegister = async () => {
   if (!pendingRegistration) return;

   setLoading(true);
   try {
     const formData = new FormData();
     formData.append("email", pendingRegistration.email);
     formData.append("password", pendingRegistration.password);
     formData.append("name", pendingRegistration.name);
     if (photo) formData.append("avatar", photo);

     await dispatch(registerThunk(formData)).unwrap();
     await dispatch(logInThunk({ 
       email: pendingRegistration.email, 
       password: pendingRegistration.password 
     })).unwrap();
     
     dispatch(clearPendingRegistration());
     
     if (onClose) {
       onClose();
     } else {
       navigate('/');
     }
   } catch (error) {
      console.error("Registration failed:", error?.message || JSON.stringify(error, null, 2));
   } finally {
     setLoading(false);
   }
 };

 const handleSkip = () => {
   // Якщо не хочеш фото — реєструємо без нього
   handleRegister();
 };

 const handleClose = () => {
   if (onClose) {
     onClose();
   } else {
     navigate('/register');
   }
 };



  return (
   <div className={css.formAuthWrapper}>
    
   <div className={css.formAuth}>
     <button className={css.close} onClick={handleSkip} disabled={loading}>
       <svg width="24" height="24" stroke="black" fill="none" strokeWidth="1px">
         <use href="/src/assets/img/sprite.svg#icon-close"></use>
       </svg>
     </button>
     <h1 className={css.title}>Upload your photo</h1>
     <div className={css.photoCircle} onClick={handleCircleClick}>
       {preview ? (
         <img
           src={preview}
           alt="preview"
           style={{
             width: "100%",
             height: "100%",
             borderRadius: "50%",
             objectFit: "cover",
           }}
         />
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
       onClick={handleRegister}
       disabled={loading}
     >
       {loading ? "Registering..." : "Save"}
     </button>
   </div>
   </div>
 );
};