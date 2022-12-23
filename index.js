const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors');
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

// Routes
const caseRoutes = require('./routes/caseRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express();
app.use(express.json())

app.use(cors())

// Set up router for routes
const router = express.Router();

// Default route for main page and possibly documentation for api
app.use("/", router);

// Routes
app.use('/api/cases', caseRoutes.routes)
app.use('/api/users', userRoutes.routes)

router.get("/", function (req, res) {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is listening on http://localhost:${process.env.PORT}`.magenta.bold));
