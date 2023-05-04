import React from "react";

function Button({
  children,
  padding,
  width,
  color,
  backgroundColor,
  borderRadius,
}) {
  const style = {
    width: width,
    padding: padding,
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    border: "0",
  };

  return (
    <div className="">
      <button style={style}>{children}</button>
    </div>
  );
}

export default Button;
