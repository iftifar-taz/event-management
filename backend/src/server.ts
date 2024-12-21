import app from "./app";
import seedDB from "./seed";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("mongoose connected");
    seedDB();
    app.listen(port, () => {
      console.log(`Server runnig on port ${port}`);
    });
  })
  .catch(console.error);
