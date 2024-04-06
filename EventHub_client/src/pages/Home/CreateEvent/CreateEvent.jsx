import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import styles from './CreateEvent.module.css';
import { CameraOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import CloseWindowButton from '../../../components/Buttons/CloseWindowButton/CloseWindowButton';
import { Input, Select, DatePicker,Checkbox } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

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
      <div className={styles.ParamsContainer}>
        {/* Перший рядок */}
        <div className={styles.row}>
          <div className={styles.ParamContainer}>
            <div className={styles.ParamLabel}>Name</div>
            <Input
              placeholder="Name"
              className={styles.Param}
            />
          </div>
          <div className={styles.ParamContainer}>
            <div className={styles.ParamLabel}>Categories</div>
            <Select
              className={styles.Param}
              placeholder="Categories"
              mode="multiple"
              maxTagCount={2}
              maxTagPlaceholder={<MinusCircleOutlined />}
            >
              <Option key="1">Category 1</Option>
              <Option key="2">Category 2</Option>
              {/* Додайте інші категорії за потреби */}
            </Select>
          </div>
        </div>
        {/* Другий рядок */}
        <div className={styles.row}>
          <div className={styles.ParamContainer}>
            <div className={styles.ParamLabel}>Location</div>
            <Input
              placeholder="Location"
              className={styles.Param}
            />
          </div>
          <div className={styles.ParamContainer}>
            <div className={styles.ParamLabel}>Participants</div>
            <Input
              placeholder="Participants"
              className={styles.Param}
            />
          </div>
        </div>
        {/* Третій рядок */}
        <div className={styles.row}>
          <div className={styles.ParamContainer} >
            <div className={styles.ParamLabel}>Start date and time - End date and time</div>
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start date and time', 'End date and time']}
              style={{ width: '100%', height: "4vh", zIndex: 999 }}
            />
          </div>
        </div>
      </div>
      <div className={styles.DescriptionContainer}>
        <div className={styles.ParamLabel}>Description</div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          style={{
            width: '100%',
            maxWidth: '50vw',
          }}
          placeholder="Enter description..."
        />
      </div>
      <div className={styles.ParticipationContainer}>
        <Checkbox className={styles.Checkbox}>I don’t take part in this event</Checkbox>
      </div>
    </div>
  );
};

export default CreateEvent;
