const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppUser } = require("../models");

//register User
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await AppUser.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword =await bcrypt.hash(password, 10);
    const createUser=await AppUser.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User created successfully" , user:{id : createUser.id, name, email,phone } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed ", error: err.message });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: " fields are email and password required" });
    }
    const userExists = await AppUser.findOne({ where: { email } });
    if (!userExists) return res.status(400).json({ message: "Invalid Credentials" });
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({message : "login Successfull", token, user:{id : userExists.id, name : userExists.name, email ,phone : userExists.phone }})
  } catch (err) {
    res
      .status(500)
      .json({ message: "Login failed ", error: err.message });
  }
};

module.exports = { register, login };