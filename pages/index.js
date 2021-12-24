import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./components/header"));

export default function Home() {
  return (
    <>
      <Head>
        <title>KaveHome.com - Muebles y decoración | Kave Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header/>
          <div class="image-container">
            <img src="/portada_pc.svg" alt="Portada" width="100%" height="100%"/>
            <div class="bottomleft">
              <p>Cuando la realidad supera la ficción.<br/>Trucos para estar en casa.</p>
              </div>
          </div>
            <div class="center-div">
              <h2>Inspírate</h2>
            </div>
            <ul>
              <li><Link href=""><a>Estancias</a></Link>
              </li>
              <li><Link href=""><a>Proyectos</a></Link>
              </li>
              <li><Link href=""><a>Euebles</a></Link>
              </li>
              <li><Link href=""><a>Decoración</a></Link>
              </li>
              <li><Link href=""><a>We are Kave</a></Link>
              </li>
              <li><Link href=""><a>Estil</a></Link>
              </li>
            </ul>
      </main>
      <footer>
      </footer>
    </>
  )
}
