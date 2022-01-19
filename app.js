require("dotenv").config()
// ! dotenv import must be above all other imports

const Express = require("express");
const app = Express()

/* 
    * First we create a variable to import express from node modules folder into our file using require() method.
    * Creating top level function Express() to gain access to all of its methods and properties:
        * HTTP requests
        * middleware functionality
        * basic app settings
*/

app.listen(process.env.PORT, () => {
    console.log(`[server]: app.js is listening on 4000`)
    // console.log(process.env) // shows all loaded variables that exist in process.env
})


