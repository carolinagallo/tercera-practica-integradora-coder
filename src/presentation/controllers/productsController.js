import ProductManager from "../../domain/managers/products.js";

export const getAllProducts =
  ("/",
  async (req, res) => {
    const productManager = new ProductManager();

    const limit = Number(req.query.limit ?? 10);
    const type = req.query.type ? String(req.query.type) : null;
    const sortOrder = req.query.sortOrder ? Number(req.query.sortOrder) : null;
    const stock = req.query.stock ? Number(req.query.stock) : 0;

    const productsFiltered = await productManager.getProducts(
      type,
      sortOrder,
      limit,
      stock
    );

    if (productsFiltered.length === 0) {
      return res.status(400).send({ status: "error" });
    } else {
      res.send({
        status: "success",
        payload: productsFiltered,
      });
    }
  });

export const getOneById =
  ("/:pid",
  async (req, res) => {
    const productManager = new ProductManager();

    const id = String(req.params.pid);
    const productId = await productManager.getProductById(id);
    if (!productId) return res.status(404).send("Product no exist");
    res.send(productId);
  });

export const uploaderProduct =
  ("/add",
  async (req, res) => {
    //Los datos del producto fueron pasados por form-data.

    const productManager = new ProductManager();
    try {
      if (!req.file) {
        return res
          .status(400)
          .send({ status: "error", error: "Could not save image" });
      }
      const data = req.body;
      if (!data) return res.status(404).send("No product");
      const img = `http://localhost:8084/${req.file.path.replace(
        "public/",
        ""
      )}`;

      data.thumbnail = img;
      const product = await productManager.addProduct(data);
      res.send(product);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

export const updateOneProduct =
  ("/update/:pid",
  async (req, res) => {
    const productManager = new ProductManager();

    const id = String(req.params.pid);
    const data = req.body;

    const product = await productManager.updateProduct(id, data);
    if (!data) return res.status(404).send("No product");
    res.send(product);
  });

export const deleteById =
  ("/delete/:pid",
  async (req, res) => {
    const productManager = new ProductManager();

    const id = String(req.params.pid);

    const deleteElement = await productManager.deleteProduct(id);
    if (!deleteElement) return res.status(404).send("Product no exist");
    res.send({ status: "success", massage: "product deleted" });
  });
