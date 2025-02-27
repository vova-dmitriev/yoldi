"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AuthService from "@/api/AuthService";
import { RegisterForm } from "@/components/Forms/RegisterForm/RegisterForm";
import { X_API_KEY } from "@/constants/localStorage";
import { PUBLIC_ROUTES } from "@/constants/routes";
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
      router.push(PUBLIC_ROUTES.home);
    }
  }, [router]);

  const handleSubmit = async (data: IRegister) => {
    try {
      const response = await AuthService.signUp(data);
      const apiKey = response.data.value;
      localStorage.setItem(X_API_KEY, apiKey);

      dispatch(setPassword(data.password));
      router.push(PUBLIC_ROUTES.home);
    } catch (error) {
      console.error(error);

      const axiosError = error as AxiosError<{ message: string }>;

      const errText =
        axiosError?.response?.data?.message! ||
        axiosError.response?.data?.message ||
        "Неизвестная ошибка";

      dispatch(setError(errText));
    }
  };

  return (
    <div className={styles.container}>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
