const express = require("express")
const server  = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o usdo do ree.body na aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminho da aplicação
//pagina inicial
//req: Requisição
//res: Resposta 
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um titulo"})
})
server.get("/create-point", (req, res) => {
         //req.query: Query $strings da URL
       //console.table(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do fromulário
    //console.log(req.body)
    //inserir dados no banco de dados
    
    //2 Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [ 
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

  function afterInsertData(err) { //vai executar a função: depois que inserir os daods ele vai verificar se deu certo ou deu erro
    if(err) {
        console.log(err)
        return res.send("Erro no cadastro")
    }
     console.log("Cadastrado com sucesso")
     console.log(this)
     return res.render("create-point.html", {saved: true})
  }

      db.run(query, values, afterInsertData)

})









server.get("/search", (req, res) => {
   
   const search = req.query.search 
   if(search == "") {
       //pesquisa vazia
       
       return res.render("search-results.html", {total: 0})
   }

      //pegar os dados do banco de dados
           // o  where city like, vai fazer a busca no banco e retornar qual incio ou fim da cidade, 
           //por ex: se eu digitar Ua, e no banco tiver uaua, ele vai me retornar Uauá, QUE FODDAAAAAAA
      db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
          const total  = rows.length //vai contar quandos elementos tem no array
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})
    })
})
//ligar o servidor
server.listen(3000)