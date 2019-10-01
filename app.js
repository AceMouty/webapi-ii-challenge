const express = require('express');
const server = express();
// Teach the servver to read json
server.use(express.json())

// Bring in routes
const postRoutes = require('./routes/postRoutes')

server.use('/api/posts', postRoutes)


const port = 8000;
server.listen(port, () => console.log(`Server is running on port: ${port}`));