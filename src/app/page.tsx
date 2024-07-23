import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PUBLIC_ROUTES } from "@/constants/routes";

import Favicon from "../../public/favicon.ico";

export const metadata: Metadata = {
  title: "Yoldi",
  description: "Yoldi Agency",
};

export default function HomePage() {
  redirect(PUBLIC_ROUTES.users);
}
