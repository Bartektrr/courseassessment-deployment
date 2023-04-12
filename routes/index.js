var express = require('express');
var router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let contentCollection = db.collection('content')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let content = await contentCollection.get("content");
  if(content == null) {
    res.json({
      status: "fail"
    });  
  }
  else {
    contentValue = content.props.value;
    console.log(contentValue);
    res.json({
      status: "success",
      content: contentValue,
    });  
  }
});

router.post('/', async function(req, res, next) {
  const {content} = req.body;
  await contentCollection.set("content", {
    value: content
  })
  res.json({
    status: "success",
    content: content,
  });
});

module.exports = router;
