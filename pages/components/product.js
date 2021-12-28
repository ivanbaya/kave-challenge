import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Product ({item}) {
    const [image, setImage] = useState(checkFavorito(item))
    
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
        <div key={item.productSku} class="producto">
              <Link href=""><a><Image src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={item.productName} width={450} height={300} objectFit='contain'></Image></a></Link>
              <div class="topright">
                <Image id={item} src={image} onClick={() => addFavoritos(item)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image>
              </div>
              <h1>{item.productCollection}</h1>
              <p>{item.productPrice}€</p>
            </div>
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