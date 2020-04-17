import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepository(response.data));
  }, []);

  async function handleAddRepository() {
    await api
      .post("repositories", {
        title: "Alguma coisa aqui",
        url: "Alguma url",
        techs: ["Alguma tech", "Outra tech", "outra tech"],
      })
      .then((response) => setRepository([...repository, response.data]));
  }

  async function handleRemoveRepository(id) {
    await api
      .delete(`repositories/${id}`)
      .then(() => setRepository(repository.filter((repos) => repos.id !== id)));
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repos) => {
          return (
            <li key={repos.id}>
              {repos.title}

              <button onClick={() => handleRemoveRepository(repos.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
