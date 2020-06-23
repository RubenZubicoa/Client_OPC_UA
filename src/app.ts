import express from 'express';
import morgan from 'morgan';

const app = express();

// logger
app.use(morgan('dev'));

// configuracion del puerto por el que va a estar escuchando la aplicacion
app.set('PORT', process.env.PORT || 3000)

export default app;