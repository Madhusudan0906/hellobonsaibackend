const express = require( 'express' );
const PORT = process.env.PORT || 5000;
const dbConnect = require( "./config/db" );
const cookieParser = require( 'cookie-parser' );
const users = require( "./features/users/users.router" );
const clients = require( "./features/clients/client.router" );
const projects = require( "./features/projects/projects.router" );
const cors = require( 'cors' );
const tasks = require( './features/tasks/Tasks.router' );
const app = express();
app.use( cors({
    origin: '*'
}) );
app.use( cookieParser() );
app.use( express.json() );
app.use( "/users", users );
app.use( "/clients", clients );
app.use( "/projects", projects );
app.use( "/tasks", tasks )

app.use( "/", function ( req, res ) {
    res.json( { "message": "hello world!" } );
} )


app.listen( PORT, async () => {
    await dbConnect();
    console.log( `server listening at PORT : ${ PORT }` );
} )