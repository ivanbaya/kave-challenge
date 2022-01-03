import React from 'react';
import Product from './product';

function Items({data}){

  return (
    <ul className="center-div">
      { data.map((item)=> {
            return(
              <Product key={item.productSku} item={item}/>
            )
        })}
    </ul>
  )
}

export default Items