import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import styles from './CreateEvent.module.css';
import { CameraOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import CloseWindowButton from '../../../components/Buttons/CloseWindowButton/CloseWindowButton';


const FullSizePhotoModal = ({ photoUrl, onClose }) => {
  return (
    <div className={styles.fullSizePhotoModal}>
      <div className={styles.modalContent}>
        <img src={photoUrl} alt="Full Size Photo" />
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [photos, setPhotos] = useState(new Array(6).fill(null));
  const [addedPhotos, setAddedPhotos] = useState(0);
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState(-1);
  const [fullSizePhotoIndex, setFullSizePhotoIndex] = useState(-1);

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
    setAddedPhotos(addedPhotos + 1);
  };

  const handlePhotoDelete = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
    setAddedPhotos(addedPhotos - 1);

    // Зміщення наступних фото назад
    for (let i = index; i < photos.length - 1; i++) {
      if (newPhotos[i] === null && newPhotos[i + 1] !== null) {
        [newPhotos[i], newPhotos[i + 1]] = [newPhotos[i + 1], newPhotos[i]];
      }
    }
  };

  const handleFullSizePhoto = (index) => {
    setFullSizePhotoIndex(index);
  };
  const handleCloseFullSizePhoto = () => {
    setFullSizePhotoIndex(-1);
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
          <div
            key={index}
            className={styles.photo}
            onMouseEnter={() => setHoveredPhotoIndex(index)}
            onMouseLeave={() => setHoveredPhotoIndex(-1)}
          >
            {index === 0 && (
              <div className={styles.miniContainer}>
                <span className={styles.mainPhotoText}>Main</span>
              </div>
            )}
            {photo ? (
              <>
                <img src={photo} alt={`Photo ${index}`} />
                {hoveredPhotoIndex === index && (
                  <div className={styles.photoActions}>
                    <div className={styles.actionIcon}>
                      <DeleteOutlined onClick={() => handlePhotoDelete(index)} style={{ fontSize: '24px', color: '#FF0000', cursor: 'pointer' }} />
                    </div>
                    <div className={styles.actionIcon}>
                      <EyeOutlined onClick={() => handleFullSizePhoto(index)} style={{ fontSize: '24px', color: '#FFFFF', cursor: 'pointer' }} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {addedPhotos === index && (
                  <label className={styles.addPhotoLabel}>
                    <input type="file" accept="image/*" onChange={(event) => handlePhotoUpload(index, event)} style={{ display: 'none' }} />
                    Add Photo
                  </label>
                )}
                {addedPhotos !== index && (
                  <div className={styles.cameraIcon}>
                    <CameraOutlined style={{ fontSize: '24px', color: '#AAAAAA', cursor: 'pointer' }} />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CreateEvent;
