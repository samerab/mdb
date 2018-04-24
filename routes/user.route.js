const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const userModel = require('../models/user');

router.get('/', checkAuth, (req, res, next) => {
    userModel.find()
    //.where({ name: /a/ })
    .select('_id name password')
    .populate('postId', 'body')
    .sort({name: -1 })
    .exec()
    .then( users => {
       
        res.json({
            xxx: req.tokenInfo,
            data: users.map( user => {
                return {
                    namooo: user.name,
                    password:user.password
                }
            })
        }
            );
    })
    .catch()
});




router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.find({email:email})
              .exec()
              .then( user => {
                  if( user.length > 0){
                    return res.status(401).json({
                        message: 'email exists'
                    });
                  }
                  bcrypt.hash(password, 10, (err, hash) => {
                      if(err){
                            return res.status(500).json({
                                Error: err + 'zzz'
                            });
                        }
                        else {
                            var newUser = new userModel({
                                email: email,
                                password: hash
                            });
                            newUser.save()
                            .then( createdUser => {
                                res.status(201).json({
                                    message: 'user added successfully',
                                    user: createdUser
                                });
                                })
                                .catch( err => {
                                    res.status(500).json({
                                        message: 'Error: ' + err
                                    });
                                });  
                        }    
                  });
              });
                
});


router.post('/signin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.find({email:email})
              .exec()
              .then( user => {
                  if( user.length < 1){
                    return res.status(404).json({
                        message: 'not authenticated falsch email'
                    });
                  }
                  bcrypt.compare(password, user[0].password, (err, result) => {
                      if(err){
                            return res.status(500).json({
                                Error: err
                            });
                        }
                        else if (!result){
                            return res.status(404).json({
                                message: 'not authenticated !='
                            });
                        }
                        else  {
                            var token = jwt.sign({
                                id: user[0]._id,
                                email: user[0].email
                            },
                            'secret',
                            {expiresIn: '1h'}
                        );
                        res.status(200).json({
                            token: token
                        });

                        }    
                  });
              }).catch(err => {
                return res.status(404).json({
                    error: err
                });
              });
                
});


router.post('/signon', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.count({name1:'salma1'})
              .exec()
              .then( count => {
                  if(count == 0){
                    return res.status(404).json({
                        message: 'no count'
                    });
                  }
                  res.status(200).json({
                    message: count
                });
                  
              }).catch(err => {
                return res.status(404).json({
                    error: 'ttt' + err
                });
              });
                
});

router.post('/signo', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let user1 = {};
    userModel.findOne({email:email})
                .exec()
                .then( user => {
                            if(!user){
                                return res.status(404).json({
                                    message: 'not authenticated falsch email'
                                });
                            } 
                            user1 = user;                 
                        })
                .then( () => {
                    return bcrypt.compare(password, user1.password)
                    })
                .then( result => {
                    if (!result){
                          return res.status(404).json({
                              message: 'not authenticated !='
                          });
                    }
                    else  {
                          var token = jwt.sign({
                              id: user1._id,
                              email: user1.email
                          },
                          'secret',
                          {expiresIn: '1h'}
                      );
                      res.status(200).json({
                          token: token
                      });

                      } 
                    })

              .catch(err => {
                return res.status(404).json({
                    error: err
                });
              });
                
});

router.get('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    userModel.remove({})
    .then( result => {
        res.status(201).json({
            message: 'tam el hazf'
        });
    })
    .catch( err => {
        res.status(500).json({
            message: 'sam error',
            error: err
        });
    });
});

router.patch('/update/:name', (req, res, next) => {
    //var id = req.params.id;
    userModel.update({name: /gi/},{$set:{name: req.params.name}},{multi: true})
    .then( result => {
        res.status(201).json({
            message: 'updated successfully'
        });
    })
    .catch( err => {
        res.status(500).json({
            message: 'sam error',
            error: err
        });
    });
});



router.post('/signing', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let hs = '';
    userModel.findOne({email:email})
              .exec()
              .then( user => {
                  if(user){
                    return res.status(401).json({
                        message: 'email exists'
                    });
                  }
                  bcrypt.hash(password, 10)
                .then( hash => {
                    hs = hash;
                    var newUser = new userModel({
                            email: email,
                            password: hash
                        });
                        return newUser.save()
                })
                .then( createdUser => {
                            res.status(201).json({
                                message: 'user added successfully',
                                user: createdUser,
                                hash: hs
                            });
                })
                .catch( err => {
                    res.status(500).json({
                        message: 'Error: ' + err
                    });
                });     
                    
                            
                            
                          
                 
              });
                
});

module.exports = router;







