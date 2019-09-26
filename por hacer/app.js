
const argv = require('yargs').argv;

let comando = argv._[0];

switch( comando ){
    case 'crear': 
        console.log('crear');
        break;
    case 'listar': 
        Console.log("listar");
        break;
    
    case 'actualizar':
        console.log('actualiza');
         break;
    default: 
    console.log('no reconocido');
}