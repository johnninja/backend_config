const mongoose = require('mongoose');
const ChartSchema = require('../schemas/ChartSchema');

const Chart = mongoose.model('chart', ChartSchema);
module.exports = Chart;