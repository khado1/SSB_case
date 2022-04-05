import { useState, useMemo } from "react";
import "./App.scss";
import json from "./data/nameSearchPop300.json";
import { getNameCount } from "./util/getNameCount";
import {
  Title,
  Input,
  Button,
  Divider,
} from "@statisticsnorway/ssb-component-library";

window.data = json.response.docs;
function App() {
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState(null);
  const [key, setKey] = useState(0);

  function results() {
    if (search) {
      const obj = getNameCount(json.response.docs, search);
      setCounts(Object.entries(obj));
    }
  }

  const clearInput = () => {
    setSearch("");
    setCounts(null);
    setKey((k) => k + 1);
  };

  //console.log(getNameCount(json.response.docs, search));
  const onSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className="main-container">
      <div className="search-container">
        <Title size="2">Navnesøk</Title>
        <p>Hvor mange heter det samme som deg?</p>

        <Input
          placeholder="Skriv inn navn her..."
          handleChange={onSearch}
          key={key}
        />
        <br />
        <Button primary onClick={results} disabled={!search}>
          Se resultat
        </Button>
      </div>
      <div>
        {counts && (
          <div className="results-information">
            <Title size="2">Resultat</Title>
            <Divider dark />
            <br></br>
            {counts.map(([name, values]) => (
              <Card name={name} counts={values} />
            ))}
            <div className="button-center">
              <Button onClick={clearInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Lukk
              </Button>
            </div>
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
      <ul className="ba">
        {sumAllThree < 4 ? (
          <li>
            <span>
              Det er færre enn fire eller ingen som heter{" "}
              <span className="name">{name}</span>
            </span>
          </li>
        ) : (
          <>
            {sumForname > 0 && sumForname !== counts.onlygiven && (
              <li>
                <span>
                  Det er {sumForname} som har{" "}
                  <span className="name">{name}</span> som sitt første fornavn
                </span>
              </li>
            )}
            {counts.onlygiven > 0 && (
              <li>
                <span>
                  Det er {counts.onlygiven} som har{" "}
                  <span className="name">{name}</span> som sitt eneste fornavn
                </span>
              </li>
            )}
            {counts.family > 0 && (
              <li>
                <span>
                  Det er {counts.family} som har{" "}
                  <span className="name">{name}</span> som sitt etternavn
                </span>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
