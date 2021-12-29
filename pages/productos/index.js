import React from "react";
import dynamic from "next/dynamic";
import Data from "../../public/productos/productos.json";

const ListaProductos = dynamic(() => import("../components/listaProductos"));
const tipo = "Productos"
const countProductes = Data.map(item => item.display).length-1;

export default function Productos() {
    return (
      <>
        <ListaProductos countProductes={countProductes} Tipo={tipo}></ListaProductos>
      </>
    )
  }