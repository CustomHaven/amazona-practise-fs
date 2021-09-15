import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
const PORT = 5000;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users/', userRoute);
app.use('/api/products/', productRoute);

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const getOne = data.products.find(item => item._id === req.params.id)
//     if (getOne !== undefined) {
//         return res.status(200).send(getOne);
//     }
//     return res.status(404).send({name: 'no product'})
// });

app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`)
})