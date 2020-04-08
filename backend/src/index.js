const express = require('express');
const { uuid, isUuid } = require('uuidv4')

const app = express();
app.use(express.json());
app.use('/projects/:id', validateProjectId);

// while the application is live, the content of this variable will be 
// available.
const projects = [];

function validateProjectId(request, response, next) {
    // validate if the ID is valid
    const { id } = request.params;
    if (!isUuid(id)) {
        // interrupt the request and return the error!
        return response.status(400).json({error: "Invalid project ID"});
    }
    return next();
}

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(logLabel);

    // if we do not call the next() function, our request will be 
    // totally interrupted
    console.time(logLabel);
    next();
    // we can have code after the call to next() to wrap behavior around the 
    // chain of interceptors
    console.timeEnd(logLabel);
}

// register the interceptor with the express app
app.use(logRequests);

// log requests will be executed for the GET /projects before the arrow function
app.get('/projects', (request, response) => {
    // we can unpack each individual param into separate variables
    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

// routes need to be unique with route name + HTTP method
// it makes semantic sense to use the name for the resource combined with 
// the HTTP method
app.post('/projects', (request, response) => {
    // access the request body
    const { title, owner } = request.body;

    const project = {id: uuid(), title, owner};
    projects.push(project);

    // return the created project
    return response.json(project);
});

// the route param :id is the id of the project we want to update
app.put('/projects/:id', (request, response) => {
    // unpack the route params values into separate vars
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({error: "Project not found: " + id})
    }
    
    const project = {id, title, owner};
    projects[projectIndex] = project;
    
    // respond with the updated project
    return response.json(project);
});

// the route param :id is the id of the project we want to delete
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({error: "Project not found: " + id})
    }
    // splice can be used to remove an item from an array
    // splice(index, numberOfPositionsToRemoveFromTheIndex)
    projects.splice(projectIndex, 1);

    // respond with No Content
    return response.status(204).send();
});

// in order for our backend to be able to respond to clients
// it needs to be listening on a port
// we should choose a port higher than 80
// there are ports that are reserved for specific services in our environment
// the first parameter is the port
// the second is a function to be executed as soon as the server is up
app.listen(3333, () => {
    console.log('Backend started! 😎')
});