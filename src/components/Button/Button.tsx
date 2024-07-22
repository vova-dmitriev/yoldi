import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ExtraButtonProps {
  className?: string;
  inactive?: boolean;
  dark?: boolean;
}

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ExtraButtonProps;

import styles from "./Button.module.scss";

export const Button: FC<ButtonProps> = ({
  className,
  inactive,
  dark,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles.button,
        inactive && styles.inactive,
        dark && styles.dark,
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
