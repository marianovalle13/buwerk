const helpers = require('./_helpers.js')
const express = require('express')
const router = express.Router()
const required = require('../middlewares/token')
import model from '../models/userProfesional'
import profesional from '../models/profesional'
import Debug from 'debug'
const debug = new Debug(`api/userProfesional`)
var url = require('url');

router.get('/', (req, res, next) => {
    return helpers.find(model, req, res);
})

router.get('/:id', (req, res, next) => {
    return helpers.findById(model, req, res)
})

router.post('/', (req, res, next) => {
    const params = req.body;

    debug('params ', params);

    console.log('DATA STEP 3 ', params);

    if (req.params.id) {
      params.id = req.params.id;
    }

    if (params.id) {

        debug('about to update -----------');

        //// ---- update userPro
        model.update({ _id: params.id }, params)
        .then((data) => {
          debug(`update `, data);

          //// ---- get all userPros and get average of update number
          model
          .find({profesional: params.profesional})
          .then(find => {
            debug(`find result`, find);

            let lengthRating = find.length;
            let numberRating = 0;
            let ratingPromise = [];

            for (let o of find) {

                debug('o ', o);
                numberRating += o.rating;

                ratingPromise.push(
                    new Promise((resolve) => {
                      resolve(o);
                    })
                  )
                  
            }
            
            //// ---- when you got the average
            Promise.all(ratingPromise)
              .then((results) => {
                console.log("All done", results);
                console.log("numberRating ", numberRating);
                console.log("lengthRating ", lengthRating);
    
                let finalRating = numberRating / lengthRating
                debug('finalRating ---------- ', finalRating);

                let updatePro = {
                    rating: finalRating,
                    ratingAmount: lengthRating
                }
                // let updatePro = {
                //     id: find.profesional,
                //     rating: finalRating,
                //     ratingAmount: lengthRating
                // }

                debug('updatePro ---------- ', updatePro);
                debug('find ---------- ', find);
                debug('find.profesional ---------- ', find.profesional);

                console.log('DATA STEP 4 ', updatePro);

                //// ---- update user
                profesional.update({ id: find[0].profesional }, updatePro)
                  .then((data) => {
                      debug(`updated user `, data);
                      res.status(200).json(data);
                  })

            })
                .catch((e) => {
                console.log(e)
                // Handle errors here
            });
          })
          .catch((error) => {
              return res.status(400).json({
                  message: error.message || 'no se pudo crear objeto',
                  error
                  });
              });
          })
      .catch((error) => {
          return res.status(400).json({
          message: error.message || 'no se pudo crear objeto',
          error
          });
      });
  } else { /////// -------------------------------- --------------------------------

    debug('about to create -----------')

    //// ---- create userPro
    model.create(params)
      .then((data) => {
        debug(`create `, data);

          //// ---- get all userPros and get average of update number
          model
          .find({profesional: data.profesional})
          .then(find => {
              debug(`find result`, find);

              let lengthRating = find.length;
              let numberRating = 0;
              let ratingPromise = [];

              for (let o of find) {

                  debug('o ', o);
                  numberRating += o.rating;

                  ratingPromise.push(
                      new Promise((resolve) => {
                        resolve(o);
                      })
                    )
                    
              }

              //// ---- when you got the average
              Promise.all(ratingPromise)
                .then((results) => {
                  console.log("All done", results);
                  console.log("numberRating ", numberRating);
                  console.log("lengthRating ", lengthRating);
      
                  let finalRating = numberRating / lengthRating
                  debug('finalRating ---------- ', finalRating);

                  let updatePro = {
                      rating: finalRating,
                      ratingAmount: lengthRating
                  }
                  // let updatePro = {
                  //     id: find.profesional,
                  //     rating: finalRating,
                  //     ratingAmount: lengthRating
                  // }

                  debug('updatePro ---------- ', updatePro);

                  console.log('DATA STEP 4 ', updatePro);

                  //// ---- update user
                  profesional.update({ _id: find[0].profesional }, updatePro)
                    .then((data) => {
                        debug(`updated user `, data);
                        res.status(200).json(data);
                    })

      
              })
              .catch((e) => {
                console.log(e)
                
            });
          })
          .catch((error) => {
              return res.status(400).json({
                  message: error.message || 'no se pudo crear objeto',
                  error
                  });
              });
          })
      .catch((error) => {
          return res.status(400).json({
          message: error.message || 'no se pudo crear objeto',
          error
          });
      });
    } // end else
})

router.put('/:id', (req, res, next) => {
    return helpers.findByIdAndUpdate(model, req, res);
})

router.delete('/all', (req, res, next) => {
    return helpers.deleteAll(model, req, res)
})

router.delete('/:id', (req, res, next) => {
    return helpers.delete(model, req, res)
})

router.post('/login', function (req, res, next) {
    return helpers.login(model, req, res)
})

module.exports = router
