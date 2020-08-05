import React from 'react'
import DeleteIcon from '../../images/Logo/delete.png';
import '../Style/DeleteImageRemote.css'

function DeleteImageRemote () {
    return(
        <div className="deleteIcon">
            <img  src={DeleteIcon} alt="delete" />
        </div>
    )
}

export default DeleteImageRemote;