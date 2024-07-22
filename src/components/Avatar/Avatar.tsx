import cn from "classnames";
import { FC } from "react";

import { IUser } from "@/interfaces/user.interface";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  user: IUser;
  size: "normal" | "big";
  isProfile?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ user, size }) => {
  return (
    <div className={cn(styles.avatar, size === "big" && styles.big)}>
      {!user?.image && user.name[0]}
    </div>
  );
};
