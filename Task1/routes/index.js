var router = require('express').Router();

router.get('/', function(req, res, next) {
    return res.json({status: 'success'});
  });

router.post('/data', function(req, res, next){
    var postInput = req.body;
    req.app.postInput = postInput;
    return res.json(postInput);
});

router.get('/data', function(req, res, next) {
    return res.json(req.app.postInput);
  });

module.exports = router;
