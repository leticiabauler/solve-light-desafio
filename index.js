const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//ler json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da api
const productRoutes = require("./routes/productRoutes");

app.use("/product", productRoutes);

// usuário e senha do mongo db, em uma aplicação real, não estaria aqui
const user = "leticiabauler";
const senha = "solvelight123";

mongoose
  .connect(
    `mongodb+srv://${user}:${senha}@apicluster.1zrcib6.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB!");
    app.listen(3333);
  })

  .catch((err) => console.log(err));
