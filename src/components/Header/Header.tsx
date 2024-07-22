import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import Logo from "@/assets/icons/logo.svg";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { Button } from "../Button/Button";
import styles from "./Header.module.scss";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleClick = () => {
    if (user) {
      router.push(PRIVATE_ROUTES.profile);
    } else {
      router.push(PUBLIC_ROUTES.login);
    }
  };

  return (
    <div className={cn(styles.header, className)} {...props}>
      <div className={styles.left}>
        <Image
          src={Logo}
          alt="logo"
          className={styles.logo}
          onClick={handleClick}
        />
        <div className={styles.text}>
          Разрабатываем и запускаем сложные веб проекты
        </div>
      </div>
      <div className={styles.right}>
        {!user && <Button onClick={handleClick}>Войти</Button>}
      </div>
    </div>
  );
};
