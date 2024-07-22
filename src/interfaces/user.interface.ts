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
