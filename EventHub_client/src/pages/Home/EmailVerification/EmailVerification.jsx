import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import CountdownCircle from "../../../components/CountdownCircle/CountdownCircle";
import ResendButton from "./ResendButton/ResendButton";
import styles from "./EmailVerification.module.css";
import ProcessingEffect from "../../../components/ProcessingEffect/ProcessingEffect";
import image from "../../../images/EmailImage1.png";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    function checkEmail() {
      if (!searchParams.get("email")) {
        navigate("/register");
      }
    }
    checkEmail();
  }, [searchParams]);

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.EmailImage}>
          <img className={styles.Image} src={image} alt="Email Image 1" />
        </div>
        <p className={styles.Heading}>Email Confirmation</p>
        <p className={styles.MainInfo}>
          We have sent email to{" "}
          <span className={styles.Email}>{searchParams.get("email")}</span> to
          confirm the validity of your email address. After receiving the email
          follow the link provided to complete your registration. The window
          will be automatically closed when you will confirm the email.
        </p>
        <p className={styles.SecondText}>
          If you haven’t got any email just press the button to resend it!
        </p>
        <div className={styles.Bottom}>
          <ResendButton />
          <CountdownCircle seconds={60} onFinish={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
