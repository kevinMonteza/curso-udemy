const express = require('express');
const app = express();

const Usuario = require('../models/usuario');

// cifrar la contrasenia 
const bcrypt = require('bcryptjs');

const _ = require('underscore');

app.get('/usuario', function (req, res) {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    Usuario.find({estado: true},'nombre email role img google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuariosDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({estado: true}, (err, total) => {
                res.json({
                    ok: true,
                    usuariosDB,
                    total
                })
            })

        })
    res.json("servicio res service");
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensage: "El nombre es necesario"
        })
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'img', 'role', 'estado']);
    console.log("en el put");
    /*
      para evitar que esos campos se actualicen
      delete body.password;
      delete body.role;*/
    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id',(req,res) =>{
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, {estado: false}, (err, userDeleted) =>{
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if( userDeleted.estado === false ){
            return res.json({
                 ok: false,
                 err:{
                     mensage: "Usuario no encontrado"
                 }
             });
         }
 
         res.json({
             ok: true,
             usuario: userDeleted
         });
    })
})

module.exports = app;