const productRouter = require("express").Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const {
  Product,
  validateProduct,
  generateProdNumber,
} = require("../models/products");

productRouter.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((d) => d.message) });
  }
  let prod1 = await Product.findOne({
    prodTitle: req.body.prodTitle,
    user_id: req.user._id,
  });
  if (prod1) {
    return res.status(400).json({
      message: `${prod1.prodTitle} already exists`,
    });
  }

  let prod = new Product({
    prodNumber: await generateProdNumber(),
    prodImage:
      req.body.prodImage ??
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    user_id: req.user._id,
    ...req.body,
  });

  prod = await prod.save();
  res.json(prod);
});

productRouter.get("/", auth, async (req, res) => {
  const cards = await Product.find({ user_id: req.user._id });
  res.json(cards);
});

productRouter.get("/:id", auth, async (req, res) => {
  const card = await Product.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card) return res.status(404).json({ messgae: "dont found a card" });
  res.send(card);
});

productRouter.put("/:id", auth, async (req, res) => {
  console.log("body", req.body);
  const { error } = validateProduct(req.body);
  console.log("error", error);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let card = await Product.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!card) return res.status(404).json({ message: "card not found" });
  card = await Product.findOne({ _id: req.params.id, user_id: req.user._id });
  console.log("card", card);
  res.send(card);
});

productRouter.delete("/:id", auth, async (req, res) => {
  const card = await Product.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

module.exports = productRouter;
