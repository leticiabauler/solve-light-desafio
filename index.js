const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 

//ler json 
app.use(express.urlencoded({ 
    extended: true,
 }), 
 ) 
 
 app.use(express.json()) 

 //rotas da api
const productRoutes = require('./routes/productRoutes')

app.use('/product', productRoutes)
 
 app.get('/', (req, res) => { 
    
//mostrar requisição 
res.json({message: 'Hello!'}) }) 
   
const user = 'leticiabauler'
const senha = 'solvelight123'

mongoose.connect(
    `mongodb+srv://${user}:${senha}@apicluster.1zrcib6.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(3000)
    })

    .catch((err) => console.log(err))

