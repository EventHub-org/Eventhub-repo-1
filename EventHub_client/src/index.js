import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="821236246469-8omalj0m9hgfe75iv9cje1rrlsa6umha.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
