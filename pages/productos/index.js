import React from "react";
import dynamic from "next/dynamic";

export async function getStaticProps() {
  const res = await fetch(`https://kavehome.com/nfeeds/es/es/templatebuilder/20211212`)
  const data = await res.json()
  return {
    props:{
      data,
    }
  }
}

const ListaProductos = dynamic(() => import("../components/listaProductos"));

function Productos({data}) {
  const tipo = "Productos"
  const countProductes = data.results.map(item => item.display).length-1;
    return (
      <>
        <ListaProductos countProductes={countProductes} Tipo={tipo} data={data}></ListaProductos>
      </>
    )
  }

  export default Productos