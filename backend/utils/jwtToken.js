import jwt from "jsonwebtoken";

const generateTkoen = (id) => {
  return jwt.sign({ id }, "wideon007", {
    expiresIn: "300d",
  });
};

export default generateTkoen;
