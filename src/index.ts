import app from './app';
import { createConnection } from "typeorm";
import { readPlc } from './plc/readPlc'

class Server {

    listen() {
        // Conectar con la base de datos
        createConnection();

        // Iniciar aplicacion
        app.listen(app.get('PORT'), () => {
            console.log('Server on port', app.get('PORT'));
            readPlc();
        })
    }
}

const server = new Server();

server.listen();