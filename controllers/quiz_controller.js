var models = require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }else{   
        next(new Error('No existe quizId=' + quizId)); 
      }
  }).catch(function(error){next(error)});

};

// GET /quizes
exports.index = function(req, res) { 

   var filtro  = (req.query.search || '').replace(" ", "%");
   models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(function(quizes){
   //models.Quiz.findAll().then(function(quizes) {
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
