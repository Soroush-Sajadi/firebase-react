const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const fileMiddleware = require('express-multipart-file-parser');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
require('@firebase/storage')
require('dotenv').config();
global.XMLHttpRequest = require("xhr2");

//__________________________________________________________________________________________________________________________//
// Data Base
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
 }))

const bodyParser = require('body-parser');
const config = {
    apiKey: 'xxxxx',
    authDomain: 'xxxxx',
    databaseURL: 'xxxxxx',
    storageBucket: 'xxxxx',
    
  };
firebase.initializeApp(config);
const storage = firebase.storage();

//______________________________________________________________________________________________________________________________________//
// Helper functions
const { sendMail } = require('./helperFunctions/sendMail')
const { imageName } = require('./helperFunctions/setName')


//___________________________________________________________________________________________________________________________
// Middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileMiddleware);
//___________________________________________________________________________________________________________________________________________
// end points

app.get('/', (req, res) => {
        const rootRef = firebase.database().ref().child('cathegory');
        rootRef.once('value', snap => {
        res.json(snap.val());
    })
})

app.get('/images/:id', (req, res) => {
    album = req.params.id;
    const rootRef = firebase.database().ref().child(`${album}`);
    rootRef.once('value', snap => {
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
        const name = (req.files[0].originalname.split(',')[0]).match(reg)[0];
        const imageIndex = req.files[0].originalname.split(',')[1];
            const uploadImage = storage.ref(`cathegory/${name}`).put(req.files[0].buffer)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref(`cathegory`).child(name).getDownloadURL().then(downloadURL => {
                if ( downloadURL ) {
                    const usersRef = firebase.database().ref().child(`cathegory/${imageIndex}/image`);
                    usersRef.set(
                        `${downloadURL}`
                    )
                }
            })
            .then(() => res.send('Its done'))
            .catch(() => res.send('something went wrong'));
        });
    } else {
        res.send('image only')
    }
})
app.post('/galleryChange',async (req, res) => {
    if (req.files) {
        const imageIndex = req.files[0].originalname.split(',')[1];
        const imageName = req.files[0].originalname.split(',')[0];
        const cathegory = imageName.split(/[0-9]/)[0]
        console.log(imageIndex, imageName, cathegory)
        const uploadImage = storage.ref(`${cathegory}/${imageName}.jpg`).put(req.files[0].buffer)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref(`${cathegory}`).child(`${imageName}.jpg`).getDownloadURL().then(downloadURL => {
                if ( downloadURL ) {
                    const usersRef = firebase.database().ref().child(`${cathegory}/${imageIndex}/picture`);
                    usersRef.set(
                        `${downloadURL}`
                    )
                }
            })
            .then(() => res.send('Its done'))
            .catch(() => res.send('something went wrong'))
        });
    } else {
        res.send('image only')
    }
});

app.post('/add/image', (req,res) => {
    if (req.files) {
        const cathegory = (imageName(req.files[0].originalname))[0];
        const name = (imageName(req.files[0].originalname))[1];
        const number = (imageName(req.files[0].originalname)[2]);
        const image = req.files[0].buffer;
        console.log(cathegory, name, number, image)
        const uploadImage = storage.ref(`${cathegory}/${name}.jpg`).put(image);
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            if (error) {
                res.json(error.message)
            }
        },
        () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
                if ( downloadURL ) {
                    const usersRef = firebase.database().ref().child(`${cathegory}/${number - 1}`);
                    usersRef.set({
                        name:`${name}`,
                        picture:`${downloadURL}`
                    })
                }
            })
            .then(() => res.send('Its done'))
            .catch(() => res.send('something went wrong'))
        })
    } else {
        res.send('image only')
    }
})

app.get('/delete/image/:name', (req, res) => {
    const cathegory = (imageName(req.params.name))[0];
    const name = (req.params.name);
    const number = (imageName(req.params.name)[3]) - 1
    const deleteImage = storage.ref(`${cathegory}/${name}.jpg` ).delete();
    deleteImage.then(() => {
        const deleteData = firebase.database().ref().child(`${cathegory}/${number}`)
            deleteData.remove().then(() => {
                res.json('Its done')
            }).catch(error => {
                res.json(error.message)
            })
        }).catch(error => {
            res.json(error.message)
        })
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


exports.app = functions.https.onRequest(app)
