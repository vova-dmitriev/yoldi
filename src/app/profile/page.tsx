"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import EditIcon from "@/assets/icons/pen.svg";
import LogoutIcon from "@/assets/icons/sign-out.svg";
import { Avatar } from "@/components/Avatar/Avatar";
import { Cover } from "@/components/Cover/Cover";
import { EditProfileModal } from "@/components/Modals/EditProfile/EditProfileModal";
import { Button } from "@/components/UI/Button/Button";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useAppDispatch, useUserSelector } from "@/hooks/redux";
import { logout } from "@/store/slices/authSlice";
import { resetUser, setUser } from "@/store/slices/userSlice";

import styles from "./profile.module.scss";

const fetcher = (url: string) => UsersService.getUser().then((res) => res.data);

const Profile = () => {
  const { data, error, isLoading } = useSWR(PRIVATE_ROUTES.profile, fetcher);
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      router.push(PUBLIC_ROUTES.login);
    }
  }, [error, router]);

  const handleEditClick = () => {
    setModalVisible(true);
  };

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
      <Cover user={user} />

      <div className={styles.content}>
        <div className={styles.avatar}>
          <Avatar size="big" user={user} isProfile />
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

      <EditProfileModal isOpen={isModalVisible} setIsOpen={setModalVisible} />
    </div>
  );
};

export default Profile;
