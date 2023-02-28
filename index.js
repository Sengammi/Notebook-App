const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;



app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// })
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))
app.use(express.static(__dirname + '/client/src/'))

app.get('/', (req, res) =>{
    res.send('asdasd')
})

const start = (async () => {
    try{
        await mongoose.connect('mongodb+srv://Sengammi:mongogfd543@cluster0.inm0zyn.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await app.listen(PORT, () => {
          console.log(`Server listening on link https://localhost:${PORT}/`);
        })
    }catch (err) {
        console.error(err);
    }

})
start().then(r => r);
