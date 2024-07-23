import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import Logo from "@/assets/icons/logo.svg";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useUserSelector } from "@/hooks/redux";

import { Avatar } from "../Avatar/Avatar";
import { Button } from "../UI/Button/Button";
import styles from "./Header.module.scss";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const router = useRouter();
  const { user } = useUserSelector();

  const handleClick = () => {
    if (user) {
      router.push(PUBLIC_ROUTES.home);
    } else {
      router.push(PUBLIC_ROUTES.login);
    }
  };

  const handleUserClick = () => {
    router.push(PRIVATE_ROUTES.profile);
  };

  return (
    <div className={cn(styles.header, className)} {...props}>
      <div className={styles.left} onClick={handleClick}>
        <Image src={Logo} alt="logo" className={styles.logo} />
        <div className={styles.text}>
          Разрабатываем и запускаем сложные веб проекты
        </div>
      </div>
      <div className={styles.right}>
        {!user && <Button onClick={handleClick}>Войти</Button>}
        {user && (
          <div className={styles.user} onClick={handleUserClick}>
            <div className={styles.name}>{user.name}</div>
            <Avatar size="normal" user={user} />
          </div>
        )}
      </div>
    </div>
  );
};
