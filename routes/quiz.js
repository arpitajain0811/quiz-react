const rp = require('request-promise');
const Models = require('../models');

const getQuestions = () => {
  const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const promise = new Promise((resolve) => {
    rp(url).then((response) => {
      const QuestionsObj = JSON.parse(response);
      resolve(QuestionsObj);
    });
  });
  return promise;
};

const getAnswers = (questions) => {
  const promiseArray = [];
  questions.forEach((question) => {
    const questionCopy = question;
    const promise = new Promise((resolve) => {
      const url1 = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${question.questionId}`;
      rp(url1).then((res) => {
        const answerObj = JSON.parse(res);
        questionCopy.answer = answerObj.answer;
        resolve(questionCopy);
      });
    });
    promiseArray.push(promise);
  });
  return promiseArray;
};
const addQuestionsToTable = (questions) => {
  const promiseArray = [];
  questions.forEach((question) => {
    const noOfOptions = Object.keys(question).length - 3;
    const optionsArray = [];
    for (let i = 0; i < noOfOptions; i += 1) {
      const key = `option${i + 1}`;
      optionsArray.push(question[key]);
    }
    const promise = new Promise((resolve) => {
      Models.questions.create({
        questionid: question.questionId,
        question: question.question,
        answer: question.answer,
        options: optionsArray,
      });
      resolve(question);
    });
    promiseArray.push(promise);
  });
  return promiseArray;
};

const route = [
  {
    method: 'GET',
    path: '/questions',
    handler: (request, reply) => {
      const QuestionsPromise = getQuestions();
      QuestionsPromise.then((QuestionsObj) => {
        const promiseArray = getAnswers(QuestionsObj.allQuestions);
        Promise.all(promiseArray).then(() => {
          reply(QuestionsObj.allQuestions);
        });
      });
    },
  },
  {
    method: 'POST',
    path: '/questions',
    handler: (request, response) => {
      const QuestionsPromise = getQuestions();
      QuestionsPromise.then((QuestionsObj) => {
        const promiseArray = getAnswers(QuestionsObj.allQuestions);
        Promise.all(promiseArray).then(() => {
          Models.questions.destroy({ where: {} }).then(() => {
            const promiseArray2 = addQuestionsToTable(QuestionsObj.allQuestions);
            Promise.all(promiseArray2).then(() => {
              response({
                statusCode: 201,
                message: 'Questions added to database',
              });
            });
          });
        });
      });
    },
  },
  {
    method: 'GET',
    path: '/questions/local',
    handler: (request, response) => {
      Models.questions.findAll().then((result) => {
        console.log(result);
        console.log(result.length);
        if (result.length === 0) {
          response({
            message: 'empty',
          });
        } else {
          response({
            result,
            message: 'not empty',
          });
        }
      });
    },
  },
  {
    method: 'PATCH',
    path: '/user',
    handler: (request, reply) => {
      console.log('payload', request.payload);
      const pl = JSON.parse(request.payload);
      Models.users.update(
        {
          score: pl.score,
          totalscore: pl.totalScore,
          answers: pl.answers,
        },
        {
          where: {
            username: pl.username,
          },
        },
      ).then((response) => {
        reply(response);
      });
    },

  },
  {
    method: 'PUT',
    path: '/user',
    handler: (request, reply) => {
      console.log(request.payload);
      Models.users.findOrCreate({
        where: { username: request.payload },
        defaults: { score: 0, totalscore: 0, answers: {} },
      })
        .then((response) => {
          console.log(response);
          reply(response[0]);
        });
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: (request, reply) => {
      Models.users.findAll({
        order: [
          ['score', 'DESC'],
        ],
      }).then((result) => {
        reply(result);
      });
    },
  },
];
module.exports = {
  route,
  getQuestions,
  getAnswers,
  addQuestionsToTable,
};
