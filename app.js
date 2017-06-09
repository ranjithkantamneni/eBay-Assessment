const express = require('express')
const app = express()

var os = require('os');
var osU = require('os-utils');

app.use(express.static('public'))

app.get('/api', function (req, res) {
    osU.cpuUsage(function (v) {
        var m = os.totalmem()
        var fm = os.freemem()
        res.json({
            time: new Date(),
            cpuUsage: v,
            memoryUsage: ((m - fm)/(m)) * 100
        })
    })

})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})