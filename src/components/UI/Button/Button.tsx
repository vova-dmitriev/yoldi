import cn from "classnames";
import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ExtraButtonProps {
  className?: string;
  inactive?: boolean;
  dark?: boolean;
  leftIcon?: string;
  rightIcon?: string;

  isLoading?: boolean;
}

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ExtraButtonProps;

import { Loader } from "../Loader/Loader";
import styles from "./Button.module.scss";

export const Button: FC<ButtonProps> = ({
  className,
  inactive,
  dark,
  leftIcon,
  rightIcon,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        styles.button,
        dark && !inactive && styles.dark,
        inactive && styles.inactive,
        className
      )}
      disabled={inactive}
    >
      {leftIcon && (
        <Image
          src={leftIcon}
          alt="icon left"
          className={cn(styles.icon, styles.iconLeft)}
        />
      )}
      {isLoading ? <Loader dark={dark} /> : props.children}

      {rightIcon && (
        <Image
          src={rightIcon}
          alt="icon right"
          className={cn(styles.icon, styles.iconRight)}
        />
      )}
    </button>
  );
};
