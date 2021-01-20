import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes'
import http from 'http'
import multipart from 'connect-multiparty'
import socketio from 'socket.io'
import message from './models/message'

const cors = require('cors');

const fs = require('fs');

const app = express()
const server = http.Server(app)
const io = socketio(server) //// for socket


app.use(function (req, res, next) {
	if (process.env.NODE_ENV && process.env.NODE_ENV == 'test') {
		req.settings = require('./test/config/settings')
	} else {
		req.settings = require('./config/settings')
	}
	return next()
})

// ----- SOCKET IO -----

io.on('connection', function (socket) {
	console.log('connection');

	
	// On conversation entry, join broadcast channel
	socket.on('enter conversation', (conversation) => {
		console.log('conversation ', conversation);
		socket.join(conversation);

	});
	
	socket.on('leave conversation', (conversation) => {
		socket.leave(conversation);
		// debug('left ' + conversation);
	})
	
	socket.on('new message', payload => {
		message.create(payload)
			.then(res => {
				console.log('message created ', res);
				io.in(res.conversationId).emit('refresh messages', res) // this should be

				//socket.broadcast.to(res.conversationId).emit('refresh messages', res) 

			})
			.catch(err => {
				console.log('err ', err);
			})
	});




});

app.set('socketio', io);

// -----

// cache control error 304
app.disable('etag');

// CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, x-access-token, x-accepted-format')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	next()
})

app.use(multipart({
	uploadDir: '/tmp/'
}))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({
	parameterLimit: 100000,
	limit: '50mb',
	extended: true
}));

app.use(cookieParser())


/*
 * @static content
 * app.use('/speechToText', express.static(path.join(__dirname, './static/speechToText.html')));
 * app.use('/files', express.static(path.join(__dirname, './static/files/')));
 */
app.use('/api', routes)

app.use('/', express.static(path.join(__dirname, '../adm/dist/')))
app.use('/files', express.static(path.join(__dirname, '../adm/files/')))

app.get('/*',  function(req, res) {
	res.sendFile('index.html', { root: '../adm/dist/' })
})

export {app, server}
