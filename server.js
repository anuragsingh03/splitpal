const app = require("./app");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`server is running on ${port}`);
});
