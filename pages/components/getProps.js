async function getProps() {
    const res = await fetch(`https://kavehome.com/nfeeds/es/es/templatebuilder/20211212`)
    const data = await res.json()
    return {
      props:{
        data,
      }
    }
  }
  export default getProps