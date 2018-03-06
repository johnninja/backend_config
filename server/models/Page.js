const mongoose = require('mongoose');
const PageSchema = require('../schemas/PageSchema');

const Page = mongoose.model('page', PageSchema);
module.exports = Page;