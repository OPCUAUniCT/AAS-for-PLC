const cors = require('cors');
const corsOptions = {origin: '*', optionsSuccessStatus: 200}; 

module.exports = (app) => {
    const coreaas = require('../controllers/coreaas.controller.js');

    app.options('*', cors(corsOptions)) // enable pre-flight request for all requests
    
    // Create a new Configuration
    app.post('/configurations', cors(corsOptions), coreaas.createConfiguration);

    // Retrieve all Configuration
    app.get('/configurations', cors(corsOptions), coreaas.findAllConfiguration);

    // Retrieve a single Configuration with id
    app.get('/configurations/:id', cors(corsOptions), coreaas.findOneConfiguration);

    // Update a Configuration with id
    app.put('/configurations/:id', cors(corsOptions), coreaas.updateConfiguration);

    // Delete a Configuration with id
    app.delete('/configurations/:id', cors(corsOptions), coreaas.deleteConfiguration);

    // Upload a configuration with id
    app.get('/upload/:id', cors(corsOptions), coreaas.uploadConfiguration);
}