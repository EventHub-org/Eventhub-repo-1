import { Input, message } from "antd";
import { FaUnlock } from "react-icons/fa";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  return (
    <div className={styles.OuterContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.Buttons}>
          <p className={styles.Caption}>Reset password</p>
          <CloseWindowButton onClick={() => {}} />
        </div>
        <FaUnlock className={styles.Lock} />
        <div className={styles.InstructionsContainer}>
          <p className={styles.SecondaryCaption}>Follow these instructions:</p>
          <div className={styles.Instructions}>
            1. Enter your new password in the "New password" field.
            <br />
            2. Confirm your new password by entering it again in the "Confirm
            new password" field.
            <br />
            3. Click on the "Reset Password" button to complete the process.
          </div>
        </div>

        <div className={styles.PasswordsContainer}>
          <div className={styles.Password}>
            <p className={styles.PasswordCaption}>New password</p>
            <Input.Password
              className={styles.PasswordField}
              type="password"
              placeholder="Enter new password"
              name="new_password"
            />
          </div>
          <div className={styles.Password}>
            <p className={styles.PasswordCaption}>Confirm new password</p>
            <Input.Password
              className={styles.PasswordField}
              type="password"
              placeholder="Confirm new password"
              name="confirmNewPassword"
            />
          </div>
        </div>
        <PrimaryButton children={"Reset"} className={styles.ResetButton} />
      </div>
    </div>
  );
};

export default ResetPassword;
