
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para optener el clima',
        demand: true
    }
}).argv;
// https://developers.google.com/maps/documentation/geocoding/start


/**
 * COdigo api key del clima
 * AIzaSyD9MC5YRuZpISFdyOFK0BE34c5oFTmrMcY
 * f369635965b00ad16ced5da4da4b9f3b
 * 8189d2742a3cf80be4ea1ae416013a93
 */
//console.log(argv.direccion);

/*lugar.getLugar(argv.direccion)
    .then(result=> console.log(result))
    .catch(e=> console.error(e))*/

/*clima.getClima(-12.0463731,-77.042754)
    .then(rpta => console.log(rpta))
    .catch(err => console.log(err));*/

const getInfo = async (direccion) => {

    const coors = await lugar.getLugar(direccion);
    const temp = await clima.getClima(coors.lat, coors.lng);

    return `El clima en la ciudad ${coors.direccion} es de ${temp}`;
}

getInfo(argv.direccion)
    .then(respt => console.log(respt))
    .catch(err => console.log(err))




