import dbConnect from "../../../utils/mongoDBConnect";
import Product from "../../../models/Product";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const ordersCount = await Order.countDocuments();
      const productsCount = await Product.countDocuments();
      const ordersPriceGroup = await Order.aggregate([
        {
          $group: {
            _id: null,
            sales: { $sum: "$total" },
          },
        },
      ]);
      const ordersPrice =
        ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
      const salesData = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            totalSales: { $sum: "$total" },
          },
        },
      ]);
      res
        .status(200)
        .json({ ordersCount, productsCount, ordersPrice, salesData });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
