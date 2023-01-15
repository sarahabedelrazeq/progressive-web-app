import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.css";

const Main = (props) => {
  return (
    <div id="main-layout">
      <Header />
      <div className={styles.pageContainer} id={props.id ? props.id : "page"}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
export default Main;
