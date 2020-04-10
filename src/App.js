import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function listAll() {
    const repo = await api.get("/repositories", {});
    setRepositories(repo.data);
  }

  async function handleAddRepository() {
    const repo = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const response = await api.post("/repositories", repo);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`, {});
    const idx = repositories.findIndex((item) => item.id === id);

    if (idx > -1) {
      repositories.splice(idx, 1);
      setRepositories([...repositories]);
    }
  }

  useEffect(() => {
    listAll();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
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
