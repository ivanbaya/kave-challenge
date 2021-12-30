import Image from 'next/image'
import Link from 'next/link'
import React from "react";
import Search from './searchBar';

export default function Header() {
  return (
        <header>
          <div className="header">
            <div className="logotipo">
            <Link href="/"><a><Image src="/icon.svg" alt="Vercel Logo" width={161} height={30}/></a></Link>
           </div>
           <div className="favorito">
           <Link href="/favoritos"><a><Image src="/corazon.svg" alt="Search icon" width={25} height={25} objectFit='contain'></Image></a></Link>
            </div>
            <div className="linea2"><hr></hr></div>
            <Search/>
            <div className="linea1"><hr></hr></div>
          </div>
        </header>
  )
}
