import { useEffect } from "react";
import useSWR from "swr";

import UsersService from "@/api/UsersService";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { setUser } from "@/store/slices/userSlice";

import { useAppDispatch } from "./redux";

const fetcher = () => UsersService.getProfile().then((res) => res.data);

export const useLoadProfile = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSWR(PRIVATE_ROUTES.profile, fetcher);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  return {
    data,
    error,
    isLoading,
  };
};
