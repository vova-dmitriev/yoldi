import cn from "classnames";
import Image from "next/image";
import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from "react";

import EyeIcon from "@/assets/icons/eye.svg";

import styles from "./Input.module.scss";

interface ExtraInputProps {
  className?: string;
  search?: boolean;
  handleChange: (value: string) => void;
  icon?: string;
  error?: string;
}

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ExtraInputProps;

export const Input: FC<InputProps> = ({
  className,
  search,
  handleChange,
  icon,
  error,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(props?.type === "password");

  const handleEyeClick = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      {icon && <Image src={icon} className={styles.icon} alt="icon" />}
      <input
        className={styles.input}
        {...props}
        onChange={(e) => handleChange(e.target.value)}
        type={isPassword ? "password" : "text"}
      />
      {props?.type === "password" && (
        <Image
          className={styles.eye}
          src={EyeIcon}
          alt="eye"
          onClick={handleEyeClick}
        />
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
