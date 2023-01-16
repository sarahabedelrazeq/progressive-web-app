import { Main } from "components/Layouts";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return <Main id="home-page"></Main>;
}
