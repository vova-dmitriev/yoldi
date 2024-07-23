import cn from "classnames";
import { FC } from "react";

import ImageIcon from "@/assets/icons/image.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import UploadIcon from "@/assets/icons/upload.svg";
import { Button } from "@/components/UI/Button/Button";
import { useRemoveImage } from "@/hooks/useRemoveImage";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IUser } from "@/interfaces/user.interface";

import styles from "./Cover.module.scss";

interface CoverProps {
  user: IUser;
  isProfile?: boolean;
}

export const Cover: FC<CoverProps> = ({ user, isProfile }) => {
  const { fileInputRef, handleFileChange, handleClick } =
    useUploadImage("cover");

  const { handleRemoveFile } = useRemoveImage("cover");

  return (
    <div className={styles.cover}>
      {user?.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.cover.url} alt="cover" className={styles.cover} />
      ) : (
        <div className={cn(styles.cover, styles.coverEmpty)} />
      )}
      {user?.cover && isProfile && (
        <Button
          className={styles.coverBtn}
          leftIcon={TrashIcon}
          rightIcon={ImageIcon}
          onClick={handleRemoveFile}
        >
          Удалить
        </Button>
      )}
      {!user?.cover && isProfile && (
        <>
          <Button
            className={styles.coverBtn}
            leftIcon={UploadIcon}
            rightIcon={ImageIcon}
            onClick={handleClick}
          >
            Загрузить
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className={styles.fileInput}
            onChange={handleFileChange}
            accept="image/*"
          />
        </>
      )}
    </div>
  );
};
