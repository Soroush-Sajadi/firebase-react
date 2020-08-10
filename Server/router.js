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
// Middle ware

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());


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
        const name = (req.files.file.name.split(',')[0]).match(reg)[0];
        const imageIndex = req.files.file.name.split(',')[1];
        const uploadImage = storage.ref(`cathegory/${name}`).put(req.files.file.data)
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
        });
    }
})
app.post('/galleryChange',async (req, res) => {
    if (req.files) {
        const imageIndex = req.files.file.name.split(',')[1];
        const imageName = req.files.file.name.split(',')[0];
        const cathegory = imageName.split(/[0-9]/)[0]
        const uploadImage = storage.ref(`${cathegory}/${imageName}.jpg`).put(req.files.file.data)
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
        });
    }
});

app.post('/add/image', (req,res) => {
    if (req.files) {
        const cathegory = (imageName(req.files.file.name))[0];
        const name = (imageName(req.files.file.name))[1];
        const number = (imageName(req.files.file.name)[2]);
        const image = req.files.file.data;
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
                    res.setHeader('Content-Type', 'application/json');
                    const usersRef = firebase.database().ref().child(`${cathegory}/${number - 1}`);
                    usersRef.set({
                        name:`${name}`,
                        picture:`${downloadURL}`
                    })
                }
            })
            .then(() => res.send('Its done'))
        })
    }
})

app.get('/delete/image/:name', (req, res) => {
    const cathegory = (imageName(req.params.name))[0];
    const name = (req.params.name);
    const number = (imageName(req.params.name)[3]) - 1

    console.log(cathegory, name, number)

    const deleteImage = storage.ref(`${cathegory}/${name}.jpg`).delete();
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

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))

