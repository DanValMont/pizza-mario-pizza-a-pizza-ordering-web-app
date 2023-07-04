import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json("Successfully logged out");
  }
};

export default handler;
