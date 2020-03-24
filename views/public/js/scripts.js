/* 
    * Constante API
*/
const HOST = "https://swapi.co/api";

/*
    * Creación de clase con metodos
*/
class Request {
    getJSON(url){
        return new Promise(function(resolve, reject) {
            fetch(HOST + url, {
                method: "GET",
                redirect: 'follow'
            }).then(function(response) {
                response.json().then(function(res) {
                    resolve(res);
                }).catch(function(res) {
                    reject(res);
                });
            });
        });

    }
}

/*   
    * LLamada a la clase y se pone como variable para su uso
 */
let d = new Request();

/* 
    * Llama al metodo para consultar los datos.
    * Una vez se retornan, se realiza un for para obtener cada dato que se quiere.
 */
d.getJSON("/films").then((data)=>{
    for (let index = 0; index < data.results.length; index++) {
        const element = data.results[index];
        let title = element.title;
        let opening_crawl = element.opening_crawl
        let episode_id = element.episode_id
        let film = index+1
        let director = element.director
        let producer = element.producer
        paintFilms(title,episode_id,director,producer,film);
    }
});

/* 
    * Funcion para mostrar los elementos films en card
 */
const paintFilms = (title,episode_id,director,producer, film) => {
    let template = `
    <div class="card">
    <div class="content">
            <h2 class="title">${title}</h2>
            <p class="copy">Episide: ${episode_id}</p>
            <p class="copy">Director: ${director}</p>
            <p class="copy">Producer: ${producer}</p>
            <button class="btn" onClick="filmDetails('${film}')">View More</button></div>
    </div>
   `
    let sectionFilms = document.getElementById("films");
    sectionFilms.innerHTML += template;
};

function filmDetails(film_id){
    loader()
    d.getJSON("/films/"+film_id).then(async(dataFilm)=>{
        let arr = [dataFilm.characters, dataFilm.planets, dataFilm.starships, dataFilm.vehicles, dataFilm.species];
        let names = ["characters", "planets", "starships", "vehicles", "species"];
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            dataFilm[names[i]] = []
            for (let ind = 0; ind < element.length; ind++) {
                const newElement = element[ind];
                let NE = newElement.split('/api')[1];
                let subData = await d.getJSON(NE)
                obj = subData
                dataFilm[names[i]].push(obj);
            }
        }
        if(dataFilm){
            elementsByFilms(dataFilm)
        }
    });
}

/* 
    * Funcion para mostrar los elementos films en card
 */
const elementsByFilms = (dataFilm) => {

    let dataForCharacters = "";
    for (let i = 0; i < dataFilm.characters.length; i++) {
        const element = dataFilm.characters[i];
        dataForCharacters += `
            <div class="dataCharacters">
                <div>Name: ${element.name}</div>
                <div>Gender: ${element.gender}</div>
                <div>Hair color: ${element.hair_color}</div>
                <div>Skin color: ${element.skin_color}</div>
                <div>Eye color: ${element.eye_color}</div>
                <div>Height: ${element.height}</div>
                <div>Homeworld: ${element.homeworld}</div>
                <div>Species: ${element.species}</div>
            </div>
        `
    }

    let characters = `
        <h2 class="">Characters</h2>
        <div class="characters">
            ${dataForCharacters}
        </div>
    `

    let dataForPlanets = "";
    for (let i = 0; i < dataFilm.planets.length; i++) {
        const element = dataFilm.planets[i];
        dataForPlanets += `
            <div class="dataCharacters">
                <div>Name: ${element.name}</div>
                <div>Terrain: ${element.terrain}</div>
                <div>Gravity: ${element.gravity}</div>
                <div>Diameter: ${element.diameter}</div>
                <div>Population: ${element.population}</div>
            </div>
        `
    }

    let planets = `
        <h2 class="">Planets</h2>
        <div class="characters">
            ${dataForPlanets}
        </div>
    `

    let dataForStarships = "";
    for (let i = 0; i < dataFilm.starships.length; i++) {
        const element = dataFilm.starships[i];
        dataForStarships += `
            <div class="dataCharacters">
                <div>Name: ${element.name}</div>
                <div>Diameter: ${element.model}</div>
                <div>Climate: ${element.manufacturer}</div>
                <div>Gravity: ${element.passengers}</div>
            </div>
        `
    }

    let starships = `
        <h2 class="">Starships</h2>
        <div class="characters">
            ${dataForStarships}
        </div>
    `

    let dataForVehicles = "";
    for (let i = 0; i < dataFilm.vehicles.length; i++) {
        const element = dataFilm.vehicles[i];
        dataForVehicles += `
            <div class="dataCharacters">
                <div>Name: ${element.name}</div>
                <div>Diameter: ${element.model}</div>
                <div>Climate: ${element.manufacturer}</div>
                <div>Gravity: ${element.passengers}</div>
            </div>
        `
    }

    let vehicles = `
        <h2 class="">Vehicles</h2>
        <div class="characters">
            ${dataForVehicles}
        </div>
    `

    let dataForSpecies = "";
    for (let i = 0; i < dataFilm.species.length; i++) {
        const element = dataFilm.species[i];
        dataForSpecies += `
            <div class="dataCharacters">
                <div>Name: ${element.name}</div>
                <div>Classification: ${element.classification}</div>
                <div>Average height: ${element.average_height}</div>
                <div>Designation: ${element.designation}</div>
                <div>Language: ${element.language}</div>
            </div>
        `
    }

    let species = `
        <h2 class="">species</h2>
        <div class="characters">
            ${dataForSpecies}
        </div>
    `

    let template = `
    <div class="filmDetails">
            <button class="btn" onClick="location.reload();">Back</button>
            <h2 class="">${dataFilm.title}</h2>
            <div class="film-content">
                <img class="image_cap" src=${"/img/films/"+dataFilm.title.replace(/\s/g, '')+".jpg"} alt="Card image cap">
                <div class="film-content-row">
                    <div>
                        <p class="opening_crawl">${dataFilm.opening_crawl}</p>
                    </div>
                    <div style="padding-top:20px">
                        <p class="copy">Episide: ${dataFilm.episode_id}</p>
                        <p class="copy">Director: ${dataFilm.director}</p>
                        <p class="copy">Producer: ${dataFilm.producer}</p>
                    </div>
                </div>
            </div>
            <p><p/>
            ${characters}
            ${planets}
            ${starships}
            ${vehicles}
            ${species}
    </div>
   `
    let sectionFilms = document.getElementById("films");
    sectionFilms.classList.remove("page-content");
    sectionFilms.classList.add("page-content-descFilm");
    sectionFilms.innerHTML = template;

}

/* 
    * Loader
*/

function loader() {
    var loader =`
        <div class="centered">
            <span style="color:#fff">Cargando datos ...</span>
            <div class="loader loader-17">
                <div class="css-square square1"></div>
                <div class="css-square square2"></div>
                <div class="css-square square3"></div>
                <div class="css-square square4"></div>
                <div class="css-square square5"></div>
                <div class="css-square square6"></div>
                <div class="css-square square7"></div>
                <div class="css-square square8"></div>
            </div>
        </div>
    `
    let sectionFilms = document.getElementById("films");
    sectionFilms.classList.remove("page-content");
    sectionFilms.innerHTML = loader;
}
