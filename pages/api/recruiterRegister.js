import axios from "axios";

const handler = (req, res) => {
  try {
    const { fullname, email, company, position, phone_number, password } = req.body;
    
    axios
      .post(`https://different-lion-tunic.cyclic.app/v1/auth/register/recruiter`, {
        fullname,
        email,
        company,
        position,
        phone_number,
        password
      })
      .then((response) => {
        console.log("then")
        res.status(200).json(response?.data);
      })
      .catch((error) => {
        console.log("catch")
        res.status(400).json(error?.response?.request?.data);
      });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}

export default handler;