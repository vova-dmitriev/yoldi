"use client";

import { useParams } from "next/navigation";
import { FC } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { PUBLIC_ROUTES } from "@/constants/routes";

import styles from "./usersDetail.module.scss";

const fetcher = (slug: string) =>
  UsersService.getUserBySlug(slug).then((res) => res.data);

const UserDetail: FC = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useSWR(slug, fetcher);

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <UserInfo user={data} />
    </div>
  );
};

export default UserDetail;
