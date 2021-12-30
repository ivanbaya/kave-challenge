import React from 'react';
import Data from "../../public/productos/productos.json";
import Product from './product';

export default function Items(min,max){

  return (
    <ul className="center-div">
        { Data.map((item, index)=> {
          if(index >= min.min && index <= min.max) {
            return(
              <Product key={item.productSku} item={item}/>
            )
          }
        })}
    </ul>
  )
}

