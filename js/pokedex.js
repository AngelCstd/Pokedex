const buscarPokemon = async () => {
    abrirPokedex();
    const nombrePokemonInput = document.getElementById("nombrePokemon");
    let nombrePokemon = nombrePokemonInput.value;
nombrePokemon = nombrePokemon.toLowerCase();
const url = "https://pokeapi.co/api/v2/pokemon/"+nombrePokemon
let data = await fetch(url).then((res)=>{
    if(res.status != "200"){
        console.log(res);

    }else{
        return res.json();
    }
})
if(data){
    let imagenPokemon = data.sprites.other.home.front_default;
    pokeImg(imagenPokemon)
}
}


function pokeImg(url){
const pokemonImagen = document.getElementById("imagenPokemon");
pokemonImagen.src = url;
}


function abrirPokedex(){
    let abrirPokedex = document.getElementById("check");
    abrirPokedex.click();
}
