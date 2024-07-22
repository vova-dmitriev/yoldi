"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import api from "@/api/api";
import AuthService from "@/api/AuthService";
import { RegisterForm } from "@/components/Forms/RegisterForm/RegisterForm";
import { Meta } from "@/components/Meta/Meta";
import { X_API_KEY } from "@/constants/localStorage";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/hooks/redux";
import { IRegister } from "@/interfaces/auth.interface";
import { setError } from "@/store/slices/authSlice";
import { setPassword } from "@/store/slices/userSlice";

import styles from "./register.module.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const apiKey = localStorage.getItem(X_API_KEY);
    if (apiKey) {
      router.push(PRIVATE_ROUTES.profile);
    }
  }, [router]);

  const handleSubmit = async (data: IRegister) => {
    try {
      const response = await AuthService.signUp(data);
      const apiKey = response.data.value;
      localStorage.setItem(X_API_KEY, apiKey);

      dispatch(setPassword(data.password));
      router.push(PRIVATE_ROUTES.profile);
    } catch (error) {
      console.error(error);
      dispatch(setError((error as any).response?.data?.message));
    }
  };

  return (
    <Meta title="Регистрация">
      <div className={styles.container}>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </Meta>
  );
};

export default Register;
