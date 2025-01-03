const fastify = require('fastify')({ logger: true, trustProxy: true })
const multipart = require('@fastify/multipart');
require('dotenv').config();

const fs = require('fs');
const pipeline = require('stream').pipeline;
const util = require('util');
const path = require('path')


const usersRoute = require('./src/routes/user');
const authRoutes = require('./src/routes/auth');
const invitationRoutes = require('./src/routes/invitations');
const eventsRoutes = require('./src/routes/event');
const pictureRoutes = require('./src/routes/picture');

fastify.register(require('@fastify/jwt'), {
  secret: 'd76b61867737f3dcfb299196dae9054f',
});
fastify.register(multipart,{
  limits: {
    fileSize: 9.6e+16,
    files: 10,
  }
});
//static files
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
  constraints: {} // optional: default {}
})


const productsRoute = require('./src/routes/products');
fastify.register(usersRoute)
//Product routes
fastify.register(productsRoute.getProducts)
//Auth routes
fastify.register(authRoutes.registration)
fastify.register(authRoutes.login)
fastify.register(authRoutes.refreshToken)
fastify.register(authRoutes.validateUser);

//invitations
fastify.register(invitationRoutes.getInvitationsOfUser);
fastify.register(invitationRoutes.sendInvitationByEmail);

//evenet
fastify.register(eventsRoutes.createEvent);
fastify.register(eventsRoutes.getEventsOfUser);
fastify.register(eventsRoutes.getUsersOfEvent);

//picutres
fastify.register(pictureRoutes.sendPicture);
//files
fastify.register(pictureRoutes.sendFiles);

///CORS

fastify.addHook('preHandler',(req,res, done) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  require('./src/middleware/verification_middleware').verify(req,res,done);
});


///END CORS

fastify.get('/upload', async (req, reply,done) => {

  reply.headers({ 'Content-Type': 'text/html', 'charset': 'utf-8' });
  reply.send(`<html><head></head><body>
               <form method="POST" enctype="multipart/form-data" >
                <input type="text" name="textfield"><br>
                <input type="file" name="filefield"><br>
                <input type="submit">
              </form>
            </body></html>`)
       
});


// fastify.post('/upload', async (req, reply,done) => {
//   const data = await req.file();
  
//   (await data.toBuffer()).length
//   const pump = util.promisify(pipeline)
//   await pump(data.file, fs.createWriteStream(`./files/${data.filename}`))
//   console.log(data)
// });

fastify.get('/file', async (req, reply) => {

  const filename = 'DETALLE_CV_ALBIN_ALBA_RAUL.pdf';
  const filepath = './files/DETALLE_CV_ALBIN_ALBA_RAUL.pdf';
  reply.headers({
    "Content-Type": "application/octet-stream",
    "Content-Disposition": "attachment; filename=" + filename
  });
  const stream = fs.createReadStream(filepath);
  return reply.send(stream);
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      name: { type: 'string' }
    },
    // the response needs to be an object with a `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hola: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hola: 'world' }
  }
})

const start = async () => {
  try {
    await fastify.listen({ host: '::', port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()


module.exports = {
  fastifyPlugin: fastify
}