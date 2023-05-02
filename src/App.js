import './App.css';
import { Draggable, Droppable } from 'react-drag-and-drop';
import {Stack} from "react-bootstrap"
import Umpires from './Umpires';
import Games from './Games';
import { useState } from 'react';

function App() {

  let [highlightType, setHighlightType] = useState("ump")

  let [selectedGame, setSelectedGame] = useState({})
  let [selectedUmpire, setSelecteUmpire] = useState({})

  let [usedUmpires, setUsedUmpires] = useState([])


  let [games, setGames] = useState([
    {
      "A": "Morrinsville",
      "B": "Old boys",
      "Time": "16:00",
      "Turf":"GHC1",
      "Grade":"M2",
      "ump1":null,
      "ump2":null
  }, {
      "A": "Varsity",
      "B": "Old boys",
      "Time": "15:30",
      "Grade":"M3",
      "Turf":"GHC2",
      "ump1": null,
      "ump2":null
  }
  ])
  let gameLength_min = 60
  
 function convertToCsv(game){
  return game.A + "," + game.B + "," + game.Time + "," + game.Turf + "," + game.ump1?.name ?? "-" + "," + game.ump2?.name ?? "-" + "," 
 }

  return (
    <div className="App">
      <div>
        Enter Games
      <textarea rows={4} cols={30} value={games.map(game => convertToCsv(game))}></textarea>
      </div>
      <Stack direction="horizontal" gap={2} className="col-5 mx-auto container border">
      <Games className="col-7 mx-auto" setUsed={setUsedUmpires} selectedUmpire={selectedUmpire} setSelectedGame={setSelectedGame} setGames={setGames} gameLength={gameLength_min} getGames={games} highlightType={highlightType}>
      </Games>
      <Umpires className="col-5 mx-auto"  usedUmpires={usedUmpires} setSelecteUmpire={setSelecteUmpire} getSelectedGame={selectedGame} games={games} gameLength={gameLength_min} highlightType={highlightType}>
      </Umpires>
      </Stack>
    </div>
  );
}

export default App;
