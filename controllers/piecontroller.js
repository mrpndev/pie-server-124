// const Express = require("express")
// const router = Express.Router()
const router = require("express").Router()
const { PieModel } = require("../models")

router.get("/", async (req, res) => {
    try {
        const allPies = await PieModel.findAll(
            // {order: [["id", "ASC"]]}
        )
        console.log(allPies)

        res.status(200).json(allPies)

    } catch(err) {

        res.status(500).json({
            error: err
        })

    }
})

router.post("/", async (req, res) => {

    try {
        const createPie = await PieModel.create({
            nameOfPie: req.body.nameOfPie,
            baseOfPie: req.body.baseOfPie,
            crust: req.body.crust,
            timeToBake: req.body.timeToBake,
            servings: req.body.servings,
            rating: req.body.rating
        })

        console.log(createPie)

        res.status(201).json({
            message: "Pie successfully created",
            createPie
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to create pie ${err}`
        })
    }
})

router.put("/:id", async (req, res) => {
    const {
        nameOfPie,
        baseOfPie,
        crust,
        timeToBake,
        servings,
        rating
    } = req.body

    try {
        await PieModel.update(
            { nameOfPie, baseOfPie, crust, timeToBake, servings, rating }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "Pie successfully updated.",
                updatedPie: result
            })
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update pie ${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {

    try {
        await PieModel.destroy({
            where: { id: req.params.id }
        })
        
        res.status(200).json({
            message: "Pie deleted",
        })
        
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete pie ${err}`
        })
    }
})

module.exports = router

/* 
    ? What is Model View Controller
    * Architecture pattern which helps us design and build scalable and maintainable applications.
        * Model (database part)
        * View (what the display of data will look like)
            * browser, Postman, React front-end
        * Controller (processes the request data coming in from endpoints and handles responses)
*/