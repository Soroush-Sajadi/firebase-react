import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
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
    const [ user, setUser ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        firstPass: '',
        secondPass: '',
        }
      );

    const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUser({[name]: newValue});
    }

    const getLogIn = async () => {
        await fetch(`http://localhost:3000/password/${user.firstPass}/${user.secondPass}`)
            .then(res => res.json())
            .then(res => setAuthenticate(res) || res ? getData(): setWrongPassMessage('Password is wrong') )
    }

    const getData = async() => {
        setWrongPassMessage('');
            await fetch(`http://localhost:3000/`)
                .then(res => res.json())
                .then(res => setData(res))
    }

    const handelChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
        // setOldImage(e.target.getAttribute('url'));
    }

    const postFileNewImage = (oldImage,imageIndex) => {
        setLoadingBar(true);
        const url = 'http://localhost:3000/cathegoryChange';
        const formData = new FormData();
        console.log(imageIndex)
        formData.append( 'file', file,[oldImage, imageIndex])
        axios.post(url, formData,  {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 99) + '%';
                setProgess(progress);
            },
        }).then(res => res.data === 'Its done' ? setReFetch(true) || setLoadingBar(false) : null)
        // .then(res => {
        //     console.log(res);
        //     getFile({ name: res.newData.name,
        //              path: 'http://localhost:4500' + res.newData.path
        //            })
        // }).catch(err => console.log(err))}
        // await fetch (url, {
        //   	method: 'post',
        //   	headers: {'Content-Type':'application/json'},
        //   	body: JSON.stringify({
        //   	"oldImage": oldImage,
        //   	})
		// })
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
    },[])
    return(
        <>
        {authenticate || remainAuthenticated ? 
        <div className="remote-wrapper">
            {progress !== 0 && loadingBar === true ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            {data.length === 0 ? loading
            :
            <div className="cathegories-wrapper-remote">
                {data.map((item, i) => 
                    <div key={i}  className="cathegory-remote">
                        <h4>{item.title}</h4>
                        <img value={item.title} src={item.image} onClick={getTitle} />
                        <input type="file"  url={item.image} onChange={handelChange} />
                        <input type="submit" url={item.image} index={data.indexOf(item)} value="Change" onClick={postData} />
                    </div> 
                ) }
            </div>
            }
        </div>
        :
        
        <div className="login-wraper">
            <input className="login" type="text" name="firstPass" value={user.firstPass} placeholder="First password" onChange={ handleChangePass } />
            <input className="login" type="text" name="secondPass" value={user.secondPass} placeholder="Second password" onChange={ handleChangePass } />
            <input className="submit" type="submit" onClick={getLogIn}/>
            {wrongPassMessage !== ''? <h3>{wrongPassMessage}</h3>: null}
        </div>
        }
        </>
    )
}
export default RemoteMyWork;

// const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
// const [data, getFile] = useState({ name: "", path: "" });
// const [progress, setProgess] = useState(0); // progess bar
// const el = useRef(); // accesing input element
// const handleChange = (e) => {
//     setProgess(0)
//     const file = e.target.files[0]; // accesing file
//     console.log(file);
//     setFile(file); // storing file
// }
// const uploadFile = () => {
//     const formData = new FormData();        formData.append('file', file); // appending file
//     axios.post('http://localhost:4500/upload', formData, {
//         onUploadProgress: (ProgressEvent) => {
//             let progress = Math.round(
//             ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
//             setProgess(progress);
//         }
//     }).then(res => {
//         console.log(res);
//         getFile({ name: res.data.name,
//                  path: 'http://localhost:4500' + res.data.path
//                })
//     }).catch(err => console.log(err))}
// return (
//     <div>
//         <div className="file-upload">
//             <input type="file" ref={el} onChange={handleChange} />                <div className="progessBar" style={{ width: progress }}>
//                {progress}
//             </div>
//             <button onClick={uploadFile} className="upbutton">                   Upload
//             </button>
//         <hr />
//         {/* displaying received image*/}
//         {data.path && <img src={data.path} alt={data.name} />}
//         </div>
//     </div>
// );
// }
// export default FileUpload;