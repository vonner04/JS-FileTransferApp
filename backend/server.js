const express = require('express');

const app = express();


//Connect app to react


const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


