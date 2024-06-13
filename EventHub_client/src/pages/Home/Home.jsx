import { useOutlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Map } from "./Map/Map";
import useAuth from "../../hooks/useAuth";
import styles from "./Home.module.css";
import { useJsApiLoader } from "@react-google-maps/api";
import MenuButton from "./ProfileORlogin/ProfileButton";
import LoginRegisterButton from "./ProfileORlogin/LoginRegisterButton";
import React, { useContext, useEffect } from "react";

import SearchEvents from "./Search/Search";
import CreateEvent from "./CreateEvent/CreateEvent";
import EventFilter from "./Filter/Filter";
import MyEvents from "./MyEvents/MyEvents";
import withLoading from "../../utils/hoc/withLoading/withLoading";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const Home = ({ setIsLoading }) => {
  //const authenticated = useLogin();
  const { auth, setAuth } = useAuth();

  const outlet = useOutlet();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
    libraries,
  });

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  return (
    <div className={styles.Home}>
      {isLoaded && (
        <>
          <Map />

          {auth.token ? <MenuButton /> : <LoginRegisterButton />}

          <SearchEvents />
          <CreateEvent />
          <EventFilter />
          <MyEvents />

          {outlet}
        </>
      )}
    </div>
  );
};

export default withLoading(Home);
