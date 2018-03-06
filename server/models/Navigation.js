const mongoose = require('mongoose');
const NavSchema = require('../schemas/NavigationSchema');

const Navigation = mongoose.model('navigation', NavSchema);
module.exports = Navigation;