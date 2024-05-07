import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import { confirmEmail } from "../../../../api/confirmEmail";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const { confirmationToken } = useParams();

  useEffect(() => {
    const confirmUserEmail = async () => {
      try {
        const res = await confirmEmail(confirmationToken);
        const accessToken = res?.data?.token;
        localStorage.setItem("token", accessToken);

        message.success("Registration successful!");
      } catch (error) {
        if (error.response) {
          message.error(error.response.data);
        } else {
          message.error("Error confirming email!");
        }
      } finally {
        navigate("/");
      }
    };

    confirmUserEmail();
  }, []);
};

export default ConfirmEmail;
