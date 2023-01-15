import { ads } from "data";
import { useOnScreen } from "hooks";
import React from "react";
import GlassesPage from "./components/Page";
import styles from "./style.module.css";

export default function GlassesView({ glasses, onPageView }) {
  const lastGlassRef = React.useRef(null);
  const onScreen = useOnScreen(lastGlassRef);

  React.useEffect(() => {
    if (onScreen) onPageView();
  }, [onScreen, onPageView]);

  return (
    <div>
      {glasses.items && glasses.items.length > 0 && (
        <React.Fragment>
          {glasses.items.map((page, index) => (
            <React.Fragment key={index}>
              <GlassesPage
                glasses={page.items}
                page={page.page}
                onPageView={onPageView}
              />
              {index < glasses.items.length - 1 && (
                <div className={styles.adContainer}>
                  <h3 className={styles.adTitle}>
                    {ads[index % ads.length].title}
                  </h3>
                  <p className={styles.adText}>
                    {ads[index % ads.length].text}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
