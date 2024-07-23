import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход | Yoldi Agency",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
