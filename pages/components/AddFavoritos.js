import {changeImage} from "./product";

const addFavoritos = (item, setImage) => {
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
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("favoritos")
        if(favList.includes(JSON.stringify(item))){
          let pos = favList.indexOf(JSON.stringify(item))
          favList.splice(pos,1)
        }else{
          favList.push(JSON.stringify(item))
        }
        window.localStorage.setItem("favoritos",JSON.stringify(favList))
      }
    }
    export default addFavoritos