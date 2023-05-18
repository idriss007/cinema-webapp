import React from "react";
import clsx from "clsx";

//React Icons
import { BsImage } from "react-icons/bs";

//Stylesheet
import styles from "./imagenotfound.module.css";

function ImageNotFound({ size, containerWidth, containerHeight }) {
  const style = {
    width: containerWidth,
    height: containerHeight,
  };
  return (
    <div className={clsx("row no-gutters")}>
      <div
        style={style}
        className={clsx(
          styles.container,
          "d-flex justify-content-center align-items-center rounded"
        )}
      >
        <BsImage size={size} />
      </div>
    </div>
  );
}

export default ImageNotFound;
