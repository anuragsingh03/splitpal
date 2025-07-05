const app = require("./app");
const { sequelize,AppUser } = require("./models");
require('dotenv').config();
const bcrypt =require('bcrypt')
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`server is running on ${port}`);
  try {
    await sequelize.authenticate();
    const hashedPassword = await bcrypt.hash('Test@1234', 10);
    const newUser = await AppUser.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword,
      phone: '9876543210'
    });

    console.log('✅ New user created:', newUser.toJSON());
    console.log("connected to SQL database");
  } catch (err) {
    console.log("Not connected to SQL database", err);
  }
});
