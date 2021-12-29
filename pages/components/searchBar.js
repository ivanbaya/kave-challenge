import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import Collapsible from "react-collapsible-paragraph";

export default function  Search() {

    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query) => `/api/search?q=${query}`

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if(query.length){
            fetch(searchEndpoint(query))
            .then(res => res.json())
            .then(res => {
                setResults(res.results)
            })
        }else{
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if(searchRef.current && !searchRef.current.contains(event.target)){
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div class="search-bar" ref={searchRef}>
            <form action="/action_page.php">
                <div class="search-icon">
                    <Image src="/search.svg" alt="Search icon" width={20} height={20} objectFit='contain'></Image>
                </div>
                <input type="text" placeholder="Buscar productos" onChange={onChange} onFocus={onFocus} value={query}></input>
                { active && results.length > 0 && (
                    <ul class="search-productos">
                        {results.slice(0,8).map(({productSku, productName, productImageUrl}) => (
                            <li key={productSku} style={{ lineHeight: "24px" }}>
                                <Image src={productImageUrl ? productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={productName} width={60} height={75}></Image>
                                <Link href="/productos/[id]" as={`/productos/${productSku}`}>
                                    <a>{productName}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
        
    )
}