import React from "react";
import { ReactComponent as ArrowRight } from "assets/images/arrowRight.svg";
import { ReactComponent as ArrowLeft } from "assets/images/arrowLeft.svg";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Menu({ open, menCollections, womenCollections }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    setActive(0);
  }, [open]);

  return (
    <div>
      <div
        className={`${styles.navbarItemMenu} ${
          open ? styles.navbarItemMenuOpen : ""
        }`}
      >
        <div className={styles.sideMenuHeader}>
          <ul>
            <li className={styles.sideMenuHeaderTap}>
              <button
                className={styles.sideMenuHeaderTapButton}
                onClick={() => setActive(1)}
              >
                <span>Women</span> <ArrowRight />
              </button>
            </li>
            <li className={styles.sideMenuHeaderTap}>
              <button
                className={styles.sideMenuHeaderTapButton}
                onClick={() => setActive(2)}
              >
                <span>Men</span> <ArrowRight />
              </button>
            </li>
            <li className={styles.sideMenuHeaderTap}>
              <Link to="/" className={styles.sideMenuHeaderTapButton}>
                <span>Home Try On</span>
              </Link>
            </li>
            <li className={styles.sideMenuHeaderTap}>
              <Link to="/" className={styles.sideMenuHeaderTapButton}>
                <span>Free Eye Test</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sideMenuBody}>
          <ul>
            <li className={styles.sideMenuBodyLink}>
              <Link to="/" className={styles.sideMenuBodyLinkButton}>
                <span> About us </span>
              </Link>
            </li>
            <li className={styles.sideMenuBodyLink}>
              <Link to="/" className={styles.sideMenuBodyLinkButton}>
                <span> Pair for Pair </span>
              </Link>
            </li>
            <li className={styles.sideMenuBodyLink}>
              <Link to="/" className={styles.sideMenuBodyLinkButton}>
                <span> Factories </span>
              </Link>
            </li>
            <li className={styles.sideMenuBodyLink}>
              <Link to="/" className={styles.sideMenuBodyLinkButton}>
                <span> Journal </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sideMenuFooter}>
          <Link to="/login" className={styles.sideMenuFooterButton}>
            <span>Login</span>
          </Link>
          <Link className={styles.sideMenuFooterButton} to="/pages/help">
            <span>Help</span>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.navbarItemMenu} ${
          open && active === 1 ? styles.navbarItemMenuOpen : ""
        }`}
      >
        <div className={styles.sideMenuHeader}>
          <ul>
            <li className={styles.sideMenuHeaderTapBack}>
              <button
                className={styles.sideMenuHeaderTapButton}
                onClick={() => setActive(0)}
              >
                <ArrowLeft /> <span>Go Back</span>
              </button>
            </li>

            {womenCollections.map((collection, index) => (
              <li className={styles.sideMenuHeaderTap} key={index}>
                <Link
                  to={`/collections/${collection?.configuration_name}`}
                  className={styles.sideMenuHeaderTapButton}
                >
                  <span>{collection.name}</span> <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`${styles.navbarItemMenu} ${
          open && active === 2 ? styles.navbarItemMenuOpen : ""
        }`}
      >
        <div className={styles.sideMenuHeader}>
          <ul>
            <li className={styles.sideMenuHeaderTapBack}>
              <button
                className={styles.sideMenuHeaderTapButton}
                onClick={() => setActive(0)}
              >
                <ArrowLeft /> <span>Go Back</span>
              </button>
            </li>

            {menCollections.map((collection, index) => (
              <li className={styles.sideMenuHeaderTap} key={index}>
                <Link
                  to={`/collections/${collection?.configuration_name}`}
                  className={styles.sideMenuHeaderTapButton}
                >
                  <span>{collection.name}</span> <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Menu);
