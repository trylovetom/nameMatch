// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': 'your-fb-id-here', // your App ID
        'clientSecret': 'your-fb-secret-here', // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    }

};