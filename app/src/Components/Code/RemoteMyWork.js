import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-spinners-css';
// import firebase from 'firebase';
import axios from 'axios'
import '../Style/Remote.css'

function RemoteMyWork ({ updateRender, updateGallery, remainAuthenticated }) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [ oldImage, setOldImage ] = useState('');
    const [ progress, setProgess ] = useState(0);
    const [ authenticate, setAuthenticate ] = useState(false);
    const [ wrongPassMessage, setWrongPassMessage ] = useState('');
    const [ loadingBar,  setLoadingBar ] = useState(true);
    const [ reFetch, setReFetch ] = useState(false);
    const [ userIn, setUserIn ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        firstPass: '',
        secondPass: '',
        }
      );

//             const firebaseConfig = {
//         apiKey: "AIzaSyDLmu0djMfie3aJmxygeSFatfxl-9gB_u4",
//         authDomain: "makan-5c9d1.firebaseapp.com",
//         databaseURL: "https://makan-5c9d1.firebaseio.com",
//         projectId: "makan-5c9d1",
//         storageBucket: "makan-5c9d1.appspot.com",
//         messagingSenderId: "801882567983",
//         appId: "1:801882567983:web:9c6ec1dfa7cce09ef6ddda",
//         measurementId: "G-MP3HLNWGGJ"
//       };
     
//       // Initialize Firebase
//       if (!firebase.apps.length) {
//         firebase.initializeApp(firebaseConfig);

//   }

//   const auth = firebase.auth()

    const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserIn({[name]: newValue});
    }
    // const user = firebase.auth().currentUser;
    // const token = user && (await user.getIdToken());
  
    // const res = await fetch(url, {
    //   methodL 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  
    // return res.json();

    const getLogIn = async () => {
        // const user = auth.currentUser;
        // const token = user && (await user.getIdToken());
        // console.log(user)
            await fetch(`https://us-central1-makan-5c9d1.cloudfunctions.net/app/password/${userIn.firstPass}/${userIn.secondPass}`,{
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    // },
            })
                .then(res => res.json())
                .then(res => setAuthenticate(res) || res ? getData(): setWrongPassMessage('Password is wrong') )
    }

    const getData = async() => {
        setWrongPassMessage('');
            await fetch(`https://us-central1-makan-5c9d1.cloudfunctions.net/app`,{
                // headers: {
                //     'Access-Control-Allow-Origin': '*'
                //   }
            })
                .then(res => res.json())
                .then(res => setData(res))
    }

    const handelChange = e => {
        setProgess(0)
        const file = (e.target.files[0]);
        setFile(file);
    }

    const postFileNewImage = (oldImage,imageIndex) => {
        setLoadingBar(true);
        // const headers = new Headers();
        // headers.append('Access-Control-Allow-Origin', 'https://us-central1-makan-5c9d1.cloudfunctions.net/app/');
        const url = 'https://us-central1-makan-5c9d1.cloudfunctions.net/app/cathegoryChange';
        const formData = new FormData();
        formData.append( 'file', file,[oldImage, imageIndex])
        axios.post(url, formData,  {
           
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
            
        })
        .then(res => res.data === 'Its done' ? setReFetch(true) || setLoadingBar(false): null)
        .catch(err => console.log(err));
    }

	const postData =  (e) => {
        if (file !== null) {
             postFileNewImage(e.target.getAttribute('url'),e.target.getAttribute('index'));
        }
    }

    const getTitle = (e) => {
        updateGallery(e.target.getAttribute('value'));
        updateRender('Gallery');
        
    }

    useEffect(() => {
        if (reFetch) {
            setReFetch(false)
            getData()
        }
    }) 

    useEffect(() => {
        if( remainAuthenticated ) {
            getData();
           
        }
        // getToken()
    },[])
    return(
        <>
        {authenticate || remainAuthenticated ? 
        <div className="remote-wrapper">
            {progress !== 0 && loadingBar === true ?
            <div className="progress-bar-wrapper">
                <div className="progress-bar" style={{width: '50%', height:'30px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"30px", backgroundColor:'#881d1d', borderRadius:'20px'}}>
                    <p style={{color:'white', fontSize:'21px'}}> {progress === '100%' ? 'Please wait...': progress}</p>
                </div>
            </div>
            </div>
            :
            null
            }
            {data.length === 0 ? <div className="loading"><Spinner color="white" size={200} /></div> 
            :
            <div style={progress !== 0 && loadingBar === true ? {filter:'blur(3px)'}: null} className="cathegories-wrapper-remote">
                {data.map((item, i) => 
                    <div key={i}  className="cathegory-remote">
                        <h4>{item.title}</h4>
                        <img value={item.title} src={item.image} onClick={getTitle} />
                        <div className="file-wrapper">
                            <input className="file" type="file"  url={item.image} onChange={handelChange} />
                            <input type="submit" url={item.image} index={data.indexOf(item)} value="Change" onClick={postData} />
                        </div>
                    </div> 
                ) }
            </div>
            }
        </div>
        :
        
        <div className="login-wraper">
            <input style={{color:'white'}} className="login" type="password" name="firstPass" value={userIn.firstPass} placeholder="First password" onChange={ handleChangePass } />
            <input style={{color:'white'}} className="login" type="password" name="secondPass" value={userIn.secondPass} placeholder="Second password" onChange={ handleChangePass } />
            <input className="submit" type="submit" onClick={getLogIn}/>
            {wrongPassMessage !== ''? <h3>{wrongPassMessage}</h3>: null}
        </div>
        }
        </>
    )
}
export default RemoteMyWork;



//       const firebaseConfig = {
//         apiKey: "AIzaSyDLmu0djMfie3aJmxygeSFatfxl-9gB_u4",
//         authDomain: "makan-5c9d1.firebaseapp.com",
//         databaseURL: "https://makan-5c9d1.firebaseio.com",
//         projectId: "makan-5c9d1",
//         storageBucket: "makan-5c9d1.appspot.com",
//         messagingSenderId: "801882567983",
//         appId: "1:801882567983:web:9c6ec1dfa7cce09ef6ddda",
//         measurementId: "G-MP3HLNWGGJ"
//       };
     
//       // Initialize Firebase
//       if (!firebase.apps.length) {
//         firebase.initializeApp(firebaseConfig);
//   }
    //   firebase.analytics();
    //   const getToken = () => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           userObj.user = user
    //           firebase.auth().currentUser.getIdToken().then((idToken) => {
    //             console.log(`idToken ==> ${idToken}`)
    //           })
    //         }
    //       })
    //   } 