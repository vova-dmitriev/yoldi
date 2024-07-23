"use client";

import "@/styles/global.scss";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { store } from "@/store/store";

import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const needShowFooter =
    pathname == PUBLIC_ROUTES.login || pathname == PUBLIC_ROUTES.register;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className={styles.wrapper}>
            <Header />
            {children}
            {needShowFooter && <Footer />}
          </div>
        </Provider>
      </body>
    </html>
  );
}
