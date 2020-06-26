var Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
var svc = new Service({
    name: 'OPC UA CLIENT',
    description: 'Cliente opc del robot, puerto utilizado: 3000',
    script: "./dist/index.js",
    env: {
        name: "HOME",
        value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
    },
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });

  // Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});
  
  // Uninstall the service.
//svc.uninstall();
svc.install();