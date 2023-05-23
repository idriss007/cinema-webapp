import React from "react";
import Lottie from "react-lottie";
import animationData from "assets/private.json";

import styles from "./privatelink.module.css";

function PrivateLink() {
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
      <p className="h2 font-weight-bold">This list is not public!</p>
    </div>
  );
}

export default PrivateLink;
