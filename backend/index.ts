import express from 'express';
import cors from 'cors';
import router from './src/routes';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// route
app.use('/api', router);

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})