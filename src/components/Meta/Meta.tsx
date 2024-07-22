import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface MetaProps {
  title: string;
  description?: string;
}

export const Meta: FC<PropsWithChildren<MetaProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{`${title} | Yoldi`}</title>
        <meta name={description || "description"} content={description} />
      </Head>
      {children}
    </>
  );
};
