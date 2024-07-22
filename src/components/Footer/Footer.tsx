import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

import { PUBLIC_ROUTES } from "@/constants/routes";

import styles from "./Footer.module.scss";

type FooterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname == PUBLIC_ROUTES.login;

  const handleClick = () => {
    router.push(isLoginPage ? PUBLIC_ROUTES.register : PUBLIC_ROUTES.login);
  };

  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.content}>
        <span className={styles.text}>
          {isLoginPage ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
        </span>
        <span className={styles.btn} onClick={handleClick}>
          {isLoginPage ? "Зарегистрироваться" : "Войти"}
        </span>
      </div>
    </footer>
  );
};
