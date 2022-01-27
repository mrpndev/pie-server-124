/* 
    ? Midldeware - function with access to request and response objects, and next middleware function in req/res cycle.
        * Execute any code
        * Change req/res cycle and its respective objects
        * End req/res cycle
        * Call the next middleware fx in the stack. That's done using next()
*/

module.exports = {
    CORS: require("./headers"),
    validateSession: require("./validate-session")
}