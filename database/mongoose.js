require(`dotenv`).config();
const mongoose = require(`mongoose`);

mongoose.connect(process.env.MONGOOSE_URL);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error:`));
db.once(`open`, () => console.log(`server database terhubung`));
// module.exports = db;