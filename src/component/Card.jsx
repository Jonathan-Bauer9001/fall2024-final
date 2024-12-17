import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faMagicWandSparkles, faWarning } from '@fortawesome/free-solid-svg-icons';

const Card = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [cardName, setCardName] = useState('');
  const [typeText, setTypeText] = useState('');
  const [oracleText, setOracleText] = useState('');
  const [cardSet, setCardSet] = useState('');

  useEffect(() => {
    setCardName(props.card.cardName);
    setTypeText(props.card.typeText);
    setOracleText(props.card.oracleText);
    setCardSet(props.card.cardSet);
  },[]);

  const saveCard = () => {
    setEditMode(false);
    const updatedCard = {
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
      <div className="card">
        <img src={props.card.image} alt="Our Card" className='card-image-top mx-auto'/>
        {!editMode &&         
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-center">{props.card.cardName}</li>
            <li className="list-group-item text-center">{props.card.typeText}</li>
            <li className="list-group-item text-center">{props.card.oracleText}</li>
            <li className="list-group-item text-center">{props.card.cardSet}</li>
            <div className="editDeleteBtn d-flex">
              <button type="button" className='btn btn-danger w-50 order-1' onClick={() => props.removeCard(props.card)}>Delete Card<FontAwesomeIcon icon={faWarning} /></button>
              <button type="button" className='btn btn-warning w-50 order-0' onClick={() => setEditMode(true)}>Edit Card<FontAwesomeIcon icon={faMagicWandSparkles} /></button>
            </div>

          </ul>
        }
        {editMode &&         
          <ul className="list-group list-group-flush">
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