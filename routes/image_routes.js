const router = require('express').Router()

// generic testing route
router.get('/test', (req, res)=>{
    console.log('test route accessed')
    res.send('image/test route working')
})

// route to decode image bytestream and save in folder
router.post('/up', async (req, res)=>{
    // accessing image data
    const fileName = req.body.fileName
    const byteStream = req.body.bytes

    if(byteStream){
        var buffer = Buffer.alloc(byteStream.length)
        for(var i = 0; i < byteStream.length; i++){
            buffer[i] = byteStream[i]
        }

        await fs.writeFile(`./imgs/${fileName}.png`, buffer, (error)=>{
            if(!error){
                console.log(`image saved - ${fileName}.png`)
                res.status(200).send('image saved successfully')
            }else{
                res.send('some error decoding bytestream')
            }
        })
    }else{
        res.send('image byte-stream not sent')
    }
})

// route to classify the uploaded image
router.get('/classify', async (req, res)=>{
    const fileName = req.body.fileName

    try{
        let process = require('python-shell').PythonShell

        // argument for filename
        let options = {
            args: [fileName]
        }

        process.run('processes/classify.py', options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            console.log('image classified');
            res.status(200).json({class: results[results.length-1]})
          })
        
    }catch(error){
        console.log(error)
        res.send('shit')
    }
})

module.exports = router