export interface IUser {
  name: string;
  email: string;
  slug: string;
  description: string | null;
  image: IImage | null;
  cover: IImage | null;
}

export interface IImage {
  id: string;
  url: string;
  width: string;
  height: string;
}

export interface IUserNewData {
  name: string;
  imageId: string | null;
  password: string;
  slug: string;
  coverId: string | null;
  description: string | null;
}
