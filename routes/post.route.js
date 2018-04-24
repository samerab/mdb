const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const postModel = require('../models/post');

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}





router.get('/', (req, res, next) => {
    
    postModel.find()
    .where('userId').equals('5a8af62575a49986eb38d95b')
    .populate('userId', 'name')
    .exec()
    .then( posts => {
        res.status(200);
        res.send(posts.map( post => {
                            return            {
                                user: post.userId.name,
                                post: 'testoooo' + post.body
                            }
                        }).sort(dynamicSort('-user'))
                );
        
        
    })
    .catch( err => {
        res.status(500).send({
            error: {message: err}
        });
    });
});

router.post('/add', (req, res, next) => {
    const post = new postModel({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.postBody,
        userId: req.body.userId

    });

    post.save()
    .then( post => {
        res.status(201).send(post);
    })
    .catch( err => {
        res.status(500).send({
            error: {message: err}
        });
    });
});



module.exports = router;