import { FC } from "react";

import styles from "./Spinner.module.scss";

interface SpinnerProps {
  visible?: boolean;
}

export const Spinner: FC<SpinnerProps> = ({ visible = true }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.spinner}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};
