require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path')
const { authMiddleware } = require('./utils/auth')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('./models/User')

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()
const server = new ApolloServer({
	typeDefs,
	resolvers
})

// Import stripe.js implementation
require('./stripe')(app)

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
	await server.start()

	app.use(express.urlencoded({ extended: false }))
	app.use(express.json())

	// Serve up static assets
	app.use('/images', express.static(path.join(__dirname, '../client/images')))

	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: authMiddleware
		})
	)

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')))

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'))
		})
	}

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log('FIVE_CREDITS:', process.env.FIVE_CREDITS)
			console.log('FIFTEEN_CREDITS:', process.env.FIFTEEN_CREDITS)
			console.log('TWENTY_FIVE_CREDITS:', process.env.TWENTY_FIVE_CREDITS)

			console.log(`API server running on port ${PORT}!`)
			console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
		})
	})
}

// Call the async function to start the server
startApolloServer()
