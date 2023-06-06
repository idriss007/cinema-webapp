import React from "react";
import clsx from "clsx";

import styles from "./footer.module.css";

function Footer() {
  return (
    <div
      className={clsx(styles.footer, "text-center position-fixed w-100 p-2")}
    >
      © 2023 by İdris USLU
    </div>
  );
}

export default Footer;
