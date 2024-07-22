"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthForm } from "@/components/AuthForm/AuthForm";
import { Meta } from "@/components/Meta/Meta";
import { X_API_KEY } from "@/constants/localStorage";
import { ILogin } from "@/interfaces/auth.interface";
import api from "@/lib/api";

import styles from "./login.module.scss";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem(X_API_KEY);
    if (apiKey) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit = async (data: ILogin) => {
    try {
      const response = await api.post("/auth/login", data);
      const apiKey = response.data.value;
      localStorage.setItem(X_API_KEY, apiKey);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Meta title="Вход">
      <div className={styles.container}>
        <AuthForm type="login" onSubmit={handleSubmit} />
      </div>
    </Meta>
  );
};

export default Login;
