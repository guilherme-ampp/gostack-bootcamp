// Let's connect to the database
import { createConnection } from 'typeorm';

// this method will look up configuration from the ormconfig.json
// some yarn typeorm CLI utilities will also look up the config file
createConnection();
