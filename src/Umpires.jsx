import Umpire from "./Umpire";
import { gameToId } from "./utils";

function Umpires({ umpires, highlightType, setSelectedUmpire, selectedGame }) {
  // Disable umpires by game - by highlight mode
  if (highlightType === "game" && selectedGame.hasOwnProperty("Time")) {
    umpires = umpires.map((umpire) => {
      // Check if umpire disabled for game & attach reason
      let invalidGame = umpire.blockedGames.find(
        (game) => gameToId(game) === gameToId(selectedGame)
      );
      if (invalidGame !== undefined)
        return {
          ...umpire,
          isUnavailable: true,
          reason: invalidGame.reason || "None",
        };
      return { ...umpire, isUnavailable: false };
    });
  } else {
    umpires = umpires.map((umpire) => {
      return { ...umpire, isUnavailable: false };
    });
  }

  // Create Table rows
  let umpComponents =
    umpires.length > 0 ? (
      umpires
        .sort((a, b) => a.Name.localeCompare(b.Name))
        .map((umpire) => (
          <Umpire
            key={umpire.Name}
            info={umpire}
            selectedUmpire={setSelectedUmpire}
            setSelectedUmpire={setSelectedUmpire}
          ></Umpire>
        ))
    ) : (
      <tr><td colSpan={9}>No umpires Found</td></tr>
    );

  return (
    <table className="table w-75">
      {/* Table headers */}
      <thead className="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Levels</th>
          <th scope="col">Teams</th>
          <th scope="col">Club</th>
          <th scope="col">Restricted Turf</th>
          <th scope="col">Blockout Dates</th>
          <th scope="col">Limited Times</th>
          <th scope="col">To be aware of</th>
          <th scope="col">Notes</th>
        </tr>
      </thead>
      <tbody>
        {/* Umpire rows*/}
        {umpComponents}
      </tbody>
    </table>
  );
}

export default Umpires;
