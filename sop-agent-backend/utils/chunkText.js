function chunkText(text, chunkSize = 1000, overlap = 100) {

  const chunks = [];
  let start = 0; 
  while (start < text.length) {
    chunks.push(text.substring(start, start + chunkSize));
    start += chunkSize - overlap;
  }
  return chunks;
}

module.exports = chunkText;
