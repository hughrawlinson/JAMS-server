# JAMS Ingestion Server

_Nobody used this, so I archived it. If you would like to use it and take ownership of it, let me know._

This is a small Node.js server that exposes a CR (as in CRUD) RESTful API for generic JAMS data, backed by MongoDB. It could (and should) be extended to provide read and update features specific to the JAMS format so that it can be deployed as a generic server for a wide variety of musicological data storage, however at the moment it's streamlined for my specific research into velocity aware trajectorial playlisting.

## Usage

Install the server with `npm install -g jams-server`.
Set the environmental variables "JAMS_MONGO_URI" to point at your mongodb instance, and "JAMS_PORT" to specify the port your jams server should run on.
Run `jams-server` to spin up a service.

## API Documentation

* GET $SERVER/jams/:id
  * Returns the specific JAMS file for the specified identifier
* PUT $SERVER/jams
  * Accepts JAMS formatted JSON and inserts it into the database, returns an identifier
* GET $SERVER/jams
	* Returns a list of jams files
