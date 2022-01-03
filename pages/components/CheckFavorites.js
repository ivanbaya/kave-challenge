const checkFavorito = (item) => {
    let favList = []
    favList = cogerListaFavoritos();
    function cogerListaFavoritos() {
        var valuesJson = []
        if (typeof window !== 'undefined') {
          if(JSON.parse(window.localStorage.getItem("favoritos"))){
              valuesJson = JSON.parse(window.localStorage.getItem("favoritos"))
          }
        }
        return valuesJson
    }
    if(favList.includes(JSON.stringify(item))){
        return "/corazon-favorito.svg"
    }else{
        return "/corazon.svg"; 
    }
};
export default checkFavorito;