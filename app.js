const express = require('express');
const CORS = require('cors');
const server = express();
// Teach the server to read json
server.use(express.json())
// Setup cors in the application
server.use(CORS())

// Bring in routes
const postRoutes = require('./routes/postRoutes')

server.use('/api/posts', postRoutes)


const port = 8001;
server.listen(port, () => console.log(`Server is running on port: ${port}`));