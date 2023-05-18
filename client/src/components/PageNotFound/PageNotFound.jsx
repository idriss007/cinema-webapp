import React from "react";
import Lottie from "react-lottie";
import animationData from "assets/404.json";

import styles from "./pagenotfound.module.css";

function PageNotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default PageNotFound;
