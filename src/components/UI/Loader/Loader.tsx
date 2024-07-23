import cn from "classnames";
import { FC } from "react";

import styles from "./Loader.module.scss";

interface LoaderProps {
  dark?: boolean;
}

export const Loader: FC<LoaderProps> = ({ dark }) => {
  return (
    <div className={cn(styles.newtonsCradle, dark && styles.newtonsCradleDark)}>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
    </div>
  );
};
