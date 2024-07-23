import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import LogoutIcon from "@/assets/icons/sign-out.svg";
import { IUser } from "@/interfaces/user.interface";

import { Avatar } from "../Avatar/Avatar";
import { Cover } from "../Cover/Cover";
import { Button } from "../UI/Button/Button";
import styles from "./UserInfo.module.scss";

interface UserInfoProps {
  user: IUser;
  isProfile?: boolean;
  handleEditClick?: () => void;
  handleLogout?: () => void;
}

export const UserInfo: FC<UserInfoProps> = ({
  user,
  isProfile,
  handleEditClick,
  handleLogout,
}) => {
  return (
    <>
      <Cover user={user} isProfile={isProfile} />
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Avatar size="big" user={user} isProfile={isProfile} />
        </div>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.title}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </div>
            {isProfile && (
              <Button
                className={styles.editBtn}
                leftIcon={EditIcon}
                onClick={handleEditClick}
              >
                Редактировать
              </Button>
            )}
          </div>

          {user.description && (
            <div className={styles.description}>{user.description}</div>
          )}
        </div>
        {isProfile && (
          <div className={styles.bottom}>
            <Button
              className={styles.logoutBtn}
              leftIcon={LogoutIcon}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
