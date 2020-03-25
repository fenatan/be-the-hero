const express = require('express');

const OngController = require('./controllers/ongs');
const IncidentController = require('./controllers/incidents');
const ProfileController = require('./controllers/profile');
const SessionController = require('./controllers/session');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;