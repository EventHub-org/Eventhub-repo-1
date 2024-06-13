import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { getUserByUsername } from "../../../api/getUserByUsername";
import { message } from "antd";
import UserImages from "../../../components/UserImages/UserImages";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import styles from "./UserProfile.module.css";
import withLoading from "../../../utils/hoc/withLoading/withLoading";

const UserProfile = ({ setIsLoading }) => {
  const { username } = useParams({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await getUserByUsername(username);
        setUser(response);
      } catch (error) {
        navigate("/");
        message.error(`Failed to find user with nickname: ${username}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  return (
    user && (
      <div className={styles.OuterContainer}>
        <div className={styles.InnerContainer}>
          <div className={styles.Title}>
            <p className={styles.Heading}>Account information</p>
            <CloseWindowButton onClick={() => navigate(-1)} />
          </div>
          <div className={styles.MainInfo}>
            <UserImages images={user.photo_responses} />
            <div className={styles.AboutUser}>
              <div className={styles.Header}>
                <p className={styles.MainCaption}>
                  {user.first_name + " " + user.last_name}
                </p>
                <p className={styles.SecondaryCaption}>{"@" + user.username}</p>
              </div>
              <div className={styles.Information}>
                <p className={styles.InformationText}>Basic information</p>
                <div className={styles.InfoBox}>
                  <p className={styles.Caption}>Birthday</p>
                  <p className={user.birth_date ? styles.Info : styles.NoInfo}>
                    {user.birth_date || "No information"}
                  </p>
                </div>
                <div className={styles.InfoBox}>
                  <p className={styles.Caption}>Gender</p>
                  <p className={styles.Info}>{user.gender}</p>
                </div>
              </div>
              <div className={styles.Information}>
                <p className={styles.InformationText}>Contact information</p>
                <div className={styles.InfoBox}>
                  <p className={styles.Caption}>E-mail</p>
                  <p className={user.show_email ? styles.Info : styles.NoInfo}>
                    {user.show_email ? user.email : "The e-mail was hidden"}
                  </p>
                </div>
                <div className={styles.InfoBox}>
                  <p className={styles.Caption}>Address</p>
                  <p className={styles.Info}>{user.city}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.DescriptionBox}>
            <p className={styles.DescriptionCaption}>About</p>
            <div
              className={user.description ? styles.Description : styles.NoInfo}
            >
              {user.description || "There is no description yet..."}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default withLoading(UserProfile);
