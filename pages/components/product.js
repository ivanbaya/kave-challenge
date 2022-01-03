import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import checkFavorito from "./CheckFavorites";
import addFavoritos from "./AddFavoritos";

export default function Product ({item}) {
    const [image, setImage] = useState(checkFavorito(item))
    function changeImage(item){
      addFavoritos(item)
      setImage(checkFavorito(item))
    }
    return (
        <li className="producto">
              <Link href={"/productos/"+item.productSku}><a><Image src={item.productImageUrl ? item.productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={item.productName} width={450} height={300} objectFit='contain'></Image></a></Link>
              <div className="topright">
                <Image id={item} src={image} onClick={() => changeImage(item)} alt="Favorito" width={25} height={25} objectFit='contain' ></Image>
              </div>
              <h1>{item.productCollection}</h1>
              <p>{item.productPrice}€</p>
        </li>
    )
}
