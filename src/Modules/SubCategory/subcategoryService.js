const Subcategory = require("./subcategoryModel");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");

const model = new DbService(Subcategory);

const subcategoryService = {
  create: serviceHandler(async (data) => {
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const query = { isDelete: false };
    const savedData = await model.getAllDocuments(query, data);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { subcategoryId } = dataId;
    const query = { isDelete: false, _id: subcategoryId };
    const savedDataById = await model.getDocumentById(query);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { subcategoryId } = updateData;
    const filter = { _id: subcategoryId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { subcategoryId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: subcategoryId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = subcategoryService;
