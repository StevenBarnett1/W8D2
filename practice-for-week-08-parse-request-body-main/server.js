const http = require("http")


let server = http.createServer((req,res)=> {
    let body = ""
    let obj = {}
    req.on("data",data=> {
        body+=data
    })

    req.on("end", ()=> {
    console.log(body)
    body = body.split("&")
    for(kv of body){
        kv = kv.split("=")
        kv[0] = decodeURIComponent(kv[0])
        kv[1] = kv[1].replace("+"," ")
        decodeURIComponent(kv[1])
        obj[kv[0]] = kv[1]
    }
    console.log(obj)
    if(req.method === "GET" && req.url === "/users"){
        res.setHeader("Content-Type","text/html")
        res.statusCode = 200;
        res.end("Hello World")
    }
    usersController.getUsers(){
    }
    if(req.method === "GET" && req.url === "/about"){
        res.setHeader("Content-Type","text/html")
        res.statusCode = 200;
        res.end("About Page")
    }
})
})

const port = 3000;

server.listen(port,()=> {
    console.log(`port is up at ${port}`)
})
