import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
function Test () {
    const [ data, setData ] = useState ([]);

    useEffect(() => {
        const rootRef = firebase.database().ref();
        rootRef.on('value', snap => {
            console.log('jasbd',snap.val())
            setData(snap.val())
        })
    },[])
    
        return(
            <div>
                {data.length === 0 ? <h1>noooooo</h1>: <h1>{data.cathgory.map(item => item.image)}</h1>}
               
            </div>
        )
}

export default Test