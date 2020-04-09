import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import api from './services/api'
import './App.css';

function App() {
    // useState returns an array with two positions
    // first - the initial value of the state
    // second - a function to update the value of the state
    const [ projects, setProjects ] = useState([]);

    // first param - a function to be triggered
    // second param - a dependency array, changes on these variables will trigger the function
    // if the second param is empty, the function will be tirggered after the page is loaded
    useEffect(() => {
        api.get('projects').then(response => {        
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        // this would change the properties array
        //projects.push(`New project ${Date.now()}`);

        // we cannot change the value of the projects state
        // we need to recreate the array with the new info appended
        // setProject([...projects, {id: `${Date.now()}`,title:`New project ${Date.now()}`}]);

        const response = await api.post('projects', {
            title: `New project ${Date.now()}`, 
            owner: 'Guilherme de Almeida'
        })

        const project = response.data;
        setProjects([...projects, project]);
    }

    // we must always have a root node when returning more than one component
    return (
        <>
            <Header title="Projects"/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add project</button>
        </>
    )
}

export default App;