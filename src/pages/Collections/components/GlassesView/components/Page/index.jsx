import { GlassSlider } from "components";
import { useOnScreen } from "hooks";
import React from "react";
import styles from "./style.module.css";

export default function Page({ glasses, page, onPageView }) {
  const ref = React.useRef(null);
  const onScreen = useOnScreen(ref);

  React.useEffect(() => {
    if (onScreen) onPageView(page);
  }, [onScreen, onPageView, page]);

  return (
    <div ref={ref}>
      <ul className={styles.glassesViewList}>
        {glasses?.map((item, index) => {
          return (
            <li className={styles.glassesViewListItem} key={index}>
              <GlassSlider {...item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
