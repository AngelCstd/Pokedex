let tiposImg = new Map([
    ["normal", "https://images.wikidexcdn.net/mwuploads/wikidex/3/32/latest/20170114100442/Tipo_normal.gif"],
    ["fighting", "https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20170114100336/Tipo_lucha.gif"],
    ["flying", "https://images.wikidexcdn.net/mwuploads/wikidex/e/e1/latest/20191118232224/Tipo_volador.gif"],
    ["poison", "https://images.wikidexcdn.net/mwuploads/wikidex/1/10/latest/20191118232220/Tipo_veneno.gif"],
    ["ground", "https://images.wikidexcdn.net/mwuploads/wikidex/1/1d/latest/20191118232216/Tipo_tierra.gif"],
    ["rock", "https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20170114100446/Tipo_roca.gif"],
    ["bug", "https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20191118232226/Tipo_bicho.gif"],
    ["ghost", "https://images.wikidexcdn.net/mwuploads/wikidex/4/47/latest/20170114100329/Tipo_fantasma.gif"],
    ["steel", "https://images.wikidexcdn.net/mwuploads/wikidex/d/d9/latest/20191118232245/Tipo_acero.gif"],
    ["fire", "https://images.wikidexcdn.net/mwuploads/wikidex/c/ce/latest/20170114100331/Tipo_fuego.gif"],
    ["water", "https://images.wikidexcdn.net/mwuploads/wikidex/9/94/latest/20191118232235/Tipo_agua.gif"],
    ["grass", "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20170114100444/Tipo_planta.gif"],
    ["electric", "https://images.wikidexcdn.net/mwuploads/wikidex/1/1b/latest/20170114100155/Tipo_el%C3%A9ctrico.gif"],
    ["psychic", "https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20170114100445/Tipo_ps%C3%ADquico.gif"],
    ["ice", "https://images.wikidexcdn.net/mwuploads/wikidex/4/40/latest/20170114100333/Tipo_hielo.gif"],
    ["dragon", "https://images.wikidexcdn.net/mwuploads/wikidex/0/01/latest/20170114100154/Tipo_drag%C3%B3n.gif"],
    ["dark", "https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20191118232327/Tipo_siniestro.gif"],
    ["fairy", "https://images.wikidexcdn.net/mwuploads/wikidex/b/bc/latest/20170114100332/Tipo_hada.gif"]
]);

document.getElementById("botonBuscar").addEventListener("click",()=>{
    let pokeAbrir = document.getElementById("check");
    const pokeInfo = document.getElementById("main");
    
    if (pokeInfo.style.display == 'grid') {
        pokeAbrir.click();
        setTimeout(() => pokeAbrir.click(), 1000);
        pokeInfo.style.display = 'none';
        setTimeout(() => pokeInfo.style.display = 'grid', 1200);
    } else {
        pokeAbrir.click();
        setTimeout(() => pokeInfo.style.display = 'grid', 500);
    };
    
    buscarPokemon();
});

async function buscarPokemon() {
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
        let dataEvolucion = await fetch(data.species.url).then((res) => {
            if (res.status != "200") {
                console.log(res)
            } else {
                return res.json();
            }
        });

        await pokeEvolution(dataEvolucion.evolves_from_species);

        await pokeImg(data.sprites.other.home.front_default);

        await pokeTipo(data.types);

        pokeId(data.id, data.name);

        pokeAbilities(data.abilities);
    };
};

function pokeImg(url) {
    let pokemonImagen = document.getElementById("imagenPokemon");
    pokemonImagen.src = url;
};

function pokeId(id, name) {
    let pokeId = document.getElementById("id__pokemon");
    pokeId.innerHTML = "#" + id + " " + name[0].toUpperCase() + name.substring(1)
};

function pokeAbilities(abilities) {
    let pokeAbility = document.getElementById("abilities__pokemon")
    let abilitiesPokemon = "";
    abilities.forEach((elm) => abilitiesPokemon += elm.ability.name + " ");
    pokeAbility.innerHTML = "Habilidades: <br>" + abilitiesPokemon;
};

function pokeTipo(types) {
    let imgType = [type1 = document.getElementById("tipo1"), type2 = document.getElementById("tipo2")]
    imgType[1].removeAttribute("src");
    types.forEach((elm, index) => imgType[index].src = tiposImg.get(elm.type.name))
}

function pokeEvolution(evolucion) {
    let evolucionInfo = document.getElementById("evolucion__pokemon");
    if (!evolucion == null) evolucionInfo.innerHTML = "Este pokemon es la evolucion de " + evolucion.name;
    if (evolucion == null) evolucionInfo.innerHTML = "Este pokemon no tiene anteevolucion";
}