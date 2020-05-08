import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import ProjectCard from './ProjectCard'

function App() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4444/api/projects')
      .then(res => {
        // console.log(res.data)
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <h1>My Projects</h1>
      <div>
        {projects.map(item => { return(<ProjectCard key={item.id} item={item} />)})}
      </div>
    </div>
  );
}

export default App;