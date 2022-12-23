const mongoose = require("mongoose")

const textArraySchema = mongoose.Schema({ value: { type: String } })
const datasheetSchema = mongoose.Schema({ category: { type: String }, details: { type: String } })
const caseSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true
    },
    subheading: {
        type: String,
        required: true
    },
    slug: {
      type: String,
      required: true
    },
    overview: {
        type: String,
        required: true
    }, 
    keyConsiderations: {
        type: [textArraySchema]
    },
    prompts: {
        type: [textArraySchema]
    },
    people: {
        type: [textArraySchema]
    },
    datasheet: {
        type: [datasheetSchema]
    },
    featuredImage: {
        type: String
    }
  },
  {
    timestamps: true
  }
);
const Case = mongoose.model("Case", caseSchema);

module.exports = Case;