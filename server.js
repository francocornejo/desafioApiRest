const express = require('express')
const app = express()
const puerto = 8080
const rutas = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/agregarProducto', express.static('public'))
app.use('/', rutas)

app.listen(puerto, (err) => {
    if(err){
        console.log('Hubo un error')
    }else{
        console.log(`Escuchando el puerto: ${puerto}`)
    }
})