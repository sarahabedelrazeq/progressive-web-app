import useToggle from "hooks/useToggle";
import React from "react";
import styles from "./style.module.css";
import { ReactComponent as OpenIcon } from "assets/images/plus.svg";
import { ReactComponent as CloseIcon } from "assets/images/minus.svg";

export default function FilterPanel({ title, values, addFilter, params }) {
  const [open, setOpen] = useToggle();

  return (
    <div className={styles.glassesFilter}>
      <div className={styles.glassesFilterTitleContainer}>
        <span className={styles.glassesFilterTitle}>{title}</span>
      </div>

      <div>
        <button
          onClick={setOpen}
          className={styles.glassesFilterTitleContainerButton}
        >
          <span className={styles.glassesFilterTitle}>{title}</span>
          <span>{open ? <CloseIcon /> : <OpenIcon />}</span>
        </button>
      </div>
      <div
        className={`${styles.glassesFilterListContainer} ${
          open ? "" : styles.glassesFilterListContainerClose
        }`}
      >
        <ul className={styles.glassesFilterList}>
          {values.map((value, index) => (
            <li key={index}>
              <button
                onClick={() => addFilter(title, value)}
                className={styles.glassesFilterButton}
                style={{
                  textDecoration:
                    params[title] && params[title].includes(value)
                      ? "underline"
                      : "",
                }}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
