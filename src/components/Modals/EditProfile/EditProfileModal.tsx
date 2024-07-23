import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import UsersService from "@/api/UsersService";
import { Button } from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Input/Input";
import { Modal } from "@/components/UI/Modal/Modal";
import { TextArea } from "@/components/UI/TextArea/TextArea";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useAppDispatch, useUserSelector } from "@/hooks/redux";
import { IUser, IUserNewData } from "@/interfaces/user.interface";
import { setUser } from "@/store/slices/userSlice";

import styles from "./EditProfileModal.module.scss";

interface EditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();
  const { user, password } = useUserSelector();
  const [isProfileLoading, setProfileLoading] = useState(false);

  const initValues = {
    name: user?.name,
    slug: user?.slug,
    description: user?.description,
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    setError,
    clearErrors,
    reset,
    getValues,
  } = useForm<IUser>({
    defaultValues: initValues,
  });

  const handleCancel = () => {
    reset({ ...initValues });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmitHandler = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }

    try {
      setProfileLoading(true);

      const newUser: IUserNewData = {
        name: getValues("name"),
        slug: getValues("slug"),
        description: getValues("description") || null,
        imageId: user?.image?.id || null,
        coverId: user?.cover?.id || null,
        password: password,
      };

      const { data } = await UsersService.updateUser(newUser);

      mutate(PRIVATE_ROUTES.profile, data);
      dispatch(setUser(data));

      setProfileLoading(false);

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setProfileLoading(false);
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        <div className={styles.content}>
          <div className={styles.title}>Редактировать профиль</div>
          <div className={styles.name}>
            <div className={styles.inputTitle}>Имя</div>
            <Input
              type="text"
              placeholder="Имя"
              {...register("name", { required: "Пожалуйста, введите имя" })}
              error={errors.name?.message}
            />
          </div>

          <div className={styles.slug}>
            <div className={styles.inputTitle}>Адрес профиля</div>
            <div className={styles.slugInput}>
              <div className={styles.slugPrefix}>example.com/</div>
              <Input
                className={styles.slugInputField}
                type="text"
                placeholder="Адрес"
                {...register("slug", { required: "Пожалуйста, введите имя" })}
                error={errors.slug?.message}
              />
            </div>
          </div>

          <div className={styles.description}>
            <div className={styles.inputTitle}>Описание</div>
            <TextArea
              placeholder="Описание"
              {...register("description", {
                required: false,
              })}
              className={styles.textArea}
              error={errors.description?.message}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <Button onClick={handleCancel}>Отмена</Button>
          <Button
            dark
            isLoading={isProfileLoading}
            inactive={!isValid}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};
