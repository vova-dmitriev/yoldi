import axios from "axios";
import { useRef } from "react";
import { useSWRConfig } from "swr";

import UsersService from "@/api/UsersService";
import { IUserNewData } from "@/interfaces/user.interface";

import { useUserSelector } from "./redux";

export const useUploadImage = (imageType: "avatar" | "cover") => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useSWRConfig();

  const { user, password } = useUserSelector();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!user) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await UsersService.uploadFile(formData);
      const { id } = response.data;

      const newUser: IUserNewData = {
        name: user.name,
        imageId: imageType === "avatar" ? id : user?.image?.id || null,
        password: password,
        slug: user.slug,
        coverId: imageType === "cover" ? id : user?.cover?.id || null,
        description: user?.description || "",
      };
      const { data } = await UsersService.updateUser(newUser);

      mutate("/profile", data);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleFileChange,
    handleClick,
  };
};
