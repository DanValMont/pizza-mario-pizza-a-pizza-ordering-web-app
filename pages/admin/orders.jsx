import axios from "axios";
import NextLink from "next/link";
import { useState } from "react";
import styles from "../../styles/AdminOrders.module.css";

const AdminOrders = ({ orders }) => {

  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];


  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      <div className={styles.ordersContainer}>
        <h1 className={styles.title}>Orders</h1>
        <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={styles.button} onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table></div>
      </div>
    </div>
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

  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
    },
  };
};

export default AdminOrders;