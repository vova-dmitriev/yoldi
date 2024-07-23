import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import EmailIcon from "@/assets/icons/email.svg";
import LockIcon from "@/assets/icons/lock.svg";
import UserIcon from "@/assets/icons/user.svg";
import { Button } from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Input/Input";
import { EMAIL_REGEX } from "@/constants/regex";
import { useAppDispatch, useAuthSelector } from "@/hooks/redux";
import { IRegister } from "@/interfaces/auth.interface";
import { resetError } from "@/store/slices/authSlice";

import styles from "./RegisterForm.module.scss";

interface RegisterFormProps {
  onSubmit: (data: IRegister) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IRegister>();

  const dispatch = useAppDispatch();
  const { error } = useAuthSelector();

  useEffect(() => {
    if (error) {
      setError("password", { message: error });
    } else {
      clearErrors("password");
    }
  }, [error, setError, clearErrors]);

  const onSubmitHandler: SubmitHandler<IRegister> = async (data) => {
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
      <h2 className={styles.title}>
        Регистрация <br /> в Yoldi Agency
      </h2>

      <div className={styles.inputs}>
        <Input
          type="text"
          placeholder="Имя"
          icon={UserIcon}
          {...register("name", { required: "Пожалуйста, введите имя" })}
          handleChange={clearError}
          error={errors.name?.message}
        />
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
          {...register("password", { required: "Пожалуйста, введите пароль" })}
          handleChange={clearError}
          error={errors.password?.message}
        />
      </div>
      <Button className={styles.btn} type="submit" dark inactive={!isValid}>
        Создать аккаунт
      </Button>
    </form>
  );
};
