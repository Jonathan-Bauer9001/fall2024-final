import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faMagicWandSparkles, faWarning } from '@fortawesome/free-solid-svg-icons';
import './Card.css'
const Card = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [cardName, setCardName] = useState('');
  const [typeText, setTypeText] = useState('');
  const [oracleText, setOracleText] = useState('');
  const [cardSet, setCardSet] = useState('');
  const [cardQty, setCardQty] = useState('');

  useEffect(() => {
    setCardName(props.card.cardName);
    setTypeText(props.card.typeText);
    setOracleText(props.card.oracleText);
    setCardSet(props.card.cardSet);
    setCardQty(props.card.cardQty);
  },[]);

  const saveCard = () => {
    setEditMode(false);
    const updatedCard = {
      cardQty: cardQty,
      cardName: cardName,
      typeText: typeText,
      oracleText: oracleText,
      cardSet: cardSet,
      id: props.card.id,
      image: props.card.image
    };  
    props.updateCard(updatedCard);
  }

  return (
    <div>
      <div className="card w-100">
        <img src={props.card.image} alt="Our Card" className='w-100 card-image m-auto p-2'/>
        <div className='text-center'>
          <div>Quantity: {props.card.cardQty}</div>
        </div>
        {!editMode &&   
        <div className="dropdown text-center"> 
          <button className="btn btn-secondary dropdown-toggle mb-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            More Information
          </button>     
          <ul className="dropdown-menu">
            <li className="dropdown-item text-center">{props.card.cardName}</li>
            <li className="dropdown-divider"></li>
            <li className="dropdown-item text-center ">{props.card.typeText}</li>
            <li className="dropdown-divider"></li>
            <li className="dropdown-item text-center">{props.card.oracleText}</li>
            <li className="dropdown-divider"></li>
            <li className="dropdown-item text-center">{props.card.cardSet}</li>
            <li className="dropdown-divider"></li>
            <div className="editDeleteBtn d-flex flex-wrap column">
              <button type="button" className='btn btn-danger w-100 mx-1 mb-1 order-1' onClick={() => props.removeCard(props.card)}>Delete Card<FontAwesomeIcon icon={faWarning} /></button>
              <button type="button" className='btn btn-warning w-100 m-1 order-0' onClick={() => setEditMode(true)}>Edit Card<FontAwesomeIcon icon={faMagicWandSparkles} /></button>
            </div>

          </ul>
        </div>
        }
        {editMode &&         
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-center"><input type='text' className='form-control' value={cardQty} onChange={(e) => setCardQty(e.currentTarget.value)} /></li>
            <li className="list-group-item text-center"><input type='text' className='form-control' value={cardName} onChange={(e) => setCardName(e.currentTarget.value)} /></li>
            <li className="list-group-item text-center"><input type='text' className='form-control' value={typeText} onChange={(e) => setTypeText(e.currentTarget.value)} /></li>
            <li className="list-group-item text-center"><input type='text' className='form-control' value={oracleText} onChange={(e) => setOracleText(e.currentTarget.value)} /></li>
            <li className="list-group-item text-center"><input type='text' className='form-control' value={cardSet} onChange={(e) => setCardSet(e.currentTarget.value)} /></li>
            <li className="list-group-item text-center"><button type="button" className='btn btn-secondary' onClick={saveCard}>Save Changes<FontAwesomeIcon icon={faFloppyDisk} /></button></li>
          </ul>
        }


      </div>
    </div>
  )
}

export default Card