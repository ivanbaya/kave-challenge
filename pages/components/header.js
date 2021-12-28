import Image from 'next/image'
import Link from 'next/link'
import React from "react";

export default function Header() {
  return (
        <header>
          <div class="header">
            <div class="logotipo">
            <Link href="/"><a><Image src="/icon.svg" alt="Vercel Logo" width={161} height={30}/></a></Link>
           </div>
           <div class="favorito">
           <Link href="favoritos"><a><Image src="/corazon.svg" alt="Search icon" width={25} height={25} objectFit='contain'></Image></a></Link>
            </div>
            <div class="linea2"><hr></hr></div>
            <div class="search-bar">
              <form action="/action_page.php">
                <div class="search-icon">
                  <Image src="/search.svg" alt="Search icon" width={20} height={20} objectFit='contain'></Image>
                </div>
                <input type="text" placeholder="Buscar productos"></input>
              </form>
            </div>
            <div class="linea1"><hr></hr></div>
          </div>
        </header>
  )
}
