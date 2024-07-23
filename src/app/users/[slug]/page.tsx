"use client";

import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { useUserSelector } from "@/hooks/redux";
import { IUser } from "@/interfaces/user.interface";

import styles from "./usersDetail.module.scss";

const fetcher = (slug: string) =>
  UsersService.getUserBySlug(slug).then((res) => res.data);

const UserDetail: FC = () => {
  const { slug } = useParams();
  const { data, isLoading } = useSWR(slug, fetcher);
  const { user } = useUserSelector();

  useEffect(() => {
    if (data) {
      document.title = `${(data as IUser).name} | Yoldi Agency`;
    }
  }, [data]);

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <UserInfo user={data} isProfile={user?.slug === slug} />
    </div>
  );
};

export default UserDetail;
