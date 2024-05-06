const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 50,
        unique: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        default: "User Description",
      },
      roleId :{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Roles"
      },
      departments: [
        {
          departmentName: {
            type: String,
          },
          permissions: {
            type: [String],
  
          },
        },
      ],
    },
     
      
      
});

const User = new mongoose.model("User", userSchema);
module.exports = User;