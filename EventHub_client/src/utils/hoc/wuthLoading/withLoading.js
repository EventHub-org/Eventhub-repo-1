import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./withLoading.module.css";

const withLoading = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div>
        <div className={styles["loading-circle"]}>
          {isLoading && (
            <LoadingOutlined
              style={{ fontSize: "72px", color: "#aaaaaa", fontWeigh: "1000" }}
            />
          )}
        </div>
        <WrappedComponent {...props} setIsLoading={setIsLoading} />
      </div>
    );
  };
};

export default withLoading;
