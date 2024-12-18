import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {nanoid} from 'nanoid';
import AddCard from './component/AddCard';
import _ from 'lodash';
import Card from './component/Card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faReply, faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  
  const [allCards, setAllCards] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [cardSet, setCardSet] = useState('');

  useEffect(() => {
    if(localStorage) {
      const cardsLocalStorage = JSON.parse(localStorage.getItem('cards'));

      if(cardsLocalStorage) {
        saveCards(cardsLocalStorage);
      }else{
        saveCards(cards);
      }
    }
    
  }, []);

  const cards = [{

      id: nanoid(),
      cardName: "Mana Crypt",
      typeText: "Artifact",
      oracleText: "At the beginning of your upkeep, flip a coin. If you lose the flip, Mana Crypt deals 3 damage to you. Tap: Add (Colorless)(Colorless).",
      image: "2xm-270-mana-crypt.jpg",
      cardSet: "Double Masters"
    }, {
      id: nanoid(),
      cardName: "Jeweled Lotus",
      typeText: "Artifact",
      oracleText: "Tap, Sacrifice Jeweled Lotus: Add three mana of any one color. Spend this mana only to cast your commander.",
      image: "cmm-396-jeweled-lotus.jpg",
      cardSet: "Commander Masters"
    }, {
      id: nanoid(),
      cardName: "Nadu, Winged Wisdom",
      typeText: "Legendary Creature - Bird Wizard",
      oracleText: `Flying. Creatures you control have “Whenever this creature becomes the target of a spell or ability, reveal the top card of your library. If it’s a land card, put it onto the battlefield. Otherwise, put it into your hand. This ability triggers only twice each turn.`,
      image: "mh3-193-nadu-winged-wisdom.jpg",
      cardSet: "Modern Horizon 3"
    }, {
      id: nanoid(),
      cardName: "Dockside Extortionist",
      typeText: "Creature - Goblin Pirate",
      oracleText: "When Dockside Extortionist enters, create X Treasure tokens, where X is the number of artifacts and enchantments your opponents control.",
      image: "2x2-107-dockside-extortionist.jpg",
      cardSet: "Double Masters 2022"
    }, {
      id: nanoid(),
      cardName: "Tinker",
      typeText: "Sorcery",
      oracleText: "As an additional cost to cast this spell, sacrifice an artifact. Search your library for an artifact card, put that card onto the battlefield, then shuffle.",
      image: "ulg-45-tinker.jpg",
      cardSet: "Urza's Legacy"
    }, {
      id: nanoid(),
      cardName: "Tolarian Academy",
      typeText: "Legendary Land",
      oracleText: "Tap: Add Blue for each artifact you control.",
      image: "usg-330-tolarian-academy.jpg",
      cardSet: "Urza's Saga"
    }, {
      id: nanoid(),
      cardName: "Prophet of Kruphix",
      typeText: "Creature - Human Wizard",
      oracleText: `Untap all creatures and lands you control during each other player’s untap step. You may cast creature spells as though they had flash.`,
      image: "ths-199-prophet-of-kruphix.jpg",
      cardSet: "Theros"
    }, {
      id: nanoid(),
      cardName: "Griselbrand",
      typeText: "Legendary Creature — Demon",
      oracleText: "Flying, lifelink. Pay 7 life: Draw seven cards.",
      image: "avr-106-griselbrand.jpg",
      cardSet: "Avacyn Restored"
    }, {
      id: nanoid(),
      cardName: "Biorhythm",
      typeText: "Sorcery",
      oracleText: "Each player’s life total becomes the number of creatures they control.",
      image: "9ed-231-biorhythm.jpg",
      cardSet: "Ninth Edition"
    }, {
      id: nanoid(),
      cardName: "Recurring Nightmare",
      typeText: "Enchantment",
      oracleText: "Sacrifice a creature, Return Recurring Nightmare to its owner’s hand: Return target creature card from your graveyard to the battlefield. Activate only as a sorcery.",
      image: "exo-72-recurring-nightmare.jpg",
      cardSet: "Exodus"
    }, {
      id: nanoid(),
      cardName: "Yawgmoth's Bargain",
      typeText: "Enchantment",
      oracleText: "Skip your draw step. Pay 1 life: Draw a card.",
      image: "uds-75-yawgmoth-s-bargain.jpg",
      cardSet: "Urza's Destiny"
    }, {
      id: nanoid(),
      cardName: "Sundering TItan",
      typeText: "Artifact Creature - Golem",
      oracleText: "When Sundering Titan enters or leaves the battlefield, choose a land of each basic land type, then destroy those lands.",
      image: "2xm-292-sundering-titan.jpg",
      cardSet: "Double Masters"
    }, {
      id: nanoid(),
      cardName: "Primeval Titan",
      typeText: "Crature - Giant",
      oracleText: "Trample. Whenever Primeval Titan enters or attacks, you may search your library for up to two land cards, put them onto the battlefield tapped, then shuffle.",
      image: "tsr-365-primeval-titan.jpg",
      cardSet: "Time Spiral Remastered"
    }, {
      id: nanoid(),
      cardName: "Fastbond",
      typeText: "Enchantment",
      oracleText: "You may play any number of lands on each of your turns. Whenever you play a land, if it wasn’t the first land you played this turn, Fastbond deals 1 damage to you.",
      image: "2ed-193-fastbond.jpg",
      cardSet: "Unlimited Edition"
    }];

    const saveCards = (cards) => {
      setAllCards(cards);
      setSearchResults(cards);
      if(localStorage){
        localStorage.setItem('cards', JSON.stringify(cards));
        console.log('saved to local storage');
      }
    };

    const addCard = (newCard) => {
      const updatedCards = [...allCards, newCard];
      saveCards(updatedCards);
    };

    const removeCard = (cardToDelete) => {
     // console.table(cardToDelete);
     const updatedCardArray = allCards.filter(card => card.id !== cardToDelete.id);
     saveCards(updatedCardArray);
    }

    const updateCard = (updatedCard) => {
      const updatedCardArray = allCards.map(card => card.id === updatedCard.id ? {...card, ...updatedCard} : card);
      saveCards(updatedCardArray);
    }

    const searchCard = () => {
      
      let keywordsArray = [];

      if(keywords) {
        keywordsArray = keywords.toLowerCase().split(' ');
      }
      if(cardSet) {
        keywordsArray.push(cardSet.toString().toLowerCase().split())
      }
      if(keywordsArray.length > 0) {
        const searchResults = allCards.filter(card => {
          for(const word of keywordsArray) {
            if(card.cardName.toLowerCase().includes(word) ||
               card.typeText.toLowerCase().includes(word) ||
               card.oracleText.toLowerCase().includes(word) || 
               card.cardSet.toLowerCase().includes(word)) {
              return true;
            }
          }
          return false;
        });
        setSearchResults(searchResults);
      } else {
        setSearchResults(allCards);
      }
    }

  return (
    <div className="container">
      <div className="row" id='allCards'>
        <h3 className="text-decoration-underline pb-3">My Collection</h3>
        {searchResults && searchResults.map((card) => (
          <div className="col-md-6 col-lg-3 col-xxl-2" key={card.id}>
            <Card card={card} removeCard={removeCard} updateCard={updateCard} />

          </div>)
        )}
      </div >
        <AddCard addCard={addCard} />
        <div className="row mt-5 text-center align-items-end" id='searchCard'>
          <h3 className="fw-bold pb-3 text-decoration-underline" >Search Card</h3>
          <div className="col-md-5">
            <label htmlFor="textKeywords">Search by Card Name, Type, or Text</label>
            <input type="text" className='form-control' placeholder='Enter Card Name, Type, or Text' onChange={e => setKeywords(e.currentTarget.value)} value={keywords} />
          </div>
          <div className='col-md-4 '>
            <label htmlFor="search">Search by Set</label>
            <select name="search" id="search" className="form-select" value={cardSet} onChange={e => setCardSet(e.currentTarget.value)}>
              <option value="">Select Set</option>
              {_(allCards).map(card => card.cardSet).sort().uniq().map(cardSet => <option key={cardSet} value={cardSet}>{cardSet}</option>).value()}
            </select>
          </div>
          <div className='col-md-3 mt-2 '>
            <button type="button" className='btn btn-lg btn-primary' onClick={searchCard}>Search Card <FontAwesomeIcon icon={faSearch}/></button>
          </div>
        </div>
        <div className='text-end sticky-bottom'>
          <a className='btn btn-light text-end my-2 shadow' href='#header'>Top of Page <FontAwesomeIcon className='topOfPage' icon={faReply}/></a>
        </div>
    </div>

  )
}

export default App
