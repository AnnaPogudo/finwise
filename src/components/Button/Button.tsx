import type { MouseEvent } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "error";
  disabled?: boolean;

  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string; 
}

function Button(props: ButtonProps) {
  const {
    variant = "primary",
    disabled = false,
    onClick,
    children,
    type = "button",
    isLoading,
    className = "",
  } = props;

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={handleOnClick}
    >
      {isLoading ? <span>Loading...</span> : children}
    </button>
  );
}

export default Button;