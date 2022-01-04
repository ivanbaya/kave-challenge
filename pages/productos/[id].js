import Image from 'next/image'
import Head from 'next/head'
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useState } from "react";
import checkFavorito from "../components/CheckFavorites";
import addFavoritos from "../components/AddFavoritos";
import getProps from '../components/getProps';


const Header = dynamic(() => import("../components/header"));

export async function getStaticProps() {
  const data = await (await getProps()).props.data
  return {
    props:{
      data,
    }
  }
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'YG0032R53' } },
    ],
    fallback: true,
  }
}

export default function ProductoMuestra({ ruta, href, data}) {
  let { asPath } = useRouter()
  let productos = listaProductos()
  asPath = asPath.substring(11)
  let item;
  productos.map((i) =>{
    if(i.productSku == asPath){
      item = i;
    }
  })
  const [image, setImage] = useState(checkFavorito(item))

  function listaProductos(){
    let values = []
        data?.results.map((item) =>{
          values.push(item)
        })
    return values;
  }
  function changeImage(item){
    addFavoritos(item)
    setImage(checkFavorito(item))
  }
  return (
    <>    
    <Head>
        <title>Producto | Kave Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
    </Head>
    <Header></Header>
    { productos.map((item)=> {
      if(item.productSku == asPath) {
        return(
          <div key={item.productSku}>
            <div className="product-info-image">
              <img src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={item.productName} width="100%" height="100%"/>
              <div className="topright">
                <Image src={image} onClick={() => changeImage(item)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image>
              </div>
            </div>
            <div className="product-info">
              <h1>{item.productCollection ? item.productCollection : item.productName}</h1>
              <h3>{item.productCategoryHierarchy}</h3>
              <h2>{item.productPrice}€</h2>
              <p>{item.productName}</p>
            </div>
          </div>
        )
      }
    })}
  </>
)
}