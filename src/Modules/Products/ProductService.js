const DbService = require("../../Service/DbService");
const ProductsModel = require("./ProductModel");

const model = new DbService(ProductsModel);

const productService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  createMany: serviceHandler(async (data) => {
    const isArray = Array.isArray(data);
    if (!isArray) throw new CustomError(400, "Products should be array");
    return await model.saveMany(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { productId } = dataId;
    const query = { isDelete: false, _id: productId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { productId } = updateData;
    const filter = { _id: productId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { productId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: productId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = productService;