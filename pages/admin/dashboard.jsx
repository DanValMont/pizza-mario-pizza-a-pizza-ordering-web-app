import axios from "axios";
import NextLink from "next/link";
import { Bar } from "react-chartjs-2";
import styles from "../../styles/AdminDashboard.module.css";
import { CategoryScale, Chart, LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from "chart.js";

Chart.register(CategoryScale, LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,);


const AdminDashboard = ({summary}) => {
  
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
        <div className={styles.summaryContainer}>
          <div className={styles.cardsContainer}>
           <div className={styles.cardBox}>
            <h1 className={styles.sales}>${summary.ordersPrice}</h1>
            <span>Sales</span>
            <NextLink href="/admin/orders" passHref>
              <button className={styles.cardButton}>view sales</button>
            </NextLink>
          </div>
          <div className={styles.cardBox}>
            <h1>{summary.ordersCount}</h1>
            <span>Orders</span>
            <NextLink href="/admin/orders" passHref>
              <button className={styles.cardButton}>view orders</button>
            </NextLink>
          </div>
          <div className={styles.cardBox}>
            <h1>{summary.productsCount}</h1>
            <span>Products</span>
            <NextLink href="/admin/products" passHref>
              <button className={styles.cardButton}>view products</button>
            </NextLink>
          </div>
          </div>
          <div className={styles.salesChartContainer}>
           <h1 className={styles.salesTitle}>Sales Chart</h1>
           <div className={styles.barChartContainer}>
           <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: "Sales",
                        backgroundColor: "rgba(162, 222, 208, 1)",
                        data: summary.salesData.map((x) => x.totalSales),
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: "right" },
                   layout: {
            padding: {
                right: 50,
                left: 50
            },
                  }, scales: {
            x: {
                grid: {backdropColor: "#d8d8d8", color: "#d8d8d8"},
                ticks: { backdropColor: "#d8d8d8", color: "#d8d8d8", beginAtZero: true }
            },
            y: {
                grid: { backdropColor: "#d8d8d8", color: "#d8d8d8"},
                ticks: { backdropColor: "#d8d8d8", color: "#d8d8d8", beginAtZero: true }
            }
        }}}
                ></Bar>
                </div>
          </div>
        </div>
    </div>
  )
}

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

  const summaryRes = await axios.get("http://localhost:3000/api/summary");

  return {
    props: {
      summary: summaryRes.data,
    },
  };
};

export default AdminDashboard;