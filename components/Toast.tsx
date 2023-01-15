import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle
} from "react-icons/fa";

export type DisplayIcon = "success" | "info" | "error" | "warning"

export const displayIcon = (type:DisplayIcon) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

type ToastMsg = {
  type: DisplayIcon,
  message: string,
  url?: string
}

const ToastMessage = ({ type, message, url }: ToastMsg) =>
  toast[type](
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
      { url &&
        <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px", textDecoration: "underline", color:"green" }}>
          <a href={url} target="_blank">Check transaction status here!</a>
        </div>
      }
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
