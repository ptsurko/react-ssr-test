import express from 'express';
import React from 'react';
import cors from "cors"
import {renderToString} from 'react-dom/server'
import {JssProvider, SheetsRegistry} from 'react-jss'
import serialize from "serialize-javascript"
import App from '../shared/App';
import { fetchPopularRepos } from '../shared/api';

function handleRender(req, res) {
  fetchPopularRepos()
    .then((repos) => {
      console.log('repos: ', repos.length);
      const sheets = new SheetsRegistry()
      const body = renderToString(
        <JssProvider registry={sheets}>
          <App data={repos} />
        </JssProvider>
      );


      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <style type="text/css" id="server-side-styles">${sheets.toString()}</style>
            <script>window.__INITIAL_DATA__ = ${serialize(repos)};</script>
          </head>
          <body>
            <div id="root">${body}</div>
            <script src="/bundle.js" defer></script>
          </body>
        </html>`
      );
    });
}

const app = express();

app.use(express.static("public"));
app.get('/', handleRender);
app.use((err, req, res, next) => {
  res.status(500)
  res.render('error', { error: err })
});

// Start server
app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})