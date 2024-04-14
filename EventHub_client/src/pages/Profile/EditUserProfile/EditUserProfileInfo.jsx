import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  Input,
  Select,
  DatePicker,
  Checkbox,
  AutoComplete,
  message,
} from "antd";
import { getUserById } from "../../../api/getUserById";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import CancelButton from "../../../components/Buttons/CancelButton/CancelButton";
import ApplyChangesButton from "../../../components/Buttons/ApplyChangesButton/ApplyChangesButton";
import { CameraOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./EditUserProfile.module.css";

const EditUserProfile = ({ handleClose }) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const [photos, setPhotos] = useState(new Array(4).fill(null));
  const [uploadedPhotos, setUploadedPhotos] = useState(new Array(4).fill(null));
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserById(userId);
        console.log(response.birth_date);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(true);
      }
    }
    fetchUser();
  }, [userId]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    photos[photoIndex] = URL.createObjectURL(file);
    uploadedPhotos[photoIndex] = new FormData().append("files", file);

    setPhotos(photos);
    setUploadedPhotos(uploadedPhotos);
    setPhotoIndex(photoIndex + 1);
  };

  const handlePhotoDelete = (index) => {
    photos.splice(index, 1);
    uploadedPhotos.splice(index, 1);

    photos.push(null);
    uploadedPhotos.push(null);

    setPhotoIndex(photoIndex - 1);
    setPhotos(photos);
    setUploadedPhotos(uploadedPhotos);
  };

  const updateUserInfo = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <div className={styles.OuterContainer}>
      {!loading ? (
        <p>Loading</p>
      ) : (
        <form className={styles.InnerContainer}>
          <div className={styles.Header}>
            <p className={styles.Heading}>Edit account information</p>
            <CloseWindowButton onClick={handleClose} />
          </div>
          <div className={styles.Main}>
            <div className={styles.Photos}>
              {photos.map((photo, index) =>
                index === photoIndex ? (
                  <div className={styles.Photo} key={index}>
                    <label className={styles.AddPhotoLabel}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handlePhotoUpload(event)}
                        style={{ display: "none" }}
                      />
                      Add Photo
                    </label>
                  </div>
                ) : (
                  <div className={styles.Photo} key={index}>
                    {photo ? (
                      <>
                        <div
                          className={styles.Delete}
                          onClick={() => handlePhotoDelete(index)}
                        >
                          <div className={styles.DeleteButton}>
                            <DeleteOutlined />
                          </div>
                        </div>
                        <img className={styles.Image} src={photo} alt="image" />
                      </>
                    ) : (
                      <CameraOutlined />
                    )}
                  </div>
                )
              )}
            </div>
            <div className={styles.MainInfo}>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Name</p>
                <Input
                  name="first_name"
                  placeholder="Name"
                  className={styles.Param}
                  value={user.first_name}
                  onChange={updateUserInfo} 
                />
              </div>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Surname</p>
                <Input
                  name="last_name"
                  placeholder="Surname"
                  className={styles.Param}
                  value={user.last_name}
                  onChange={updateUserInfo} 
                />
              </div>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Nickname</p>
                <Input
                  name="username"
                  placeholder="Nickname"
                  className={styles.Param}
                  value={user.username}
                  onChange={updateUserInfo} 
                />
              </div>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Address</p>
                <Input
                  name="city"
                  placeholder="Address"
                  className={styles.Param}
                  value={user.city}
                  onChange={updateUserInfo} 
                />
              </div>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Gender</p>
                <Select
                  name="gender"
                  placeholder="Gender"
                  className={styles.Select}
                  value={user.gender}
                  onChange={(value) => setUser({ ...user, gender: value })}
                >
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                  <Option value="OTHER">Other</Option>
                </Select>
              </div>
              <div className={styles.InputContainer}>
                <p className={styles.Caption}>Birthday</p>
                <DatePicker
                  className={styles.Param}
                  name="birth_date"
                  value={moment(user.birth_date)}
                  onChange={updateUserInfo} 
                />
              </div>
            </div>
          </div>
          <div className={styles.Description}>
            <p className={styles.Caption}>About</p>
            <TextArea
              autoSize={{ minRows: 4, maxRows: 4 }}
              name="description"
              placeholder="Enter description..."
              className={styles.TextArea}
              value={user.description}
              onChange={updateUserInfo} 
            />
          </div>
          <div className={styles.Buttons}>
            <CancelButton />
            <ApplyChangesButton />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserProfile;
