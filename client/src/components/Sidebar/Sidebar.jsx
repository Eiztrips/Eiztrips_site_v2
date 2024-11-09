import React, { useState, useEffect } from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Eiztrips/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="sidebar">
      <div className="gif-container">
        <img src={require("./cat.gif")} alt="Cat GIF" />
      </div>
      <div className="repos">
        <h2>My GitHub Repositories</h2>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
