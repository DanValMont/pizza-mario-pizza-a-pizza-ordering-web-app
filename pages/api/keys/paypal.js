const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      res.status(200).json(process.env.PAYPAL_CLIENT_ID || "sb");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
