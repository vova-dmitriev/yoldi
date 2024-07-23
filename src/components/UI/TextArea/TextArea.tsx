import cn from "classnames";
import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

import styles from "./TextArea.module.scss";

interface ExtraTextAreaProps {
  className?: string;
  handleChange?: (value: string) => void;
  error?: string;
}

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  ExtraTextAreaProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, handleChange, error, ...props }, ref) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.textAreaWrapper}>
          <textarea
            className={styles.textArea}
            {...props}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              handleChange && handleChange(e.target.value);
            }}
            ref={ref}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
