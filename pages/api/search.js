import Data from "../../public/productos/productos.json"

var listaProductos = cogerLista()

function cogerLista(){
  let values = []
  Data.map((item) =>{
    values.push(item)
    })
  return values
}

export default (req, res) => {
    let results = listaProductos
    req.query.q.toLowerCase().split(" ").map(paraula=> {
      results = results.filter(producto => producto.productName.toLowerCase().includes(paraula))
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({results}))
}