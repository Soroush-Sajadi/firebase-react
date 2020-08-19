const functions = require('firebase-functions');
const express = require('express');
const app = express();
// const cors = require('cors');
const cors = require('cors');
// const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const fileUpload = require('express-fileupload');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
require('@firebase/storage')
require('dotenv').config();
global.XMLHttpRequest = require("xhr2");

//__________________________________________________________________________________________________________________________//
// Data Base
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204
 }))
//  app.use('/', createProxyMiddleware({ target: 'https://us-central1-makan-5c9d1.cloudfunctions.net/app' , changeOrigin: true }));

const bodyParser = require('body-parser');
const config = {
    apiKey: 'AIzaSyDLmu0djMfie3aJmxygeSFatfxl-9gB_u4',
    authDomain: 'makan-5c9d1.firebaseio.com',
    databaseURL: 'https://makan-5c9d1.firebaseio.com',
    storageBucket: 'makan-5c9d1.appspot.com',
    
  };
firebase.initializeApp(config);
// admin.initializeApp({
//     databaseURL: 'https://makan-5c9d1.firebaseio.com',
//     credential: admin.credential.cert({
//         projectId: 'makan-5c9d1',
//         clientEmail: 'firebase-adminsdk-2jwii@makan-5c9d1.iam.gserviceaccount.com',
//         privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC81fh+UvKtJjHT\nily6wNqBhQ9lhmJSZJhyR/Tcr0fJEBOKzYwMN/9M6kRxJiQJ4g88VqL61Mu76t6V\nwJ+s5CjSFOdCuhbjP9W/hHFjs8sBNF5e82zr46Le94JVXaHuRhJlGqXBmRN/yUQA\nwerfxCYwU6djg6U/WZnBGxRrjOAS3wSqdE1bWBiLmCbtRSFCP0NbNt/OIK5UI+i0\nwuGQ8r5a6Z2stH3yXGn8z03qdIELhxgq1r7OcxDXoSB718g9hUNt37wKdpX8rG3C\nWKbnXpTDyOM+Hg1R9Ugb2NBswkepGp1UR4f2Ti20yuY4cYmavmb42Tpo0eDcj9wm\n7q9oG3FzAgMBAAECggEASY6Nv+NevXzRzuWoLmT+GJK0xybcON0PlwCZjLdIXrVA\n74IWyhGsBJGCvJKPWjwxFB9pWAy5GcepEatZZ5buobrbxJ3JWZcdk38rThuUebEl\nC5aF+LMQ2AqQveD9uVuZQcHqDGos8st7DlJ7Q9Pbzlpfqz92CKHF5zc9spFLHX4P\nH+T56GOlcUQKdyy+qe0AnpU9fgvqePXOiGrElzVTQMn+HIqchMnBTvA7p/sEqB0s\nVfsqn//cbAiIcbOo+q7Pv91AjStu28br0BPLCw+t5FCC12FETXJoL6+/6/i6uH9N\nGvM5TGhfEMmFfoIZkmayOPeXrvDu8vCxFcRLIeix+QKBgQDveLiyudJ6IdavC6cx\nJs+sakGCNeTQPjgaz1eO4lan+692nsA+mo4d67YHqtfxnYTHEJm9d3ZjvlfQ5J5q\nqaGJcBJRerPD0A6w0KwJ1UVns/gZ2JPknMBoUucBwSBfIRwMvOkv1OW3MmAqA3pB\nBWUD7rved/PTpmUA9oCEJ3UkmQKBgQDJ3o30GN/wD+E/7tJcZyaUiy+Ea5R+r3eY\nQ56LxEk9y8NJXCfALH9FPFvwjU/UYD9QCwF3x2f4vG//yl2qRLm9bJtbdxZWxwy4\n3h+kxMZwvvIX2hL220F2hmeD1Y7bsrfvv+ImYA5r9VjY79T4zjmv5cUgTxq7cIEB\nrp53AIhB6wKBgQCQcTamxyLHfCWsC9Fa+lgFXUoKKkvLt9vLgAkGLEuso0kguXyn\nxj22mnh/g3MhT6vJDqBNAgOtAiCh5WQQXiULa0gBUYugrpxN1nAOtk9Yz9r0bAg4\nurvrsSWZj03hU21B2ailqzqsF3ydmt9g3MojZxp2g8/Ud+cwf37hN5OW8QKBgA0f\n+DDHsT+leKq0d17kogCEcCl26Se3dtoig1to/q4S4naRlFANVJUG0J96QJd5ToSA\nwq6r+1mTvuBtottgLodfWVaADqbDuFMIthv7Yz+PWqQsXJFKPh5brL1IlEo6e3UO\nD8EY+7cPM6CfL0Sh++Qw1zk7i2xmayzV0p3AHhvTAoGASb7Cjt1hsShhh9elIBrA\nKjgBr/aEGnfgIU75k0s5MUWFiKF/0fkily2U/Fe8fVcmY9i3AAy2b2ZN82uhIqDg\n4IspZ+YfImtKD4BAyPR0wXITuO78MpBQ/PVypIGtHlWnxOKnNmLq8gRJqX5cQQxB\nWp/iBToz4GIedvEOGEZrPH8=\n-----END PRIVATE KEY-----\n",
//         serviceAccountId: '101406919800803995219@my-makan-5c9d1.iam.gserviceaccount.com'
//     })
//   });


const storage = firebase.storage();

//______________________________________________________________________________________________________________________________________//
// Helper functions
const { sendMail } = require('./helperFunctions/sendMail')
const { imageName } = require('./helperFunctions/setName')


//___________________________________________________________________________________________________________________________
// Middle ware
// app.use(cors());
// app.options("*", cors())

// const corsHandler = cors({origin: true});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
  
//___________________________________________________________________________________________________________________________________________
// end points

app.get('/', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*')
    // cors(req, res, () => {
        const rootRef = firebase.database().ref().child('cathegory');
        rootRef.once('value', snap => {
        res.json(snap.val());
    })
    // })
        
    
    
})

app.get('/images/:id', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*')
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");
	// 	res.setHeader("Content-Type", "application/json;charset=utf-8");
    // cors (req, res, () => {
        if (req.files) {
            // res.set('Access-Control-Allow-Origin', '*');
    
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
            
            
        };

    // })
    // res.set('Access-Control-Allow-Origin', '*')
    // res.set('Access-Control-Allow-Origin', 'https://us-central1-makan-5c9d1.cloudfunctions.net/app/');
    // res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.set('Access-Control-Allow-Credentials', 'true')
    // res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
// const originUrl ="https://us-central1-makan-5c9d1.cloudfunctions.net/app/"
// res.set('Access-Control-Allow-Origin', originUrl);
//   res.set('Access-Control-Allow-Credentials', 'true');
    // if (req.method === 'POST') {
        
    
    // }
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

// const port = 3000;
// app.listen(port, () => console.log(`listening on port ${port}!`))

exports.app = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
