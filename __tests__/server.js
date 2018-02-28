const server = require('../src/server');
const quizFns = require('../routes/quiz.js');
const Models = require('../models');

describe('testing functions for getting questions and answers', () => {
  beforeAll((done) => {
    Models.questions.destroy({ truncate: true }).then(() => {
      Models.questions.bulkCreate([{
        id: 13,
        questionid: 12,
        question: 'What is the capital of India',
        answer: 'New Delhi',
        options: [
          'New Delhi',
          'MP',
          'UP',
          'Bangalore',
        ],
      },
      {
        id: 14,
        questionid: 23,
        question: 'What is the capital of Afghanistan',
        answer: 'Kabul',
        options: [
          'Kabul',
          'Tirana',
          'Algiers',
          'Andorra la Vella',
        ],
      }]).then(() => done());
    });
  });
  afterAll((done) => {
    Models.questions.destroy({ truncate: true }).then(() => done());
  });


  it('get questions from URL1', () => {
    const promise = quizFns.getQuestions();
    promise.then((QuestionsObj) => {
      expect(QuestionsObj.allQuestions.length).not.toBe(0);
    });
  });

  it('get answers for questions from URL2', () => {
    const questions = [
      {
        question: 'What is the capital of India',
        questionId: 12,
        option1: 'New Delhi',
        option2: 'MP',
        option3: 'UP',
        option4: 'Bangalore',
      },
    ];
    const promiseArray = quizFns.getAnswers(questions);

    Promise.all(promiseArray).then((questionsWithAnswers) => {
      expect(questionsWithAnswers[0].answer).toEqual('New Delhi');
    });
  });

  it('gets questions from api and adds to the database', (done) => {
    const request = {
      method: 'POST',
      url: '/questions',
    };
    server.inject(request, (response) => {
      expect(response.result.message).toEqual('Questions added to database');
      done();
    });
  }, 100000);
  it('gets questions from the database', (done) => {
    const request = {
      method: 'GET',
      url: '/questions/local',
    };
    server.inject(request, (response) => {
      expect(response.result.message).toEqual('not empty');
      done();
    });
  }, 100000);
});
