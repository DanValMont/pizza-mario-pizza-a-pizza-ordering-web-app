// import axios from "axios";
//import Head from "next/head";
import Featured from "../components/Featured";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import Product from "../models/Product";
import dbConnect from "../utils/mongoDBConnect";

export default function Home({ pizzaList }) {
  return (
    <Layout description="Welcome to Pizza Mario. Best Pizzeria e-restaurant in New York.">
      <div>
        {/* <Head>
        <title>Welcome to Pizza Mario</title>
        <meta
          name="description"
          content="Welcome to Pizza Mario. Best Pizzeria e-restaurant in New York."
        />
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
      </Head> */}

        <Featured />
        <ProductList pizzaList={pizzaList} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  // const res = await axios.get("http://localhost:3000/api/products");

  await dbConnect();

  const res = await Product.find();

  return {
    props: {
      // pizzaList: res.data,
      pizzaList: JSON.parse(JSON.stringify(res)),
    },
  };
};
