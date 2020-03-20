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
        let director = element.director
        let producer = element.producer
        paintFilms(title,episode_id,director,producer);
    }
});
/* 
    * Funcion para mostrar los elementos films en card
 */
const paintFilms = (title,episode_id,director,producer) => {
    let template = `
    <div class="card">
    <div class="content">
            <h2 class="title">${title}</h2>
            <p class="copy">Episide: ${episode_id}</p>
            <p class="copy">Director: ${director}</p>
            <p class="copy">Producer: ${producer}</p>
            <button class="btn">View More</button></div>
    </div>
   `
    let sectionFilms = document.getElementById("films");
    sectionFilms.innerHTML += template;
};