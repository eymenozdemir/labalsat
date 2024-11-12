const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const { errorHandler, notFound } = require("./middlewares/errorHandler")
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const brandRouter = require("./routes/brandRoute");
const pCategoryRouter = require("./routes/prodcategoryRoute");
const colorRouter = require("./routes/colorRoute");
const productRouter = require("./routes/productRoute");
const uploadRouter = require("./routes/uploadRoute");
const enqRouter = require("./routes/enqRoute");
const contractRouter = require("./routes/contractRoute");

dbConnect();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);

app.use("/api/product", productRouter);

app.use("/api/category", pCategoryRouter);

app.use("/api/brand", brandRouter);

app.use("/api/color", colorRouter);

app.use("/api/enquiry", enqRouter);

app.use("/api/contract", contractRouter);

app.use("/api/upload", uploadRouter);


app.use(notFound);

app.use(errorHandler);

app.use("/", (req, res) => {
    res.send("Hello from other side");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT} `);
});

