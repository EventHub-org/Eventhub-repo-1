import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { Input } from "antd";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton/PrimaryButton";
import CloseWindowButton from "../../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import GoBackButtn from "../../../../components/Buttons/GoBackButton/GoBackButton";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = ({logIn}) => {
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setShowButton(emailRegex.test(value));
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Close}>
        <GoBackButtn onClick={logIn}/>
        <CloseWindowButton onClick={()=>navigate("/")}/>
      </div>
      <FaLock className={styles.Lock} />
      <div className={styles.Main}>
        <p className={styles.MainText}>Forgot Password?</p>
        <p className={styles.SecondText}>You can reset your password here.</p>
      </div>
      <p className={styles.EmailPrompt}>
        Please enter the email address associated with your account. We will
        send you a link to reset your password. If you do not receive an email
        within a few minutes, please check your spam folder or try again.
      </p>
      <Input
        prefix={<MdOutlineMailLock className="site-form-item-icon" />}
        className={`${styles.Input} ${email ? (showButton ? styles.InputValid : styles.InputInvalid) : ''}`}
        placeholder="Enter your email address"
        onChange={handleEmailChange}
      />
      <PrimaryButton
        children={"Reset Password"}
        className={`${styles.Button} ${
          showButton ? styles.ActiveButton : styles.DisabledButton
        }`}
      />
    </div>
  );
};

export default ForgotPassword;
