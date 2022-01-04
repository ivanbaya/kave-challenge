import React from 'react';
import Product from './product';

export default function Items(min,max){

  var listaFavoritos = cogerListaFavoritos();

  function cogerListaFavoritos(min, max){
    const valuesJson = []
    let values = []
    if (typeof window !== 'undefined') {
      valuesJson = JSON.parse(window.localStorage.getItem("favoritos"))
      if(valuesJson){
        valuesJson.map((item) =>{
          values.push(JSON.parse(item))
        })
      }
    }
    return values;
  }

  return (
        <ul className="productos-div">
        { listaFavoritos.slice(min.min, min.max).map((item)=> {
            return(
              <Product key={item.productSku} item={item}/>
            )
        })}
    </ul>
  )
}
