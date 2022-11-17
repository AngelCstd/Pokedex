async function buscarPokemon() {

    abrirPokedex();

    mostrarInfo();

    const nombrePokemonInput = document.getElementById("nombrePokemon");
    let nombrePokemon = nombrePokemonInput.value.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon
    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
        } else {
            return res.json();
        }
    });
    if (data) {
        pokeImg(data.sprites.other.home.front_default);

    };
}

function abrirPokedex() {
    const pokeAbrir = document.getElementById("check");
    if (pokeAbrir.checked == true) {
        pokeAbrir.click();
        setTimeout(() => pokeAbrir.click(), 1000);
    }else{
        pokeAbrir.click();
    }
}

function mostrarInfo() {
    let pokeInfo = document.getElementById("main");
    if (pokeInfo.style.display == 'grid') {
        pokeInfo.style.display = 'none';
        setTimeout(() => pokeInfo.style.display = 'grid', 1000);
    }else{
        setTimeout(() => pokeInfo.style.display = 'grid', 500);
    }
}

function pokeImg(url) {
    const pokemonImagen = document.getElementById("imagenPokemon");
    pokemonImagen.src = url;
}

function pokeId(id, name) {

    
}

document.getElementById("botonBuscar").onclick = () => buscarPokemon();