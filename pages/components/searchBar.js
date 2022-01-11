import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'

export default function  Search() {

    const searchRef = useRef(null)
    const [searchBarClass, setSearchBarClass] = useState('search-bar')
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

    const onSumbit = useCallback(() => {
        setQuery("")
        setActive(false)
        setSearchBarClass('search-bar')
    })

    const onFocus = useCallback(() => {
        setActive(true)
        setSearchBarClass('search-bar-bigger')
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if(searchRef.current && !searchRef.current.contains(event.target)){
            setActive(false)
            setSearchBarClass('search-bar')
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div className={ active && results.length > 0 ? "search-div-border" : "search-div"} ref={searchRef}>
            <div className={searchBarClass}>
            <form action="/action_page.php">
                <div className="search-icon">
                    <Image src="/search.svg" alt="Search icon" width={20} height={20} objectFit='contain'></Image>
                </div>
                <input type="text" placeholder="Buscar productos" onChange={onChange} onFocus={onFocus}  value={query}></input>
            </form>
            </div>
            { active && results.length > 0 && (
                    <ul className="search-productos">
                        {results.slice(0,8).map(({productSku, productName, productImageUrl}) => (
                            <li key={productSku} style={{ lineHeight: "24px" }}>
                                <Image src={productImageUrl ? productImageUrl : "https://media.kavehome.com/media/catalog/product/E/A/EA344M01V01.jpg.jpeg"} alt={productName} width={60} height={75}></Image>
                                <Link href="/productos/[id]" as={`/productos/${productSku}`}>
                                    <a onClick={onSumbit}>{productName}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
        
    )
}