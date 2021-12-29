import Image from 'next/image'
import Link from 'next/link'
import React from "react";
import Search from './searchBar';

export default function Header() {
  return (
        <header>
          <div class="header">
            <div class="logotipo">
            <Link href="/"><a><Image src="/icon.svg" alt="Vercel Logo" width={161} height={30}/></a></Link>
           </div>
           <div class="favorito">
           <Link href="/favoritos"><a><Image src="/corazon.svg" alt="Search icon" width={25} height={25} objectFit='contain'></Image></a></Link>
            </div>
            <div class="linea2"><hr></hr></div>
            <Search/>
            <div class="linea1"><hr></hr></div>
          </div>
        </header>
  )
}
