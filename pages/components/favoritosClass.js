
let favList = []
favList = cogerListaFavoritos()

class Fav extends Component {

  addFavoritos(item){
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("favoritos")
        if(favList.includes(JSON.stringify(item))){
          let pos = favList.indexOf(JSON.stringify(item))
          favList.splice(pos,1)
        }else{
          favList.push(JSON.stringify(item))
        }
        window.localStorage.setItem("favoritos",JSON.stringify(favList))
        setImage(checkFavorito(item))
      }
  }

  checkFavorito(item){
    if(favList.includes(JSON.stringify(item))){
        return "/corazon-favorito.svg"
    }else{
        return "/corazon.svg"; 
    }
  }

  cogerListaFavoritos(){
    var valuesJson = []
    if (typeof window !== 'undefined') {
      if(JSON.parse(window.localStorage.getItem("favoritos"))){
          valuesJson = JSON.parse(window.localStorage.getItem("favoritos"))
      }
    }
    return valuesJson
  }
}