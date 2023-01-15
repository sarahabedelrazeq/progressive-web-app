import React from "react";
import styles from "./style.module.css";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import { ReactComponent as CancelIcon } from "assets/images/x.svg";
import FilterPanel from "./components/FilterPanel";
import useToggle from "hooks/useToggle";
import FilterModal from "./components/FilterModal";

const filters = [
  {
    title: "colour",
    values: ["black", "tortoise", "coloured", "crystal", "dark", "bright"],
  },
  {
    title: "fit",
    values: ["narrow", "medium", "wide"],
  },
  {
    title: "shape",
    values: ["square", "rectangle", "round", "cat-eye"],
  },
  {
    title: "material",
    values: ["metal", "acetate", "combined"],
  },
];

export default function GlassesFilter({
  collectionName,
  params,
  addFilter,
  clearFilter,
  totalCount,
}) {
  const [trialAvailable, setTrialAvailable] = useToggle();
  const [filterOpen, setFilterOpen] = useToggle();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let counter = 0;
    Object.values(params).forEach((item) => {
      if (item && item.length >= 0) counter += item.length;
      else counter++;
    });
    setCount(counter);
  }, [params]);

  return (
    <div className={styles.glassesFilter}>
      <div className={styles.glassesFilterHeader}>
        <div className={styles.glassesFilterHeaderStart}>
          <div>
            <p className={styles.glassesFilterHeaderSwitcherLabel}>
              {" "}
              TRIAL AVAILABLE
            </p>
          </div>

          <div>
            <button
              onClick={setTrialAvailable}
              className={styles.glassesFilterHeaderSwitcher}
            >
              <span
                className={
                  trialAvailable
                    ? styles.glassesFilterHeaderSwitcherToggleChecked
                    : styles.glassesFilterHeaderSwitcherToggle
                }
              ></span>
            </button>
          </div>
        </div>
        <div className={styles.glassesFilterHeaderCenter}>
          <h1 className={styles.glassesFilterTitle}> {collectionName} </h1>
        </div>
        <div className={styles.glassesFilterHeaderEnd}>
          <div className={styles.glassesFilterHeaderFilter}>
            <button
              onClick={setFilterOpen}
              className={styles.glassesFilterHeaderToggle}
            >
              <span>FILTERS</span>
              <img
                src="/images/filter.png"
                width="20"
                height="22"
                alt="filter icon"
                loading="lazy"
              />
              {count > 0 && (
                <span className={styles.glassesFilterHeaderToggleCount}>
                  {count}
                </span>
              )}
            </button>
          </div>
          <div className={styles.glassesFilterHeaderSearch}>
            <span>SEARCH</span>
            <SearchIcon />
          </div>
        </div>
      </div>

      <div
        className={styles.glassesFilterContainer}
        style={{
          maxHeight: filterOpen ? "1200px" : 0,
        }}
      >
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
              )}{" "}
            </ul>
          </div>
          <div>
            <p className={styles.glassesFilterFooterText}>
              {totalCount} RESULTS FOUND
            </p>
          </div>
          <div className={styles.glassesFilterFooterEnd}>
            {Object.values(params).length > 0 && (
              <button
                onClick={clearFilter}
                className={styles.glassesFilterFooterText}
              >
                CLEAR FILTERS
              </button>
            )}
          </div>
        </div>
      </div>

      {filterOpen && (
        <FilterModal
          setFilterOpen={setFilterOpen}
          addFilter={addFilter}
          params={params}
          filters={filters}
          clearFilter={clearFilter}
          count={count}
        />
      )}
    </div>
  );
}
