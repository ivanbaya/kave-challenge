import React from 'react';
import Product from './product';
import { GetStaticProps } from 'next'

function Items(min,max, {data}){

  return (
    <ul className="center-div">
      { data.map((item, index)=> {
          if(index >= min && index <= max) {
            return(
              <Product key={item.productSku} item={item}/>
            )
          }
        })}
    </ul>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://kavehome.com/nfeeds/es/es/templatebuilder/20211212`)
  const data = await res.json()

  return {
    props: {
      data,
    }
  }
}

export default Items