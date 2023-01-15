import { Main } from "components/Layouts";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/collections/spectacles-women");
  }, [navigate]);

  return <Main id="home-page"></Main>;
}
