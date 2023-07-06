import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Pizza Mario` : "Welcome to Pizza Mario"}
        </title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/img/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="img/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="preload"
          href="/fonts/Bosento/Bosento.otf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
