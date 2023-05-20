import React from "react";

import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordVisibilityIcon({ showPassword, handleShowPassword, id }) {
  return showPassword.includes(id) ? (
    <AiFillEye
      className="cursor-pointer-hover"
      size="30"
      onClick={() => handleShowPassword(id)}
    />
  ) : (
    <AiOutlineEyeInvisible
      className="cursor-pointer-hover"
      size="30"
      onClick={() => handleShowPassword(id)}
    />
  );
}

export default PasswordVisibilityIcon;
