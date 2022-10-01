const express = require( 'express' );
const authMiddleware = require( '../middlewares/auth.middleware' );
const Tasks = require( "./Tasks.model" );

const app = express.Router();


app.get( "/", async ( req, res ) => {
    try {
        let task = await Tasks.find();
        res.send( task );
    } catch ( e ) {
        res.status( 500 ).send( e );
    }

} );
app.post( "/", async ( req, res ) => {
    try {
        let task = await Tasks.create( { ...req.body } );
        res.send( task );
    } catch ( e ) {
        res.status( 500 ).send( e );
    }
} )
app.patch( "/:id",  async ( req, res ) => {
    try {
        let id = req.params.id;
        console.log(id);
        let task = await Tasks.findByIdAndUpdate( { _id:id }, { ...req.body } );
        console.log(task);
        res.send( task );
        // res.send(id)
    } catch ( e ) {
        res.status( 500 ).send( e );
    }
} );
app.delete( "/:id",  async ( req, res ) => {
    try {
        let id = req.params;
        let task = await Tasks.findByIdAndDelete( { id } );
        res.send( task );
    } catch ( e ) {
        res.status( 500 ).send( e );
    }
} )
module.exports = app;