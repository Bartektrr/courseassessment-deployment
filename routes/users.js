var express = require('express');
var router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let users = db.collection('users')

router.get('/', async function(req, res, next) {
  let list = await users.list();
  console.log(list);
  res.render("users", {users: list.results, host: process.env.CYCLIC_URL, username: process.env.username, password: process.env.password});
});

router.get('/:email', async function(req, res, next) {
  let item = await users.get(req.params.email);
  console.log(item);
  res.render("userDetails", {email: item.key, user: item.props});
});

router.get('/:email/work', async function(req, res, next) {
  let items = await users.item(req.params.email).fragment("Work").get();
  var item = items[0];
  res.render("workDetails", {email: req.params.email, companyName: item.props.CompanyName, salary: item.props.Salary, currency: item.props.Currency});
});

router.get('/:email/home', async function(req, res, next) {
  let items = await users.item(req.params.email).fragment("Home").get();
  var item = items[0];
  res.render("homeDetails", {email: req.params.email, country: item.props.Country, city: item.props.City});
});

router.post('/add', async function(req, res, next) {
  const {Email, FirstName, LastName, CompanyName, Salary, Currency, Country, City} = req.body;
  await users.set(Email, {
    FirstName: FirstName,
    LastName: LastName
  });
  await users.item(Email).fragment("Work").set({
    CompanyName: CompanyName,
    Salary: Salary,
    Currency: Currency
  });
  await users.item(Email).fragment("Home").set({
    Country: Country,
    City: City
  });
  res.end();
});

router.put('/:email', async function(req, res, next) {
  const {FirstName, LastName, CompanyName, Salary, Currency, Country, City} = req.body;
  await users.set(req.params.email, {
    FirstName: FirstName,
    LastName: LastName
  });
  await users.item(req.params.email).fragment("Work").set({
    CompanyName: CompanyName,
    Salary: Salary,
    Currency: Currency
  });
  await users.item(req.params.email).fragment("Home").set({
    Country: Country,
    City: City
  });
  res.end();
});

router.delete('/:email', async function(req, res, next) {
  console.log("OK")
  await users.delete(req.params.email);
  res.end();
});


module.exports = router;
