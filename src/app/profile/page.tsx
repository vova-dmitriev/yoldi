"use client";

import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import ImageIcon from "@/assets/icons/image.svg";
import EditIcon from "@/assets/icons/pen.svg";
import LogoutIcon from "@/assets/icons/sign-out.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import UploadIcon from "@/assets/icons/upload.svg";
import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { useAppDispatch, useUserSelector } from "@/hooks/redux";
import { logout } from "@/store/slices/authSlice";
import { resetUser, setUser } from "@/store/slices/userSlice";

import styles from "./profile.module.scss";

const fetcher = (url: string) => UsersService.getUser().then((res) => res.data);

const Profile = () => {
  const { data, error, isLoading } = useSWR("/profile", fetcher);
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  const handleEditClick = () => {};

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    router.push(PUBLIC_ROUTES.login);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || !user)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        {user?.cover ? (
          <Image src={user.cover.url} alt="cover" className={styles.cover} />
        ) : (
          <div className={cn(styles.cover, styles.coverEmpty)} />
        )}
        {user?.cover && (
          <Button
            className={styles.coverBtn}
            leftIcon={TrashIcon}
            rightIcon={ImageIcon}
          >
            Удалить
          </Button>
        )}
        {!user?.cover && (
          <Button
            className={styles.coverBtn}
            leftIcon={UploadIcon}
            rightIcon={ImageIcon}
          >
            Загрузить
          </Button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.avatar}>
          <Avatar size="big" user={user} />
        </div>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.title}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </div>
            <Button
              className={styles.editBtn}
              leftIcon={EditIcon}
              onClick={handleEditClick}
            >
              Редактировать
            </Button>
          </div>

          {user.description && (
            <div className={styles.description}>{user.description}</div>
          )}
        </div>
        <div className={styles.bottom}>
          <Button
            className={styles.logoutBtn}
            leftIcon={LogoutIcon}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
