import React from "react";
import dynamic from "next/dynamic";

const ListaProductos = dynamic(() => import("../components/listaProductos"));
const tipo = "Lista de Favoritos"
const countProductes = 20;
if (typeof window !== "undefined") {
    countProductes = cogerListaFavoritos().length
}

export default function Productos() {
    return (
      <>
        <ListaProductos countProductes={countProductes} Tipo={tipo}></ListaProductos>
      </>
    )
  }

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