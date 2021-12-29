import React from 'react';
import Product from './product';
import dynamic from "next/dynamic";

export default function Items(min,max){

  var listaFavoritos = cogerListaFavoritos();

  function cogerListaFavoritos(){
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
        <div class="center-div">
        { listaFavoritos.map((item, index)=> {
          if(index >= min.min && index <= min.max) {
            return(
              <Product key={item.productSku} item={item}/>
            )
          }
        })}
    </div>
  )
}
