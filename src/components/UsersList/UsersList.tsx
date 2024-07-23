import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { PUBLIC_ROUTES } from "@/constants/routes";
import { IUser } from "@/interfaces/user.interface";

import { Avatar } from "../Avatar/Avatar";
import { Loader } from "../UI/Loader/Loader";
import styles from "./UsersList.module.scss";

interface UsersListProps {
  users: IUser[];
  isLoading?: boolean;
}

export const UsersList: FC<UsersListProps> = ({ users, isLoading }) => {
  const router = useRouter();
  const [visibleUsers, setVisibleUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserElementRef = useRef<HTMLDivElement | null>(null);

  const USERS_PER_PAGE = 20;

  useEffect(() => {
    setVisibleUsers(users.slice(0, USERS_PER_PAGE * page));
  }, [users, page]);

  const loadMoreUsers = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && users.length > visibleUsers.length) {
        loadMoreUsers();
      }
    });

    if (lastUserElementRef.current) {
      observer.current.observe(lastUserElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, users, visibleUsers.length, loadMoreUsers]);

  const handleUserClick = (slug: string) => {
    router.push(`${PUBLIC_ROUTES.users}/${slug}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !users?.length) {
    return <div className={styles.list}>Пользователи отсутствуют</div>;
  }

  return (
    <div className={styles.list}>
      {visibleUsers.length > 0 && <div className={styles.divider} />}
      {visibleUsers.map((user, index) => (
        <div
          key={user.slug}
          className={styles.userItem}
          onClick={() => handleUserClick(user.slug)}
          ref={index === visibleUsers.length - 1 ? lastUserElementRef : null}
        >
          <Avatar size="normal" user={user} />
          <div className={styles.info}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
