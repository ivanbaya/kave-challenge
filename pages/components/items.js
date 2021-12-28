import React from 'react';
import Data from "../../public/productos/productos.json";
import Image from 'next/image'
import Link from 'next/link'

export default function Items(min,max){
  return (
    <div>
        { Data.map((item, index)=> {
          if(index >= min.min && index <= min.max) {
          return(
            <div key={item.productSku} data-test={item.productSku} class="producto">
              <Link href=""><a><Image src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={item.productName} width={450} height={300} objectFit='contain'></Image></a></Link>
              <div class="topright">
                <Link href=""><Image src={checkFavorito(item.productSku)} onClick={() => Favoritos(item.productSku)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image></Link>
              </div>
              <h1>{item.productCollection}</h1>
              <p>{item.productPrice}€</p>
            </div>
          )
          }
        })}
    </div>
  )
}
function Favoritos(id){
  if (typeof window !== "undefined") {
    if(window.localStorage.getItem(id) == "Favorito"){
      console.log("Remove");
      window.localStorage.removeItem(id);
    }else{
      console.log("Set");
      window.localStorage.setItem(id,"Favorito");
    }
  }
}
function checkFavorito(id){
  if (typeof window !== 'undefined') {
    if(window.localStorage.getItem(id) !== null){
      return "/corazon-favorito.svg"
    }else{
      return "/corazon.svg"; 
    }
  }
  return "/corazon.svg"; 
}
