const app = require('./app');

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});