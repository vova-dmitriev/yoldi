import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Список аккаунтов | Yoldi Agency",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}