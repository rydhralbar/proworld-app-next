import axios from "axios";

const handler = (req, res) => {
  try {
    const { email, password } = req.body;
    axios
      .post(`https://different-lion-tunic.cyclic.app/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json(error?.response?.request?.data);
      });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}

export default handler;