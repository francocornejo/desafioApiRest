const { Router } = require('express')
const router = Router()
const productos = [{ id: 1, title: 'mouse', price: 200, thumbnail:'foto'},
    { id: 2, title: 'teclado', price: 150, thumbnail:'foto'}]

    //Devuelve los productos que existan
router.get('/api/productos', (req, res) =>{
    res.json(productos)
})

//Devuelve un producto filtrado por ID
router.get('/api/productos/:id', (req, res) =>{
    const params = req.params.id
    const productoFiltrado = productos.find(item => item.id == params)
    res.json(productoFiltrado)
})

//Creamos un nuevo producto
router.post('/api/productos', (req, res) =>{
    const { title, price, thumbnail } = req.body
    const id = productos.length + 1
    productos.push({id, title, price, thumbnail })
    res.json(productos)
})

//Eliminamos un producto
router.delete('/api/productos/:id', (req, res) =>{
    const param = req.params.id
    const nuevoProd = productos.findIndex(({id}) => id === param)
    if(param > 0 && param <= productos.length){
        productos.splice(nuevoProd, 1)
        res.sendStatus(201).json(productos)  
    }else{
        res.sendStatus(400).json('Error debe ingresar un ID que contenga un producto')
    }
})

//Modificamos un producto
router.put('/api/productos/:id', (req, res) => {
    const param = Number(req.params.id);
    const itemId = productos.find(item => item.id === param)

    if(isNaN(param)){
        res.status(400).json('Error, el id debe ser un numero')
    }else{
        const { title, price, thumbnail } = req.body
        productos.forEach( prod => {
            if(prod.id == param){
                prod.title = title
                prod.price = price
                prod.thumbnail = thumbnail
            }
        })
        res.sendStatus(201).json(productos)
    }
})

module.exports = router
