import axios from "axios";

const handler = (req, res) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/list`)
      .then((response) => {
        res.status(200).json(response?.data?.data?.rows)
      })
      .catch((error) => {
        res.status(400).json(error?.response?.data);
      });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}

export default handler;