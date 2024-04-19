import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import CancelButton from "../../../components/Buttons/CancelButton/CancelButton";
import ApplyChangesButton from "../../../components/Buttons/ApplyChangesButton/ApplyChangesButton";
import { changePassword } from "../../../api/changePassword";
import styles from "./ChangePassword.module.css";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirmNewPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const confirmPassword = () =>{
    if(passwords.new_password !== passwords.confirmNewPassword){
        throw new Error("Failed to confirm password");
    }
  }
  const handleApply = async () =>{
    try{
        confirmPassword();
        await changePassword(passwords)
        message.success("Password successfully updated");
        handleClose()
    }
    catch(error){
        if (error.response && error.response.data) {
            message.error('Password change failed: ' + error.response.data); // Access response data from the error object
        } else {
            message.error('Password change failed: ' + error.message); // Fallback message if response data is not available
        }
    }
  }

  const handleClose = () => {
      navigate("/");
  }

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.Buttons}>
          <p className={styles.Caption}>Change password</p>
          <CloseWindowButton onClick={handleClose} />
        </div>
        <div className={styles.PasswordsContainer}>
          <div className={styles.Password}>
            <p className={styles.PasswordCaption}>Old password</p>
            <Input.Password
              className={styles.PasswordField}
              type="password"
              placeholder="Enter old password"
              name="old_password"
              value={passwords.old_password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.Password}>
            <p className={styles.PasswordCaption}>New password</p>
            <Input.Password
              className={styles.PasswordField}
              type="password"
              placeholder="Enter new password"
              name="new_password"
              value={passwords.new_password}
              onChange={handleChange}
              
            />
          </div>
          <div className={styles.Password}>
            <p className={styles.PasswordCaption}>Confirm new password</p>
            <Input.Password
              className={styles.PasswordField}
              type="password"
              placeholder="Confirm new password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Buttons}>
          <CancelButton onclick={handleClose}/>
          <ApplyChangesButton onClick={handleApply}/>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;