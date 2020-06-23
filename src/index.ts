import app from './app';


// Iniciar aplicacion
app.listen(app.get('PORT'), () => {
    console.log('Server on port', app.get('PORT'));
})