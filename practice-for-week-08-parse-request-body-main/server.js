const http = require("http")
const { parse } = require("querystring")
const fs = require("fs");


let getType = (path) => {
    let extension = path.split(".")[1]
    if(extension === "jpg" || extension === "jpeg")return "img/jpeg"
    else if(extension === "html")return "text/html"
    else if(extension === "css")return "text/css"
    else return "text/plain"
}
let server = http.createServer((req,res)=> {
    let body = ""
    let obj = {}
    req.on("data",data=> {
        body+=data
    })

    req.on("end", ()=> {
    // console.log(body)
    // body = body.split("&")
    // for(kv of body){
    //     kv = kv.split("=")
    //     kv[0] = decodeURIComponent(kv[0])
    //     kv[1] = kv[1].replace("+"," ")
    //     decodeURIComponent(kv[1])
    //     obj[kv[0]] = kv[1]
    // }
        obj = parse(body)
      console.log(obj,obj.name)
    })

    if(req.method === "GET" && req.url.startsWith("/users/") && req.url.length > 7){
        let parts = req.url.split("/")
        let id = parts[2]
        res.setHeader("Content-Type","text/html")
        res.statusCode = 200;
        res.end(`User ${id}'s Page`)
    }

    if(req.method === "GET" && req.url.startsWith("/static")){
        let path = req.url.split("/static")[1]
        res.setHeader("Content-Type",getType(path))
        res.statusCode = 200;
        try{
            let content = fs.readFileSync(`./assets${path}`)
             console.log("Got here")
             res.end()
        } catch {
            console.log("got there")
            res.end()
        }

    }

})

const port = 3000;

server.listen(port,()=> {
    console.log(`port is up at ${port}`)
})
