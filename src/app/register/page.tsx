"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { AuthForm } from "@/components/AuthForm/AuthForm";
import { Meta } from "@/components/Meta/Meta";
import { X_API_KEY } from "@/constants/localStorage";
import { IRegister } from "@/interfaces/auth.interface";
import api from "@/lib/api";

import styles from "./register.module.scss";

const Register = () => {
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem(X_API_KEY);
    if (apiKey) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit = async (data: IRegister) => {
    try {
      const response = await api.post("/auth/sign-up", data);
      const apiKey = response.data.value;
      localStorage.setItem(X_API_KEY, apiKey);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Meta title="Регистрация">
      <div className={styles.container}>
        <AuthForm type="register" onSubmit={handleSubmit} />
      </div>
    </Meta>
  );
};

export default Register;
