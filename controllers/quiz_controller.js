var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {  
  models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }); 
};


//GET /quizer/question
exports.show=function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
       res.render('quizes/show',{quiz: req.quiz});
    });
};

//GET /quizer/:id/answer
exports.answer=function(req, res){

     var resultado ='Incorrecto';
        if(req.query.respuesta === req.quiz.respuesta){
           resultado='Correcto';
        }
         res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};
