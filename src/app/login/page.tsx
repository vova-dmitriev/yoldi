"use client";

import { useRouter } from "next/navigation";

import AuthService from "@/api/AuthService";
import { LoginForm } from "@/components/Forms/LoginForm/LoginForm";
import { Meta } from "@/components/Meta/Meta";
import { X_API_KEY } from "@/constants/localStorage";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/hooks/redux";
import { ILogin } from "@/interfaces/auth.interface";
import { setError } from "@/store/slices/authSlice";
import { setPassword } from "@/store/slices/userSlice";

import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (data: ILogin) => {
    try {
      const response = await AuthService.login(data);
      const apiKey = response.data.value;
      localStorage.setItem(X_API_KEY, apiKey);

      dispatch(setPassword(data.password));
      router.push(PUBLIC_ROUTES.home);
    } catch (error) {
      console.error(error);
      dispatch(setError((error as any).response?.data?.message));
    }
  };

  return (
    <Meta title="Вход">
      <div className={styles.container}>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </Meta>
  );
};

export default Login;
