import React from "react";
import styles from "./style.module.css";
import Slider from "./Slider";

export default function GlassSlider({ name, glass_variants }) {
  const [activeItem, setActiveItem] = React.useState(0);

  return (
    <div className={styles.glassSlider}>
      <div className={styles.glassSliderHeader}>
        <span className={styles.mainName}>{name}</span>
        <span className={styles.subName}>{activeItem?.colour?.name}</span>
      </div>

      <div>
        <Slider glass_variants={glass_variants} setActiveItem={setActiveItem} />
      </div>
    </div>
  );
}
