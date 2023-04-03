const router = require("express").Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {
  // req body
  const { name, price } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório!" });
    return;
  }

  if (!price) {
    res.status(422).json({ error: "O produto deve ter um preço!" });
    return;
  }

  const product = {
    name,
    price,
  };

  try {
    await Product.create(product);

    res.status(201).json({ message: "Produto inserido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//leitura de dados

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.staus(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair o dado da requisição pela url = req.params
  const id = req.params.id;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(422).json({ message: "Produto não cadastrado!" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//atualizar os dados (put, patch)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, price } = req.body;

  const product = {
    name,
    price,
  };

  try {
    const updatedProduct = await Product.updateOne({ _id: id }, product);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//deletar produtos
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    res.status(422).json({ message: "Produto não cadastrado!" });
    return;
  }

  try {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "Produto removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
