module.exports = class DatabaseService {
    constructor(dbSchema) {
      this.model = dbSchema;
    }
  
    async save(data) {
      const savedData = await this.model.create(data);
      return savedData;
    }
  
    createMany = async (data) => {
      const documents = await this.database.insertMany(data);
      return documents;
    };
  
    getAllDocuments = async (query, options = {}) => {
      const { limit, sort, skip } = options;
  
      const customQuery = this.database.find(query);
  
      if (skip !== "" && limit !== "") {
        customQuery.limit(limit).skip(skip);
      }
  
      if (sort) {
        customQuery.sort({ [sort]: -1 });
      } else {
        customQuery.sort({ createdAt: -1 });
      }
      const documents = await customQuery.exec();
  
      return documents;
    };
  
    updateDocument = async (filter, data, options) => {
      const document = await this.database.findOneAndUpdate(
        filter,
        data,
        options
      );
      return document;
    };
  
    getDocumentById = async (query) => {
      const document = await this.database.findOne(query);
      return document;
    };
  
    deleteDocument = async (data) => {
      const deletedDocumnent = await this.database.delete(data);
      return deletedDocumnent;
    };
  
    totalCounts = async (query) => {
      const count = await this.database.countDocuments(query);
      return count;
    };
  };