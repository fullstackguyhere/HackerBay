var router = require('express').Router();

router.get('/', function(req, res, next) {
    return res.json({status: 'success'});
  });

router.post('/data', function(req, res, next){
  if(Object.keys(req.body).length === 0 || typeof req.body.data!=="string")
      return res.status(400).json();
    var postInput = req.body;
    req.app.postInput = postInput;
    return res.json(postInput);
});

router.get('/data', function(req, res, next) {
    if(req.app.postInput === null || req.app.postInput === undefined || Object.keys(req.app.postInput).length === 0)
    {
      return res.status(400).json();
    }
    return res.json(req.app.postInput);
  });

module.exports = router;
