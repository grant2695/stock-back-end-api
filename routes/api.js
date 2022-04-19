var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const models = require('../lib/models')

/* GET home page. */
router.get('/search/:symbol', async function(req, res, next) {
    let response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${req.params.symbol}/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=API_KEY_GOES_HERE
`)
    let json = await response.json()

    res.json(json.results[0].c)
    console.log('where working on search')



});
router.get('/search/:symbol/open', async function(req, res, next) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    let response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${req.params.symbol}/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=API_KEY_GOES_HERE
`)

    let json = await response.json()

    res.json(json.results[0].o)


});
router.post('/portfolio', async function(req, res, next) {
    console.log('req.body is', req.body)
    let portfolioRow = await models.Portfolio.create({symbol: req.body.stockName, quantity: req.body.buyValue, price: req.body.stockPrice})
    res.json(portfolioRow)
});
router.put('/portfolio/:id/update',async function(req,res){})
router.get('/portfolio', async function(req,res){
    console.log('req.body is', req.body)
    let response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${req.params.symbol}/range/1/minute/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=API_KEY_GOES_HERE
`)
    let portfolio = await models.Portfolio.findAll({symbol: req.body.stockName, quantity: req.body.buyValue, price: req.body.stockPrice})
    res.json(portfolio)

})
router.get('/portfolio/:id', async function(req,res){
    console.log('req.body is', req.body)
    let userId = req.params.id
    let portfolio = await models.Portfolio.findOne({where:{id:userId}})
    res.json(portfolio)
})
router.delete('/portfolio/:id/delete', async function(req,res){
    console.log('req.body is', req.body)
    let userId = req.params.id
    let portfolio = await models.Portfolio.destroy( {where:{id: userId}})

    res.json('user has been deleted');

})

// Create routes for adding a row in the portfolio table
// Create routes for removing a row in the portfolio table

module.exports = router;