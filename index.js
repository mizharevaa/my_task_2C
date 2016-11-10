import express from 'express';
import cors from 'cors';
import validator from 'validator';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/UN', (req, res) => {
  try {
    if (!req.query.username) {
      return res.send('Invalid username');
    }
    return res.send(getUsreNameFromStr(req.query.username));
   } 
  catch (err) {
    console.log(err);
    return res.json({err});
  }
});

app.listen(3000, () => {
  console.log('Task 2C listen port 3000!');
});


function getUsreNameFromStr(inputStr) {
  const splitParams = inputStr.split(/\?/g)[0];
  if (validator.isURL(splitParams)) {
    var URLwithProtocol = false;
    if (splitParams.match(/\/\//g)) {
      URLwithProtocol = true;
    }

    const splitSlash = splitParams.split(/\//g);
    return URLwithProtocol ? '@' + splitSlash[3].replace(/^@/,'') : '@' + splitSlash[1].replace(/^@/,'');
  } else {
    return '@' + splitParams.match(/[\/@]?[а-яёА-ЯЁa-zA-Z._-]+$/g)[0].replace(/[\/@]/,'');
  };
}
