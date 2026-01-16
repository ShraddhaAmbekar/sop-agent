const mongoose = require('mongoose');
const ChunkSchema = new mongoose.Schema({
  content:String,
  source:String});

module.exports = mongoose.model('Chunk', ChunkSchema);
