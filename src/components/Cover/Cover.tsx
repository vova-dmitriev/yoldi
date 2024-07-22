import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

import ImageIcon from "@/assets/icons/image.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import UploadIcon from "@/assets/icons/upload.svg";
import { Button } from "@/components/Button/Button";
import { useRemoveImage } from "@/hooks/useRemoveImage";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IUser } from "@/interfaces/user.interface";

import styles from "./Cover.module.scss";

interface CoverProps {
  user: IUser;
}

export const Cover: FC<CoverProps> = ({ user }) => {
  const { fileInputRef, handleFileChange, handleClick } =
    useUploadImage("cover");

  const { handleRemoveFile } = useRemoveImage("cover");

  return (
    <div className={styles.cover}>
      {user?.cover ? (
        <img src={user.cover.url} alt="cover" className={styles.cover} />
      ) : (
        <div className={cn(styles.cover, styles.coverEmpty)} />
      )}
      {user?.cover && (
        <Button
          className={styles.coverBtn}
          leftIcon={TrashIcon}
          rightIcon={ImageIcon}
          onClick={handleRemoveFile}
        >
          Удалить
        </Button>
      )}
      {!user?.cover && (
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
