port=40000
host=http://localhost:$(port)
db_connect=https://hughrawlinson:however1@hughrawlinson.cloudant.com
id=404fc514584e532f1527d7e631dc1dbc

start:
	node ../jams-server/server.js -p $(port) -d $(db_connect) &

all:
	curl $(host)/jams

upload:
	curl -R example.json $(host)/jams

one:
	curl $(host)/jams/$(id)
