const picturesController = require('../controllers/picturesController');



function sendPicture(fastify, opts, done) {

    fastify.post('/picture/event',  picturesController.sendPictureToEvent);
    done();
}

function sendFiles(fastify, opts,done){ 

    fastify.post('/upload',  picturesController.sendFiles);
    done();

}




//TODO: GETBYEVENT



module.exports = {
    sendPicture: sendPicture,
    sendFiles,sendFiles
}