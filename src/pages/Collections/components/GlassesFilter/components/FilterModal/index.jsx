import { Portal } from "components";
import React from "react";
import FilterPanel from "../FilterPanel";
import styles from "./style.module.css";
import { ReactComponent as CancelIcon } from "assets/images/x.svg";

export default function FilterModal({
  setFilterOpen,
  addFilter,
  params,
  filters,
  clearFilter,
  count,
}) {
  return (
    <Portal>
      <div className={styles.glassesFilterModalContainer}>
        <div className={styles.glassesFilterModalHeader}>
          <p>Filters</p>
          <button onClick={setFilterOpen}>
            <CancelIcon width="15" height="15" />
          </button>
        </div>
        <div className={styles.glassesFilterModalBody}>
          <div className={styles.glassesFilterContainerMain}>
            {filters.map(({ title, values }, index) => (
              <FilterPanel
                title={title}
                values={values}
                addFilter={addFilter}
                params={params}
                key={index}
              />
            ))}
          </div>
          <div className={styles.glassesFilterFooter}>
            <div className={styles.glassesFilterFooterStart}>
              <ul className={styles.glassesFilterFooterSelected}>
                {filters.map(({ title, values }, index) =>
                  values.map(
                    (value, index) =>
                      params[title] &&
                      params[title].includes(value) && (
                        <li key={index}>
                          <button
                            onClick={() => addFilter(title, value)}
                            className={styles.glassesFilterButton}
                          >
                            <span>{value}</span>
                            <CancelIcon />
                          </button>
                        </li>
                      )
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.glassesFilterFooterButtons}>
          <button
            onClick={clearFilter}
            className={styles.glassesFilterFooterButton}
          >
            CLEAR FILTERS ( {count} )
          </button>
          <button
            onClick={setFilterOpen}
            className={styles.glassesFilterFooterButton}
          >
            DONE
          </button>
        </div>
      </div>
    </Portal>
  );
}
