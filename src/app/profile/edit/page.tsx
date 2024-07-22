import { ChangeEvent, FormEvent, useState } from "react";
import useSWR from "swr";

import api from "@/api/api";
import UsersService from "@/api/UsersService";

import styles from "./editProfile.module.scss";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const EditProfile = () => {
  const { data, error } = useSWR("/profile", fetcher);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // TODO
      // const response = await UsersService.updateUser(formData);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Редактировать профиль</h2>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="slug"
          placeholder="Адрес профиля"
          value={formData.slug}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EditProfile;
