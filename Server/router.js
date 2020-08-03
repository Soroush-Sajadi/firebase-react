const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const firebase = require('firebase');
require('@firebase/storage')
require('dotenv').config();
const { sendMail } = require('./helperFunctions/sendMail')
//const fetch = require('node-fetch');
global.XMLHttpRequest = require("xhr2");

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
const storage = firebase.storage();

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
app.use(fileUpload());

//___________________________________________________________________________________________________________________________________________
// end points

app.get('/', (req, res) => {
    const rootRef = firebase.database().ref().child('cathegory');
    rootRef.on('value', snap => {
        res.json(snap.val());
    })
    
})

app.get('/images/:id', (req, res) => {
    album = req.params.id;
    const rootRef = firebase.database().ref().child(`${album}`);
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
})

app.post('/cathegoryChange',async (req, res) => {
    if (req.files) {
        const reg =/(?<=\F).*\g/;
        const name = req.files.file.name.match(reg)[0]
        const uploadImage = storage.ref(`cathegory/${name}`).put(req.files.file.data)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref('cathegory').child(req.files.file.name).getDownloadURL().then(url => {
                console.log(url)
            })
            
        });
    }
})
app.post('/galleryChange',async (req, res) => {
    if (req.files) {
        const cathegory = req.files.file.name.split(/[0-9]/)[0]
        const uploadImage = storage.ref(`${cathegory}/${req.files.file.name}.jpg`).put(req.files.file.data)
        // const deleteImage = storage.ref().child('cathegory/Wedding.jpg')
        // deleteImage.delete().then(() => {
        //     console.log('ites deleted')
        // })
        // .catch((error) => {
        //     console.log(error.message)
        // })
        
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref(`${cathegory}`).child(req.files.file.name).getDownloadURL().then(url => {
                console.log(url)
            })
            
        });
    }
});

app.get('/password', (req, res) => {
    const rootRef = firebase.database().ref().child('password');
    rootRef.on('value', snap => {
        res.json(snap.val());
    })
    
})


const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))

