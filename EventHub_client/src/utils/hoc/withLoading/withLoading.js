import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./withLoading.module.css";

function withLoading(WrappedComponent) {
  function WithLoading(props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div>
        {isLoading && (
          <div className={styles["loading-circle"]}>
            <LoadingOutlined
              style={{
                fontSize: "72px",
                color: "#fff",
                fontWeigh: "1000",
              }}
            />
          </div>
        )}
        <WrappedComponent {...props} setIsLoading={setIsLoading} />
      </div>
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  WithLoading.displayName = `withLoading(${wrappedComponentName})`;
  return WithLoading;
}

export default withLoading;
