const express = require('express')
const http = require('http')

const app = express()

app.use(express.json())

const serviceCounter = 'localhost'
const serviceConverter = 'localhost'

// Serves a path / that responds to
// a. GET
//     i. with 200 OK text "CWiCS Assessment" --
app.get('/', (req, res) => {
    res.status(200).send('CWiCS Assessment')
})

// 3. Serves a path /cc that responds to
// a. GET
//     i. With 200 OK text "POST to this endpoint with JSON to convert to YAML" --
app.get('/cc', (req, res) => {
    res.status(200).send('POST to this endpoint with JSON to convert to YAML')
})

// b. POST body of any valid JSON
app.post('/cc', (req, res) => {
    const json = req.body

    var options = {
        host: serviceCounter,
        path: '/count',
        port: '30101',
        method: 'POST',
        body: {},
    }
    var options2 = {
        host: serviceConverter,
        path: '/convert',
        port: '30100',
        method: 'POST',
        body: json,
    }

    try {
        // i. Sends POST to service-counter at /count with empty body to expect a 200 OK --
        var postReq = http.request(options, (response) => {
            // res.status(200);
        })

        //     ii. Sends POST to service-converter at /convert with the input JSON --
        var postReq2 = http.request(options2, (response) => {
            //     iii. Responds with the output and status code of service-converter --
            res.status(200).send(response.body)
        })
    } catch (error) {
        // c. POST body of anything else (invalid JSON)
        //     i. Any non 2xx error code (4xx/5xx)
        res.status(401).send(error)
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started on port 3000')
})
