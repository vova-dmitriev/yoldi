import cn from "classnames";
import Image from "next/image";
import {
  DetailedHTMLProps,
  FC,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

import EyeIcon from "@/assets/icons/eye.svg";

import styles from "./Input.module.scss";

interface ExtraInputProps {
  className?: string;
  search?: boolean;
  handleChange?: (value: string) => void;
  icon?: string;
  error?: string;
}

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ExtraInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, search, handleChange, icon, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(props?.type === "password");

    const handleEyeClick = () => {
      setIsPassword(!isPassword);
    };

    return (
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.inputWrapper}>
          {icon && <Image src={icon} className={styles.icon} alt="icon" />}
          <input
            className={styles.input}
            {...props}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              handleChange && handleChange(e.target.value);
            }}
            type={isPassword ? "password" : props.type}
            autoComplete={isPassword ? "current-password" : ""}
            ref={ref}
          />
          {props?.type === "password" && (
            <Image
              className={styles.eye}
              src={EyeIcon}
              alt="eye"
              onClick={handleEyeClick}
            />
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
