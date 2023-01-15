import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./style.module.css";

function Fallback() {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallback}>
        <ClipLoader
          color="#0d6efd"
          loading={true}
          cssOverride={{
            display: "block",
          }}
          size={150}
        />
      </div>
    </div>
  );
}

export default React.memo(Fallback);
