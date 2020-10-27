# flight-management
## Author: Abhijit Baldawa

## Tech Stack
1. Backend: Node.js (14.x)/Typescript and Mongo DB
2. Front end: React.js/Typescript/Material UI
3. Docker

## How to run:
1. git clone https://github.com/abaldawa/flight-management.git
2. cd flight-management
3. docker-compose up
4. go to http://localhost:3000 to see the UI

## Server Routes:
1. GET /flights -> Get all flights from DB
2. POST /flights -> Post a new flight detail to the DB
3. PUT /flights/:flightId -> Update an exisitng flight details
4. DELETE /flights/:flightId -> Delete an existing flight details
5. GET /flights/:flightId -> Get an existing flightId
6. POST /flights/createDummy -> Create dummy flights in DB
