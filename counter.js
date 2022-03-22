const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(morgan("dev"))
app.use(cors())

app.get("/", (req, res) => {
    res.json()
})
let counter = 0
let counterNames = []

//- GET `/counter` - Returns the current value of the counter. The counter should start of at 0.
app.get("/counter", (req, res) => {
    res.json({ counter: counter })
})

//- POST `/counter/increment`-  Increments the counter on the server and returns the current value.
app.post("/counter/increment", (req, res) => {
    counter++
    res.json({ counter: counter })
})

//- POST `/counter/decrement`-  Decrements a counter on the server and returns the current value.
app.post("/counter/decrement", (req, res) => {
    counter--
    res.json({ counter: counter })
})

//- POST `/counter/double`-  Double the value of the counter on the server and returns the current value. 
app.post("/counter/double", (req, res) => {
    counter = counter * 2
    res.json({ counter: counter })
})

//- DELETE `/counter` - Resets the counter to 0 and returns the current value.
app.delete("/counter", (req, res) => {
    counter = 0
    res.json({ counter: counter })
})

//## Extension 1
/* Add a route PUT `/counter` that can be used to set the counter to a specific value.
 The value should be specified by a query string parameter. For example, making a PUT 
 request to `/counter?value=20` should set the value of the counter to 20. Use the 
  `req.query` property in your callback to get the value provided. See the 
  [express documentation](https://expressjs.com/en/api.html#req.query) 
  If no value is provided, the counter should not be changed. 
*/

app.put("/counter", (req, res) => {
    let value = req.query
    counter = Number(value.value.length > 0 ? value.value : counter)
    res.json({ counter: counter })
})


/*
## Extension 2
Using [route parameters](https://expressjs.com/en/guide/routing.html),
  update your API to keep track of multiple counters. Allow the client 
  to specify the counter name as part of the URL. For example, to update and access 
  a counter called "cars", the client could make the following requests:

- POST `/counter/cars/increment`
- POST `/counter/cars/decrement`
- POST `/counter/cars/double`
- DELETE `/counter/cars`
- GET `/counter/cars`

It should be possible for the client to specify any counter name in the place of "cars".
*/

app.get("/counter/:name", (req, res) => {
    let counterName = req.params.name
    res.json(counterNames.push({ [counterName]: 0 }))
    console.log(counterNames)
})

app.post(["/counter/:name/increment"], (req, res) => {
    let urlName = req.params.name
    
    res.json()
})
console.log(counterNames)

app.post(["/counter/:name/decrement"], (req, res) => {
    counter--
    let counterName = req.params.name
    res.json({ [counterName]: counter })
})

app.post(["/counter/:name/double"], (req, res) => {
    counter = counter * 2
    let counterName = req.params.name
    res.json({ [counterName]: counter })
})

app.delete(["/counter/:name/delete"], (req, res) => {
    counter = 0
    let counterName = req.params.name
    res.json({ [counterName]: counter })
})


const port = 3030
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})
