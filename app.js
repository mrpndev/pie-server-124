require("dotenv").config()
// ! dotenv import must be above all other imports

const Express = require("express");
const app = Express()

const controllers = require("./controllers")
const dbConnection = require("./db")
const middleware = require("./middleware")

/* 
    * First we create a variable to import express from node modules folder into our file using require() method.
    * Creating top level function Express() to gain access to all of its methods and properties:
        * HTTP requests
        * middleware functionality
        * basic app settings
*/

app.use(Express.json())
// Recognizes and handles incoming requests as JSON objects. It's a middleware that parsees JSON.
app.use(middleware.CORS)
app.use("/user", controllers.usercontroller)
app.use("/pies", middleware.validateSession, controllers.piecontroller)

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[server]: app.js is listening on 4000`)
            // console.log(process.env) // shows all loaded variables that exist in process.env
        })
    })
    .catch((err) => console.log(err))

// Routes

/* 
    Routes are the roads that we can take to the specific places in our application.
        * They're the endpoints or URI/URL's we can reach to handle a particular resource.
        * They utilize HTTP request/response cycle to work.
            * HTTP request being sent from the client to the server
            * HTTP response is processed on the server and sent to the client.
        * HTTP requests handle full CRUD functionality of our server.
            * Create content (POST) [has body]
            * Read content (GET) [no body, just endpoint + headers]
            * Update content (PUT) [has body]
            * Delete content (DELETE) [no body, just endpoint + headers]
        * HTTP requests also come with response status codes that specify what happened to our HTTP request.
            * 200 OK
            * 201 Created
            * 404 Not found
            * 403 Forbidden
            * 500 Server crapped out and I have NO IDEA where.

*/

// app.get("/pies", (req, res) => {
//     console.log(req)
//     res.send("I love pie!")
// })

