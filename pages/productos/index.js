import React from "react";
import dynamic from "next/dynamic";
import getProps from '../components/getProps';

export async function getStaticProps() {
  const data = await (await getProps()).props.data
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