import axios from "axios";
import NextLink from "next/link";
import Image from "next/image";
import { useState } from "react";
import Add from "../../components/Add";
import Edit from "../../components/Edit";
import AddButton from "../../components/AddButton";
import styles from "../../styles/AdminProducts.module.css";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import dbConnect from "../../utils/mongoDBConnect";

const AdminProducts = ({ products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [close, setClose] = useState(true);
  const [closeEdit, setCloseEdit] = useState(true);
  const [productEdit, setProductEdit] = useState(null);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Layout title="Products">
    <div className={styles.container}>
      <div className={styles.menu}>
            <NextLink href="/admin/dashboard" passHref>
              <button className={styles.menuButton}>Admin Dashboard</button>
            </NextLink>
            <NextLink href="/admin/orders" passHref>
              <button className={styles.menuButton}>Orders</button>
            </NextLink>
            <NextLink href="/admin/products" passHref>
              <button className={styles.menuButton}>Products</button>
            </NextLink>
        </div>
      <div className={styles.productsContainer}>
        <div className={styles.productsHeadingContainer}>
            <h1 className={styles.title}>Products</h1>
            <AddButton setClose={setClose} />
        </div>
        <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button} onClick={() => {setProductEdit(product); setCloseEdit(false); }}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table></div>
      </div>
      {!close && <Add setClose={setClose} />}
      {!closeEdit && <Edit setCloseEdit={setCloseEdit} productEdit={productEdit} />}
    </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  await dbConnect();

  // const productRes = await axios.get("http://localhost:3000/api/products");
  const productRes = await Product.find();

  return {
    props: {
      // products: productRes.data,
      products: JSON.parse(JSON.stringify(productRes)),
    },
  };
};

export default AdminProducts;