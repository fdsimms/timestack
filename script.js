const dotenv = require('dotenv');
const nodeFetch = require("node-fetch");
dotenv.config();
const getTestReport = require('./getTestReport');
const stripAnsi = require('strip-ansi');

function comment(filepath) {
  const request = {
    method: 'POST',
    body: JSON.stringify({ body: stripAnsi(getTestReport(filepath)) }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_API_KEY}`,
      'User-Agent': process.env.GITHUB_USERNAME
    }
  };

  nodeFetch(
    'https://api.github.com/repos/fdsimms/timestack/issues/1/comments',
    request
  )
  return 'Okay';
}

function getReport(filepath) {
  return filepath;
}

module.exports = {
  comment,
  getReport
};
