var handler = require('./handler');

const event = {
  requestContext: {
    stage: 'dev'
  }
};

handler.handler(event, {}, (err, payload) => {
  if (err) return console.log(err);
  console.log(payload);
});