import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import testResultRouter from './routes/TestResult.routes';

const app = express();

// logger
app.use(morgan('dev'));

// Cors filter
app.use(cors())

app.use(express.json())

// configuracion del puerto por el que va a estar escuchando la aplicacion
app.set('PORT', process.env.PORT || 3000)

// rutas
app.use('/result', testResultRouter)

export default app;