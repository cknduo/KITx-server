const express = require('express');
const app = express();

//Set PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`App is listening at http://localhost:${PORT}`);
})