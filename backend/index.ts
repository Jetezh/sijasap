import express from 'express';
import cors from 'cors';
import router from './src/routes';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// route
app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api', router)

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})