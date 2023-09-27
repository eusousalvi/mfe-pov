import React, { useEffect, useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

const App = ({ name }) => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/applications")
      .then((resp) => resp.json())
      .then((data) => {
        setApps(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <header>
        <h1>{name}</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {apps &&
              apps
                .filter((app) => app?.menu)
                .map((app) => (
                  <li>
                    <Link to={app?.route}>{app?.menu}</Link>
                  </li>
                ))}
          </ul>
        </nav>
      </header>
    </BrowserRouter>
  );
};

export default App;
