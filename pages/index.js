import Head from 'next/head'
import Link from 'next/link'
import React from "react"
import dynamic from "next/dynamic"
import { useMediaQuery } from 'react-responsive'
import getProps from './components/getProps'

const Header = dynamic(() => import("./components/header"))
const Items = dynamic(() => import("./components/items"))

export async function getStaticProps() {
  const data = await (await getProps()).props.data
  return {
    props:{
      data,
    }
  }
}

const categorias = ['Estancias', 'Proyectos', 'Muebles', 'Decoración', 'We are Kave', 'Estil']

let numProductos = 8

export default function Home({data}) {
  const countProductes = data.results.map(item => item.display).length-1
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
  if (isMobile){
    numProductos = 5
  }else{
    numProductos = 8
  }
  const randomNum = Math.floor(Math.random() * countProductes-numProductos) + 0

  return (
    <>
      <Head>
        <title>KaveHome.com - Muebles y decoración | Kave Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header/>
      <main>
    
        <div className="image-container">
          <img src="/portada_pc.svg" alt="Portada" width="100%" height="100%"/>
          <div className="bottomleft">
            <p>Cuando la realidad supera la ficción.<br/>Trucos para estar en casa.</p>
          </div>
        </div>
        <div className="center-div">
          <div>
            <h2>Inspírate</h2>
          </div>
          <ul className="categorias">
            {categorias.map((categoria, index) => (
              <li key={index}><Link href="/"><a>{categoria}</a></Link></li>
            ))}
          </ul>
          </div>
          <ul className='listItems'>
            {categorias.map((categoria, index) => (
              <li key={index}>
                <img src="/Rectangle.png" alt={categoria} width={230} height={180}></img>
                <Link href="/"><a><p>{categoria}</p></a></Link>
              </li>
            ))}
          </ul>
        <div className="center-div">
          <Items data={data.results.slice(randomNum, randomNum+numProductos+1)}/>
        </div>
      </main>

      <footer>
        <div className="ver-productos">
          <Link href="/productos"><a>VER TODOS LOS PRODUCTOS</a></Link>
        </div>
      </footer>
    </>
  )
}
