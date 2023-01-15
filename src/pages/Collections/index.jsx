import { Main } from "components/Layouts";
import React from "react";
import styles from "./style.module.css";
import withContainer from "./Container";
import GlassesView from "./components/GlassesView";
import GlassesFilter from "./components/GlassesFilter";

function Collections({
  glasses,
  onPageView,
  params,
  addFilter,
  clearFilter,
  collectionName,
}) {
  return (
    <Main id="home-page">
      <section id="glasses-filter">
        <GlassesFilter
          params={params}
          addFilter={addFilter}
          clearFilter={clearFilter}
          collectionName={collectionName}
          totalCount={glasses.totalCount}
        />
      </section>
      <section id="glasses-view">
        <GlassesView glasses={glasses} onPageView={onPageView} />
      </section>
    </Main>
  );
}
export default withContainer(React.memo(Collections));
