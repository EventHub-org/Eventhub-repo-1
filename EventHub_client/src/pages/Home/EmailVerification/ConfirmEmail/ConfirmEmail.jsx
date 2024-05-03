import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloseWindowButton from "../../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import { GiConfirmed } from "react-icons/gi";
import { confirmEmail } from "../../../../api/confirmEmail";
import image from "../../../../images/EmailImage2.png";
import styles from "./ConfirmEmail.module.css";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const { confirmationToken } = useParams();

  useEffect(() => {
    const confirmUserEmail = async () => {
      try {
        const res = await confirmEmail(confirmationToken);
        const accessToken = res?.data?.token;
        localStorage.setItem("token", accessToken);
      } catch (error) {
        console.error("Error confirming email:", error);
      }
    };

    confirmUserEmail();
  }, []);

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.Header}>
          <CloseWindowButton onClick={() => navigate("/")} />
        </div>
        <div className={styles.EmailImage}>
          <img className={styles.Image} src={image} alt="Email Image 2" />
        </div>
        <GiConfirmed className={styles.Checked} />
        <p className={styles.Message}>
          Thank you for confirming your email. You can now access all the
          features of our platform.
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
