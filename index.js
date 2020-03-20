/* const https = require("https");
const HOST = "https://swapi.co/api";


https.get(HOST+'/films', res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.stringify(body);
    console.log(body);
  });
}); */


class Request {
    getJSON(url){
        console.log(url)
    }
}
  
// let d = new Request();

// d.getJSON("/films");

const https = require('https')
const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()