// MenuButton.jsx
import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import ProfileInfo from "../../../components/ProfileInfo/ProfileInfo";
import { getUsername } from "../../../api/getUsername";
import styles from "./Buttons.module.css";

const MenuButton = () => {
  const { setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [linkToProfile, setLinkToProfile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await getUsername();
        setLinkToProfile(`/profile/${username}`);
      } catch (error) {
        setLinkToProfile("/register");
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (e) => {
    if (e.key === "profile") {
      console.log("Profile clicked");
    } else if (e.key === "logout") {
      localStorage.removeItem("token");
      setAuth({});
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown
      overlay={
        <Menu className={styles.customMenu} onClick={handleMenuClick}>
          <Menu.Item icon={<UserOutlined />} key="profile">
            <Link to={linkToProfile} key="profile-link">Profile</Link>
          </Menu.Item>
          <Menu.Item icon={<SafetyOutlined />} key="change-password">
            <Link to="profile/change-password" key="change-password-link">Change password</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} key="logout">
            Log out
          </Menu.Item>
        </Menu>
      }
      trigger={["click"]}
      visible={isOpen}
      onVisibleChange={toggleMenu}
    >
      <ProfileInfo onProfileClick={toggleMenu} />
    </Dropdown>
  );
};

export default MenuButton;
