const express = require("express");
const fs = require("fs");
const { sendReponse } = require('../helpers/init');
const throwError = require('../helpers/throwError')
const router = express.Router()

let database = () => {
    let db = fs.readFileSync('db2.json', 'utf8')
    return JSON.parse(db)
}

router.get('/', (req, res, next) => {
    try {
        const limit = 20
        let { companies, jobs } = database()
        const { page, city } = req.query
        if (!page && !city) {
            return sendReponse(200, companies, "Companies", res, next)
        }
        if (page) {
            db = companies.slice(limit * (page - 1), limit * page)
        }
        if (city) {
            const foundCityMiami = jobs.filter(job => job.city === "Miami")
            const foundCityNewYork = jobs.filter(job => job.city === "New York")
            const jobsCityMiami = foundCityMiami.map(e => e.companyId)
            const jobsCityNewYork = foundCityNewYork.map(e => e.companyId)
            const data = companies.filter(e =>
                jobsCityMiami.includes(e.id) && jobsCityNewYork.includes(e.id)
            )
            db = data
        }

        return sendReponse(200, db, "Hello", res, next)
    } catch (error) {
        next(error)
    }

})

router.post('/', (req, res, next) => {
    try {
        const { id, name, benefits, description, ratings, jobs, numOfJobs, numOfRatings } = req.body
        if (!id || !name || !benefits || !description || !ratings || !jobs || !numOfJobs || !numOfRatings) {
            throwError("Missing info", 400)
        }
        let companiesData = database()
        const objCompany = {
            id, name, benefits, description,
            ratings, jobs, numOfJobs, numOfRatings
        }
        companiesData.companies.unshift(objCompany)
        let newDb = companiesData
        newDb = JSON.stringify(newDb)
        fs.writeFileSync('db2.json', newDb)
        return sendReponse(200, {}, "Successful update!", res, next)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', (req, res, next) => {
    try {
        const { id } = req.params
        let companiesData = database()
        let db = companiesData.companies
        let companiesId = db.map(company => company.id)
        if (!companiesId.includes(id)) {
            throwError("Company not found!", 404)
        }
        let foundId = db.find(company => company.id === id)
        let indexFoundId = db.indexOf(foundId)
        foundId = { ...foundId, enterprise: "xi nghiep" }
        db.splice(indexFoundId, 1, foundId)
        companiesData = { ...companiesData, companies: db }
        let dbToSave = companiesData
        dbToSave = JSON.stringify(dbToSave)
        fs.writeFileSync('db2.json', dbToSave)
        return sendReponse(200, {}, "Update success!", res, next)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        const { id } = req.params
        let companiesData = database()
        let { companies } = companiesData
        let companiesId = companies.map(company => company.id)
        if (!companiesId.includes(id)) {
            throwError("Company not found", 404)
        }
        let companyFound = companies.filter(company => company.id !== id)
        companiesData = { ...companiesData, companies: companyFound }
        companiesData = JSON.stringify(companiesData)
        fs.writeFileSync('db2.json', companiesData)
        return sendReponse(200, {}, "Successful delete", res, next)
    } catch (error) {
        next(error)
    }
})

router.post('/admin', (req, res, next) => {
    const headers = req.headers
    const body = req.body
    res.status(200).send(headers)
    console.log(headers)
    console.log(body)
})
module.exports = router;

/*
    As a client app I can make a DELETE request to http://localhost:5000/companies/:id delete a company by id
*/

