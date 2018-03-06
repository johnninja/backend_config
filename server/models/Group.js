const mongoose = require('mongoose');
const GroupSchema = require('../schemas/GroupSchema');

const Group = mongoose.model('group', GroupSchema);
module.exports = Group;