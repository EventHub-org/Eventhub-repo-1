import React, { useState, useEffect, useContext } from "react";
import styles from "./GoogleSignUp.module.css";
import { Navigate, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import CloseWindowButton from "../../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import { checkEmail } from "../../SignUp/Registration/validation";
import AuthContext from "../../../../context/authProvider";
import withLoading from "../../../../utils/hoc/withLoading/withLoading";

const SignIn = ({ forgotPassword, setIsLoading }) => {
  const { googleRegister } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();

  const onFinish = async () => {
    try {
      setIsLoading(true);
      await googleRegister(searchParams.get("googleToken"), username);

      message.success("Login successful!");
      navigateTo("/");
      //setNavigate(true);
    } catch (err) {
      if (!err.response) {
        // Помилка з'єднання з сервером
        message.error("No server response");
      } else {
        const status = err.response.status;
        switch (status) {
          case 400:
            // Помилка валідації даних на сервері
            message.error(
              "Invalid email or password. Please check your input."
            );
            break;
          case 401:
            // Користувач не авторизований
            message.error("Unauthorized: Please check your credentials.");
            break;
          case 403:
            // Доступ заборонено
            message.error(
              "Forbidden: You do not have permission to access this resource."
            );
            break;
          case 404:
            // URL не знайдено
            message.error("Not Found: The requested resource was not found.");
            break;
          case 409:
            // Конфлікт
            message.error("Conflict: The resource already exists.");
            break;
          case 422:
            // Невірні вхідні дані
            message.error(
              "Unprocessable Entity: The request was well-formed but unable to be followed due to semantic errors."
            );
            break;
          case 500:
            // Внутрішня помилка сервера
            message.error(
              "Internal Server Error: Something went wrong on the server."
            );
            break;
          default:
            // Інші типи помилок
            console.error(err);
            message.error("Registration failed: " + err.response.data);
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      navigateTo("/");
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.InnerContainer}>
        <div className={styles.Buttons}>
          <CloseWindowButton onClick={() => navigateTo("/")} />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h1>Login</h1>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                // validator: checkEmail,
                message: "Please input your username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default withLoading(SignIn);
