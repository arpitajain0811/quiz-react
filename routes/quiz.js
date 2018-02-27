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
];
module.exports = route;
