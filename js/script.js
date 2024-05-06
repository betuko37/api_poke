const pokemonListElement = document.getElementById("pokemonList");
let selectedPokemon = JSON.parse(localStorage.getItem("selectedPokemon")) || [];

// Función para agregar un Pokémon a la selección
function addPokemon(name, sprite, experience) {
  if (
    selectedPokemon.length < 3 &&
    !selectedPokemon.some((pokemon) => pokemon.name === name)
  ) {
    selectedPokemon.push({ name, sprite, experience });
    localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemon));
    alert(`Pokémon "${name}" agregado a la selección.`);
  } else {
    alert(
      "Ya has seleccionado 3 Pokémon o este Pokémon ya está en la selección."
    );
  }
  console.log(selectedPokemon);
}

// Función para limpiar la selección de Pokémon y el almacenamiento local
function resetSelection() {
  if (selectedPokemon.length === 3) {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    teams.push(selectedPokemon);
    localStorage.setItem("teams", JSON.stringify(teams));
    selectedPokemon = [];
    localStorage.removeItem("selectedPokemon");
    alert("Equipo de Pokémon guardado correctamente en el historial.");
    console.log(selectedPokemon);
  } else {
    alert("Te hacen falta pokemones para acompletar los 3.");
  }
}

// Obtener los primeros 151 Pokémon
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json())
  .then((data) => {
    const pokemonArray = data.results;
    pokemonArray.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          const pokemonElement = document.createElement("div");
          pokemonElement.classList.add("pokemon");
          pokemonElement.innerHTML = `
                        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                        <p>${pokemonData.name}</p>
                        <p>Experiencia: ${pokemonData.base_experience}</p>
                        <button class="btn1" onclick="addPokemon('${pokemonData.name}', '${pokemonData.sprites.front_default}', ${pokemonData.base_experience})">Agregar</button>
                    `;
          pokemonListElement.appendChild(pokemonElement);
        });
    });
  });

// Event listener para el botón de reset
document
  .getElementById("resetButton")
  .addEventListener("click", resetSelection);

//mochila
document.addEventListener("DOMContentLoaded", () => {
  const selectedPokemonContainer = document.getElementById(
    "selectedPokemonContainer"
  );
  let selectedPokemon =
    JSON.parse(localStorage.getItem("selectedPokemon")) || [];

  // Ordenar los Pokémon por experiencia de menor a mayor
  selectedPokemon.sort((a, b) => a.experience - b.experience);

  selectedPokemon.forEach((pokemon) => {
    const sprite = pokemon.sprite;
    const name = pokemon.name;
    const experience = pokemon.experience;

    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("selectedPokemon");
    pokemonElement.innerHTML = `
            <img src="${sprite}" alt="${name}">
            <h5>${name}</h5>
            <p>Experiencia: ${experience}</p>
        `;
    selectedPokemonContainer.appendChild(pokemonElement);
  });
});

//historial
document.addEventListener("DOMContentLoaded", () => {
  const teamsContainer = document.getElementById("teamsContainer");
  let teams = JSON.parse(localStorage.getItem("teams")) || [];

  // Ordenar los equipos por experiencia de menor a mayor
  teams = teams.map((team) => team.sort((a, b) => a.experience - b.experience));

  teams.forEach((team) => {
    const teamElement = document.createElement("div");
    teamElement.classList.add("team");

    team.forEach((pokemon) => {
      const pokemonDiv = document.createElement("div");
      pokemonDiv.classList.add("team-member");
      pokemonDiv.innerHTML = `
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
                <h5>${pokemon.name}</h5>
                <p>Experiencia: ${pokemon.experience}</p>
            `;
      teamElement.appendChild(pokemonDiv);
    });

    teamsContainer.appendChild(teamElement);
  });
});

document.getElementById("borrar").addEventListener("click", clearHistory);

// Borrar todo el historial del localStorage
function clearHistory() {
  localStorage.removeItem("teams");
  alert("Historial borrado correctamente.");
  // Actualizar la página para reflejar los cambios
  window.location.reload();
}
