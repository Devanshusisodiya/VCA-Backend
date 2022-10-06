// base dependencies
const api = require('express')()
const bodyParser = require('body-parser')
const image_routes = require('./routes/image_routes')

// middleware
api.use(bodyParser.json({limit: '50mb'}))
api.use('/image', image_routes)

// generic api base route
api.get('/', (req, res)=>{
    res.send('API working SIUUUUUUU!')
})

// initializing event loop
api.listen(3000, ()=>{
    console.log('Server started')
})