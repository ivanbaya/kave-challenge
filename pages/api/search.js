import Data from "../../public/productos/productos.json"

var listaProductos = cogerLista();

function cogerLista(){
  let values = []
  Data.map((item) =>{
    values.push(item)
    })
  return values;
}

export default (req, res) => {
    const results = req.query.q ?
        listaProductos.filter(producto => producto.productName.toLowerCase().includes(req.query.q)) : []
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({results}))
}