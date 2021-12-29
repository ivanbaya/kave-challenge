import Image from 'next/image'
import Link from 'next/link'
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Data from "../../public/productos/productos.json";
import { useState } from "react";

const Header = dynamic(() => import("../components/header"));
const fav = dynamic(() => import("../components/favoritosClass").then((add => add.addFavoritos)));

export default function ProductoMuestra({ ruta, href }) {
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
        Data.map((item) =>{
          values.push(item)
        })
    return values;
  }
    
    function addFavoritos(item){
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("favoritos")
      if(favList.includes(JSON.stringify(item))){
        let pos = favList.indexOf(JSON.stringify(item))
        favList.splice(pos,1)
      }else{
        favList.push(JSON.stringify(item))
      }
        window.localStorage.setItem("favoritos",JSON.stringify(favList))
      setImage(checkFavorito(item))
    }
  }
  return (
    <>    
    <Header></Header>
    <div>
    { productos.map((item)=> {
      if(item.productSku == asPath) {
        return(
          <div key={item.productSku}>
            <div class="image-container">
              <img src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt="Portada" width="100%" height="100%"/>
              <div class="topright">
                <Image src={image} onClick={() => addFavoritos(item)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image>
              </div>
            </div>
            <div>
              <h1>{item.productCollection}</h1>
            </div>
          </div>
        )
      }
    })}
    </div>
  </>
)
}
let favList = []
favList = cogerListaFavoritos()

function checkFavorito(item){
  if(favList.includes(JSON.stringify(item))){
      return "/corazon-favorito.svg"
  }else{
      return "/corazon.svg"; 
  }
}

function cogerListaFavoritos(){
  var valuesJson = []
  if (typeof window !== 'undefined') {
    if(JSON.parse(window.localStorage.getItem("favoritos"))){
        valuesJson = JSON.parse(window.localStorage.getItem("favoritos"))
    }
  }
  return valuesJson
}