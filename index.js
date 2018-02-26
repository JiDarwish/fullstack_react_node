const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Yo you made it');
});

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
