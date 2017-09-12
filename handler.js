const React = require('react');
const path = require('path');
const url = require('url');
const fs = require('fs');
const Hello = require('./transpiled/Hello').default;
const cheerio = require('cheerio');
const { renderToString } = require('react-dom/server');

module.exports.handler = (event, context, callback) => {
  console.log(event);
  const htmlPath = path.resolve(__dirname, 'dist', 'index.html');
  
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    const $ = cheerio.load(html);
    
    const renderedApp = renderToString(React.createElement(Hello));
    $('#app').append(renderedApp);

    $('script').each((i, elem) => {
      const src = $(elem).attr('src');
      const resolvedSrc = path.join(`/${event.requestContext.stage}`,src);
      $(elem).attr('src', resolvedSrc);
    });

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: $.html()
    };

    callback(null, response);
  });
};
