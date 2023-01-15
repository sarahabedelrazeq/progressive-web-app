import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.css";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import Menu from "./Menu";
import { useFetch, useHover } from "hooks";
import { ReactComponent as CloseIcon } from "assets/images/x.svg";

const Header = () => {
  const [womenCollections, setWomenCollections] = React.useState([]);
  const [menCollections, setMenCollections] = React.useState([]);
  const [collectionsResponse, collectionsRequest] = useFetch("/collections");
  const [ref, isHovered] = useHover();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    collectionsRequest();
  }, [collectionsRequest]);

  React.useEffect(() => {
    const collections = collectionsResponse.result?.collections;
    if (collections && collections.length > 0) {
      setWomenCollections(
        collections.filter((item) => item.name.includes(" Women"))
      );
      setMenCollections(
        collections.filter((item) => item.name.includes(" Men"))
      );
    }
  }, [collectionsResponse.result]);

  React.useEffect(() => {
    setOpen(isHovered);
  }, [isHovered]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.mainHeader}>
      <nav>
        <ul className={styles.mainNavbar}>
          <li className={`${styles.navbarItem}`} ref={ref}>
            <button
              onClick={() => setOpen(true)}
              className={`${styles.navbarItemButton} ${
                open ? styles.navbarItemOpenButton : ""
              }`}
            >
              MENU
            </button>
            {open && (
              <button
                onClick={() => setOpen(false)}
                className={`${styles.navbarItemButton} ${styles.navbarItemCloseButton}`}
              >
                <CloseIcon />
              </button>
            )}
            <Menu
              open={open}
              womenCollections={womenCollections}
              menCollections={menCollections}
            />
          </li>
          <li className={`${styles.navbarItem} ${styles.navbarItemShowInXXl}`}>
            <Link className={styles.navbarItemButton} to="/">
              FREE EYE TEST
            </Link>
          </li>
          <li className={`${styles.navbarItem} ${styles.navbarItemShowInXXl}`}>
            <Link className={styles.navbarItemButton} to="/">
              ABOUT US
            </Link>
          </li>
          <li className={styles.navbarLogo}>
            <Logo width="138" height="22" />
          </li>
          <li className={`${styles.navbarItem} ${styles.navbarItemShowInXXl}`}>
            <Link className={styles.navbarItemButton} to="/">
              HELP
            </Link>
          </li>
          <li className={`${styles.navbarItem} ${styles.navbarItemShowInXXl}`}>
            <Link className={styles.navbarItemButton} to="/">
              LOGIN
            </Link>
          </li>
          <li className={`${styles.navbarItem}`}>
            <Link className={styles.navbarItemButton} to="/">
              BAG (0)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
