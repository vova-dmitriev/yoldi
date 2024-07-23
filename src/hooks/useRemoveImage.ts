import { useSWRConfig } from "swr";

import UsersService from "@/api/UsersService";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { IUserNewData } from "@/interfaces/user.interface";
import { setUser } from "@/store/slices/userSlice";

import { useAppDispatch, useUserSelector } from "./redux";

export const useRemoveImage = (imageType: "avatar" | "cover") => {
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();
  const { user, password } = useUserSelector();

  const handleRemoveFile = async () => {
    try {
      const newUser: IUserNewData = {
        name: user?.name || "",
        imageId: imageType === "avatar" ? null : user?.image?.id || null,
        password: password,
        slug: user?.slug || "",
        coverId: imageType === "cover" ? null : user?.cover?.id || null,
        description: user?.description || "",
      };
      const { data } = await UsersService.updateUser(newUser);

      mutate(PRIVATE_ROUTES.profile, data);
      dispatch(setUser(data));
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  return {
    handleRemoveFile,
  };
};
