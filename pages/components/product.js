import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import checkFavorito from "./CheckFavorites";

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
        <li key={item.productSku} className="producto">
              <Link href={"/productos/"+item.productSku}><a><Image src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={item.productName} width={450} height={300} objectFit='contain'></Image></a></Link>
              <div className="topright">
                <Image id={item} src={image} onClick={() => addFavoritos(item)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image>
              </div>
              <h1>{item.productCollection}</h1>
              <p>{item.productPrice}€</p>
        </li>
    )
}


