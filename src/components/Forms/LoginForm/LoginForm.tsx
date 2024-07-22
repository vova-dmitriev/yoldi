import { FC, FormEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import EmailIcon from "@/assets/icons/email.svg";
import LockIcon from "@/assets/icons/lock.svg";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { EMAIL_REGEX } from "@/constants/regex";
import { useAppDispatch, useAuthSelector } from "@/hooks/redux";
import { ILogin } from "@/interfaces/auth.interface";
import { resetError } from "@/store/slices/authSlice";

import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  onSubmit: (data: ILogin) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<ILogin>();

  const dispatch = useAppDispatch();
  const { error } = useAuthSelector();

  useEffect(() => {
    if (error) {
      setError("password", { message: error });
    } else {
      clearErrors("password");
    }
  }, [error, setError, clearErrors]);

  const onSubmitHandler: SubmitHandler<ILogin> = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    onSubmit(data);
  };

  const clearError = () => {
    dispatch(resetError());
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <h2 className={styles.title}>Вход в Yoldi Agency</h2>

      <div className={styles.inputs}>
        <Input
          type="email"
          placeholder="E-mail"
          icon={EmailIcon}
          {...register("email", {
            required: "Пожалуйста, введите E-mail",
            pattern: {
              value: EMAIL_REGEX,
              message: "Неправильно указан E-mail",
            },
          })}
          handleChange={clearError}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Пароль"
          icon={LockIcon}
          {...register("password", {
            required: "Пожалуйста, введите пароль",
          })}
          handleChange={clearError}
          error={errors.password?.message}
        />
      </div>
      <Button className={styles.btn} type="submit" dark inactive={!isValid}>
        Войти
      </Button>
    </form>
  );
};
