import React from "react";
import s from "./style.module.less";
import Card from "../../components/Card";

const Home: React.FC = () => {
  return (
    <div className={s.home}>
      <Card />
    </div>
  );
}; 

export default Home;
