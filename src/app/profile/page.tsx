"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import EditIcon from "@/assets/icons/pen.svg";
import LogoutIcon from "@/assets/icons/sign-out.svg";
import { Avatar } from "@/components/Avatar/Avatar";
import { Cover } from "@/components/Cover/Cover";
import { EditProfileModal } from "@/components/Modals/EditProfile/EditProfileModal";
import { Button } from "@/components/UI/Button/Button";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { PASSWORD } from "@/constants/localStorage";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useAppDispatch, useUserSelector } from "@/hooks/redux";
import { useLoadProfile } from "@/hooks/useLoadProfile";
import { logout } from "@/store/slices/authSlice";
import { resetUser, setPassword, setUser } from "@/store/slices/userSlice";

import styles from "./profile.module.scss";

const fetcher = () => UsersService.getProfile().then((res) => res.data);

const Profile: FC = () => {
  const { data, error, isLoading } = useLoadProfile();
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(setPassword(localStorage.getItem(PASSWORD) || ""));
  }, [dispatch]);

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

  if (!data || !user || isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <UserInfo
        user={user}
        isProfile
        handleEditClick={handleEditClick}
        handleLogout={handleLogout}
      />

      <EditProfileModal isOpen={isModalVisible} setIsOpen={setModalVisible} />
    </div>
  );
};

export default Profile;
