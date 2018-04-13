import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server'
import {JssProvider, SheetsRegistry} from 'react-jss'
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App';
import { fetchPopularRepos } from '../shared/api';
import routes from '../shared/routes';

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
app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  console.log('activeRoute: ', activeRoute);
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve({})

  promise.then((data) => {
    const sheets = new SheetsRegistry();

    const body = renderToString(
      <JssProvider registry={sheets}>
        <StaticRouter location={req.url} context={{}}>
          <App data={data} />
        </StaticRouter>
      </JssProvider>
      );

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <style type="text/css" id="server-side-styles">${sheets.toString()}</style>
          <script>window.__INITIAL_DATA__ = ${serialize(data)};</script>
        </head>
        <body>
          <div id="root">${body}</div>
          <script src="/bundle.js" defer></script>
        </body>
      </html>`
    );
  }).catch(next);
});
app.use((err, req, res, next) => {
  res.status(500);
  console.log(err);
  res.json({ message: err.toString() });
});

// Start server
app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})