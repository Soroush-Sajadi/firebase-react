const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const firebase = require('firebase');
require('dotenv').config();
const { sendMail } = require('./helperFunctions/sendMail')
//const fetch = require('node-fetch');
//__________________________________________________________________________________________________________________________//
// Data Base
const bodyParser = require('body-parser');
const config = {
    apiKey: 'AIzaSyDLmu0djMfie3aJmxygeSFatfxl-9gB_u4',
    authDomain: 'makan-5c9d1.firebaseio.com',
    databaseURL: 'https://makan-5c9d1.firebaseio.com',
    storageBucket: 'makan-5c9d1.appspot.com'
  };
firebase.initializeApp(config);
//______________________________________________________________________________________________________________________________________//
// Helper functions
// const { cathegoriesName } = require('./helperFunctions/cathegoriesName');
// const { wedding } = require('./helperFunctions/wedding');
// const { kids } = require('./helperFunctions/kids');
// const { modeling } = require('./helperFunctions/modeling');
// const { couple } = require('./helperFunctions/couple');
// const { portrait } = require('./helperFunctions/portrait');
//___________________________________________________________________________________________________________________________

//const { uuidv4 } = require('./helper-function/idGenerator')
//require('dotenv').config();

//const pool = require("./DB/index");
//__________________________________________________________________________________________________________________________
// middle ware
// const dirCathegory = path.join(__dirname, '/images/cathegories-images');
// const dirWedding = path.join(__dirname, '/images/Wedding');
// const dirKids = path.join(__dirname, '/images/Kids');
// const dirModeling = path.join(__dirname, '/images/Modeling');
// const dirCouples = path.join(__dirname, '/images/Couples');
// const dirPortrait = path.join(__dirname, '/images/Portrait');

// app.use(express.static(dirCathegory));
// app.use(express.static(dirWedding));
// app.use(express.static(dirKids));
// app.use(express.static(dirModeling));
// app.use(express.static(dirCouples));
// app.use(express.static(dirPortrait));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//___________________________________________________________________________________________________________________________________________
// end points

app.get('/', (req, res) => {
    const rootRef = firebase.database().ref().child('cathegory');
    rootRef.on('value', snap => {
        res.json(snap.val());
    })
    
})

app.get('/images', (req, res) => {
    const rootRef = firebase.database().ref().child('images');
    rootRef.on('value', snap => {
        res.json(snap.val());
    })
})

app.post('/message', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const topic = req.body.topic;
    const message = req.body.message;
    sendMail(name, email, topic, message, (err, data) => {
        if ( err ) {
            res.json('Internal Error')
        } else {
            res.json('Email sent')
        }
    })
    console.log(email)
})

// cathegoriesName.map(item => app.get(`/cathegory/${item}`, (req, res) => {
//     const pathToImage = `${dirCathegory}/${item}.jpg`
//   res.sendFile(pathToImage);
//   }));

// wedding.map(item => app.get(`/wedding/${item}`, (req, res) => {
//     const pathToImage = `${dirWedding}/${item}.jpg`
//     res.sendFile(pathToImage);
// }));

// kids.map(item => app.get(`/kids/${item}`, (req, res) => {
//     const pathToImage = `${dirKids}/${item}.jpg`
//     res.sendFile(pathToImage);
// }));

// modeling.map(item => app.get(`/modeling/${item}`, (req, res) => {
//     const pathToImage = `${dirModeling}/${item}.jpg`
//     res.sendFile(pathToImage);
// }));
// couple.map(item => app.get(`/couple/${item}`, (req, res) => {
//     const pathToImage = `${dirCouples}/${item}.jpg`
//     res.sendFile(pathToImage);
// }));
// portrait.map(item => app.get(`/portrait/${item}`, (req, res) => {
//     const pathToImage = `${dirPortrait}/${item}.jpg`
//     res.sendFile(pathToImage);
// }));

// app.get('/images/:id', (req, res) => {
//     const id = req.params.id;
//     if( id === 'Wedding' ) {
//         res.json(weddingData);
//     }
//     if ( id === 'Kids' ) {
//         res.json(kidsData);
//     }
//     if ( id === 'Modeling' ) {
//         res.json(modelingData);
//     }
//     if ( id === 'Couples' ) {
//         res.json(couplesData);
//     }
//     if ( id === 'Portrait' ) {
//         res.json(portraitData);
//     }
// })

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))