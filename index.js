const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use(jsonServer.bodyParser);

//Requiere authorization
server.use((req, res, next) => {
    if (isAuthorized(req)) {
      next();
    } else {
      res.sendStatus(401);
    }
});

server.post('/login', (req, res) => {
    // console.log(req.body);
    return res.json({token: "abcd1234"});
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});

function isAuthorized(req){
    if(req.originalUrl === "/login") return true;
    if(req.header("authorization") === "abcd1234") return true;
    return false;
}