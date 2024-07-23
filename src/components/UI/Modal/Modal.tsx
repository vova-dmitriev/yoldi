import cn from "classnames";
import { FC, PropsWithChildren } from "react";

import styles from "./Modal.module.scss";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  className?: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  setIsOpen,
  className,
  children,
}) => {
  return (
    <div
      className={cn(styles.wrapper, isOpen && styles.wrapperOpen)}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={cn(styles.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
