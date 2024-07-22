import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

import CameraIcon from "@/assets/icons/camera.svg";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IUser } from "@/interfaces/user.interface";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  user: IUser;
  size: "normal" | "big";
  isProfile?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ user, size, isProfile }) => {
  const { fileInputRef, handleFileChange, handleClick } =
    useUploadImage("avatar");

  return (
    <div
      className={cn(
        styles.avatar,
        size === "big" && styles.big,
        isProfile && styles.avatarProfile
      )}
    >
      {isProfile && (
        <>
          <Image
            className={styles.camera}
            src={CameraIcon}
            alt="camera"
            onClick={handleClick}
            draggable={false}
          />
          <input
            type="file"
            ref={fileInputRef}
            className={styles.fileInput}
            onChange={handleFileChange}
            accept="image/*"
          />
        </>
      )}
      {!user?.image && <span className={styles.current}>{user.name[0]}</span>}
      {user?.image && (
        <Image
          className={styles.current}
          src={user.image.url}
          alt="avatar"
          width={size == "big" ? 100 : 50}
          height={size == "big" ? 100 : 50}
          priority
        />
      )}
    </div>
  );
};
