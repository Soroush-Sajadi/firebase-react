const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const firebase = require('firebase');
require('@firebase/storage')
require('dotenv').config();

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
const { sendMail } = require('./helperFunctions/sendMail')
const { imageName } = require('./helperFunctions/setName')
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

app.post('/add/image', (req,res) => {
    if (req.files) {
        const cathegory = (imageName(req.files.file.name))[0];
        const name = (imageName(req.files.file.name))[1];
        const number = (imageName(req.files.file.name)[2])
        const image = req.files.file.data
        const uploadImage = storage.ref(`${cathegory}/${name}.jpg`).put(image)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        async () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const usersRef = firebase.database().ref().child(`${cathegory}/${number - 1}`);
                            usersRef.update({
                                    name:`${name}`,
                                    picture:`${downloadURL}`
                            })
            })
            .catch(err => console.log (err.message));
        });
    }
})

app.get('/delete/image/:name', (req, res) => {
    console.log(req.params.name)
})

app.get('/password/:firstPass/:secondPass', (req, res) => {
    const firstPass = req.params.firstPass;
    const secondPass = req.params.secondPass;
    const rootRef = firebase.database().ref().child('password');
    rootRef.on('value', snap => {
        if ( Number(firstPass) === snap.val().firstPass && Number(secondPass) === snap.val().secondPass ) {
            res.json(true);
        } else {
            res.json(false);
        }
    })
})




const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))

