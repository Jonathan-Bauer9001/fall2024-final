import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import './AddCard.css';

const addCard = (props) => {

  const [cardName, setCardName] = useState('');
  const [typeText, setTypeText] = useState();
  const [oracleText, setOracleText] = useState('');
  const [cardSet, setCardSet] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const doWork = () => {
    
    const newCard = {
      'id': nanoid(),
      'cardName': cardName,
      'typeText': typeText,
      'oracleText': oracleText,
      'cardSet': cardSet,
      'image': URL.createObjectURL(selectedFile)
    }
    props.addCard(newCard)
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="container order-0">
      <div className='row mt-5 text-center align-items-end' id='addCard'>
        <h3 className="fw-bold text-decoration-underline pb-3" >Add Card</h3>
        <div className="col-md-2">
          <label htmlFor="textCardName" className='form-label'>Card Name</label>
          <input type="text" id='textCardName' placeholder='Card Name' className='form-control' onChange={(event) => setCardName(event.currentTarget.value)} value={cardName} />
        </div>
        <div className="col-md-2">
          <label htmlFor="textTypeText" className='form-label'>Card Type</label>
          <input type="text" id='textTypeText' placeholder='Card Type' className='form-control' onChange={(event) => setTypeText(event.currentTarget.value)} value={typeText} />
        </div>
        <div className="col-md-2">
          <label htmlFor="textOracleText" className='form-label'>Card Text</label>
          <input type="text" id='textOracleText' placeholder='Card Text' className='form-control' onChange={(event) => setOracleText(event.currentTarget.value)} value={oracleText} />
        </div>
        <div className="col-md-2">
          <label htmlFor="textCardSet" className='form-label'>Card Set</label>
          <input type="text" id='textCardSet' placeholder='Card Set' className='form-control' onChange={(event) => setCardSet(event.currentTarget.value)} value={cardSet} />
        </div>
        <div className="col-md-2">
          <label htmlFor="fileUpload" className='form-label'>Card Image</label>
          <input type="file" id='fileUpload' className='form-control' onChange={imageUpdate} />
        </div>
        <div className="col-md-2 mt-2">
          <button type="button" className='btn btn-success btn-lg' id='btnAdd' onClick={doWork}>Add Card <FontAwesomeIcon icon={faPlusCircle} /></button>
        </div>
      </div>
    </div>
  )
}

export default addCard