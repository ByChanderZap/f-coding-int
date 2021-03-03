const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: String,
    name: String,
    description: String,
    symbol: {
        type: String,
        maxlength: 10
    },
    market_value: {
        type: [String]
    }
},{
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('Companies', companySchema);

module.exports = userModel;