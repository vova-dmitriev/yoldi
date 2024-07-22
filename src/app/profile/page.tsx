"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import { Spinner } from "@/components/Spinner/Spinner";
import { useAppDispatch } from "@/hooks/redux";
import api from "@/lib/api";
import { setUser } from "@/store/slices/userSlice";

import styles from "./profile.module.scss";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const Profile = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSWR("/profile", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <p>{data.description}</p>

      {data.image && <Image src={data.image.url} alt={data.name} />}
    </div>
  );
};

export default Profile;
