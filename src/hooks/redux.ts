import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthSelector = () => {
  return useAppSelector((state) => state.auth);
};

export const useUserSelector = () => {
  return useAppSelector((state) => state.user);
};
