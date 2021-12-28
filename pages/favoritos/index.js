import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from 'react-responsive';

const Header = dynamic(() => import("../components/header"));
const Items = dynamic(() => import("../components/items-favoritos"));
const countProductes = 20;
if (typeof window !== "undefined") {
    countProductes = window.localStorage.length;
}

let pagina = 0;
let paginas = [];
let numProductos = 11;

Pagina(0);


export default function Productos() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  if (isMobile){
    numProductos = 5;
  }else{
    numProductos = 11;
  }
    return (
      <>
        <Head>
          <title>KaveHome.com - Muebles y decoración | Kave Home</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
  
        <main>
          <Header/>
          <div class="center-div">
            <h2>Lista de Favoritos</h2>
            <h3>Lorem ipsum dolor sit amet</h3>
          </div>
          <Items min={pagina*numProductos} max={pagina*numProductos+numProductos}/>
        </main>
        <footer>
          <Link href={''}><a onClick={()=>Pagina(pagina-1)} class={CheckArrow('left')}>&lsaquo;</a></Link>
          {paginas.map(pages=> (
              <Link href={''}><a onClick={()=>Pagina(pages-1)} class={Check(pages-1)}>{pages}</a></Link>
            ))}
          <Link href={''}><a onClick={()=>Pagina(pagina+1)} class={CheckArrow('right')}>&rsaquo;</a></Link>
        </footer>
      </>
    )
  }

  function Pagina(num) {
    paginas.splice(0,paginas.length);
    let firstNumber = num-3;
    let numeroPaginas = 7;
    if(firstNumber < 1){
      firstNumber = 1;
    }
    if(countProductes > numProductos){
        if(firstNumber > countProductes/numProductos-7){
        firstNumber = Math.round(countProductes/numProductos-7);
        }
    }
    if(countProductes/numProductos < 7){
        numeroPaginas = Math.round(countProductes/numProductos);
    }
    for(var i = firstNumber; i<=firstNumber+numeroPaginas;i++){
      paginas.push(i);
    }
    return pagina = num;
  }

  function Check(num){
    if(num == pagina){
      return 'active';
    }else{
      return '';
    }
  }

  function CheckArrow(direccion){
    if(direccion == 'right'){
      if(pagina>countProductes/numProductos-5){
        return 'invisible'
      }else{
        return '';
      }
    }else if(direccion == 'left'){
      if(pagina<5){
        return 'invisible'
      }else{
        return '';
      }
    }
  }  