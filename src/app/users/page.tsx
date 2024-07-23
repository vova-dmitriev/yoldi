"use client";
import cn from "classnames";
import { FC } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { UsersList } from "@/components/UsersList/UsersList";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { useLoadProfile } from "@/hooks/useLoadProfile";

import styles from "./users.module.scss";

const fetcher = () => UsersService.getUsers().then((res) => res.data);

const Users: FC = () => {
  useLoadProfile();
  const { data, error, isLoading } = useSWR(PUBLIC_ROUTES.users, fetcher);

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>Список аккаунтов</div>
        <UsersList users={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Users;
