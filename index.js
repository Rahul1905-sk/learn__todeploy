const express = require("express");
const { userRouter } = require("./routes/User.routes");
const { myServer } = require("./configs/db"); 
const { auth } = require("./middleware/auth.middleware");
const { noteRouter } = require("./routes/Note.routes");
const cors = require("cors")

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use("/users", userRouter);

app.use(auth);
app.use("/notes", noteRouter);

app.listen(PORT, async () => {
  try {
    await myServer;
    console.log("Connnected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`server started at` + " " + PORT);
});
