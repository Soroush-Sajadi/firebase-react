import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import DeleteIcon from '../../images/Logo/delete.png';
import Tick from '../../images/Logo/tick.svg'
import '../Style/DeleteImageRemote.css'

function DeleteImageRemote ({ imageName, updadateReRender }) {
    const [ message, setMessage ] = useState('')

    const getImage = async () => {
        const url = `http://localhost:3000/delete/image/${imageName}`
        await fetch(url)
            .then(res => res.json())
            .then(res => res === 'Its done' ? updadateReRender(true): null)
    }

    const deleteImage = async () => {
        if (window.confirm("Are you sure you want to delete this picture?")) {
            getImage();
        }
    }

    return(
        <div className="deleteIcon">
            <img src={DeleteIcon} alt="delete" onClick={deleteImage}/>
            {message === 'Its done' ? <img src={Tick} alt="tick" /> : null}
        </div>
    )
}

export default DeleteImageRemote;