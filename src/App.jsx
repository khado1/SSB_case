import debounce from "lodash.debounce";
import { useState, useMemo } from "react";
import "./App.scss";
import json from "./data/nameSearchPop300.json";
import { getNameCount } from "./util/getNameCount";
import { Title, Input, Button } from "@statisticsnorway/ssb-component-library";

window.data = json.response.docs;
function App() {
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState(null);

  function results() {
    if (search) {
      const obj = getNameCount(json.response.docs, search);
      setCounts(Object.entries(obj));
    }
  }

  //console.log(getNameCount(json.response.docs, search));
  const onSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className="main-container">
      <div className="information-container">
        <Title size="2">Navnesøk</Title>
        <p>Hvor mange heter det samme som deg?</p>

        <Input placeholder="Search for name..." handleChange={onSearch} />
        <br />
        <Button primary onClick={results}>
          Se resultat
        </Button>

        {counts && (
          <div>
            {counts.map(([name, values]) => (
              <Card name={name} counts={values} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const Card = ({ name, counts }) => {
  const sumForname = counts.onlygiven + counts.firstgiven;
  const sumAllThree = sumForname + counts.family;
  return (
    <div>
      {sumAllThree < 4 ? (
        <h4>
          Det er færre enn fire eller ingen som heter{" "}
          <span className="name">{name}</span>
        </h4>
      ) : (
        <>
          <h3></h3>
          {sumForname > 0 && sumForname !== counts.onlygiven && (
            <h4>
              Det er {sumForname} som har <span className="name">{name}</span>{" "}
              som sitt første fornavn
            </h4>
          )}
          {counts.onlygiven > 0 && (
            <h4>
              Det er {counts.onlygiven} som har{" "}
              <span className="name">{name}</span> som sitt eneste fornavnavn
            </h4>
          )}
          {counts.family > 0 && (
            <h4>
              Det er {counts.family} som har{" "}
              <span className="name">{name}</span> som sitt etternavn
            </h4>
          )}
        </>
      )}
    </div>
  );
};
