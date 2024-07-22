import { FC, FormEvent, useState } from "react";

import EmailIcon from "@/assets/icons/email.svg";
import LockIcon from "@/assets/icons/lock.svg";
import UserIcon from "@/assets/icons/user.svg";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { ILogin, IRegister } from "@/interfaces/auth.interface";

import styles from "./AuthForm.module.scss";

interface AuthFormProps<T extends ILogin | IRegister> {
  type: "login" | "register";
  onSubmit: (data: T) => void;
}

type FormDataType = ILogin | IRegister;

const isRegister = (data: FormDataType): data is IRegister => {
  return (data as IRegister).name !== undefined;
};

export const AuthForm: FC<AuthFormProps<ILogin | IRegister>> = ({
  type,
  onSubmit,
}) => {
  const initState: FormDataType =
    type === "login"
      ? { email: "", password: "" }
      : { email: "", name: "", password: "" };

  const [formData, setFormData] = useState<FormDataType>(initState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>
        {`${type === "login" ? "Вход" : "Регистрация"} в Yoldi Agency`}
      </h2>

      <div className={styles.inputs}>
        {type === "register" && (
          <Input
            type="text"
            name="name"
            placeholder="Имя"
            icon={UserIcon}
            value={isRegister(formData) ? formData.name : ""}
            handleChange={(value) =>
              handleChange("name" as keyof (ILogin | IRegister), value)
            }
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          icon={EmailIcon}
          value={formData.email}
          handleChange={(value) => handleChange("email", value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon={LockIcon}
          value={formData.password}
          handleChange={(value) => handleChange("password", value)}
        />
      </div>
      <Button
        className={styles.btn}
        type="submit"
        dark
        inactive={
          !formData.email ||
          !formData.password ||
          (type === "register" && isRegister(formData) && !formData.name)
        }
      >
        {type === "login" ? "Войти" : "Создать аккаунт"}
      </Button>
    </form>
  );
};
