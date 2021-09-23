import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    isAdmin: true,
    email: "admin01@widehavon.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user1",
    email: "user1@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user3",
    email: "user3@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
