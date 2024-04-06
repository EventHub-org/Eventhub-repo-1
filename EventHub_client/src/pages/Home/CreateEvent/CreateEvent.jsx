import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  useAuth  from "../../../hooks/useAuth";
import styles from './CreateEvent.module.css';
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton"

const CreateEvent = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [photos, setPhotos] = useState(new Array(6).fill(null));


  const handleClick = () => {
    if (!auth.token) {
        navigate('/login');
    }
  };

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    const newPhotos = [...photos];
    newPhotos[index] = URL.createObjectURL(file);
    setPhotos(newPhotos);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.createEventHeader}>
        <h2>Create Event</h2>
        <div className={styles.CloseButton}>
          <CloseWindowButton />
        </div>
      </div>
      <div className={styles.photoContainer}>
  {photos.map((photo, index) => (
    <div key={index} className={styles.photo}>
      {photo ? (
        <img src={photo} alt={`Photo ${index}`} />
      ) : (
        <>
          {index === 0 && 
          <div className={styles.miniContainer}>
              <span className={styles.mainPhotoText}>Main Photo</span>
            </div>}
          <label className={styles.addPhotoLabel}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handlePhotoUpload(index, event)}
            />
            Add Photo
          </label>
        </>
      )}
    </div>
  ))}
</div>
    </div>
  );
};

export default CreateEvent;
