const app = require('./app');

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Car Service running on port ${PORT}`);
});