var request = require( 'request' );
var createuuid = require( 'uuidv5' );
var os = require( 'os' );
var config = require( './config.js' );

var URL_AUTHENTICATE	= 'https://api.mobile.endomondo.com/mobile/auth';
var URL_WORKOUTS		= 'https://api.mobile.endomondo.com/mobile/api/workout';
var URL_WORKOUT_GET 	= 'https://api.mobile.endomondo.com/mobile/api/workout/get';
var URL_WORKOUT_POST	= 'https://api.mobile.endomondo.com/mobile/api/workout/post';
var URL_TRACK			= 'https://api.mobile.endomondo.com/mobile/track';
var URL_PLAYLIST		= 'https://api.mobile.endomondo.com/mobile/playlist';

var URL_ACCOUNT_GET		= 'https://api.mobile.endomondo.com/mobile/api/profile/account/get';
var URL_ACCOUNT_POST	= 'https://api.mobile.endomondo.com/mobile/api/profile/account/post';

var uuid = createuuid( 'dns', os.hostname() );

console.log( uuid );

// found these from other API implementations, they're not used at the moment
var device_info		= {
	'deviceId':		uuid,
	'os':			'Android',
	'model':		'HTC Vision',
	'osVersion':	'2.3.7',
	'vendor':		'github/swyphcosmo',
	'appVariant':	'M-Pro',
	'country':		'GB',
	'v':			'2.4', // No idea, maybe api version?
	'appVersion':	'7.1'
}

console.log( config );

console.log( device_info );

var params = device_info;
params.action = 'pair';
params.email = config.email;
params.password = config.password;

console.log( params );

// var useragent = "Dalvik/1.4.0 (Linux; U; " + device_info.os + " " + device_info.osVersion + "; " + device_info.model + " Build/GRI40)";

// console.log( useragent );

// var response = request.get( { url: URL_AUTHENTICATE, agentOptions: params, json: true, headers: { 'User-Agent': useragent } }, function( error, incomingmessage, body )
// {
// 	console.log( body );
// } );

var url = URL_AUTHENTICATE + "?deviceId=" + params.deviceId;
url += "&email=" + params.email;
url += "&password=" + params.password;
url += "&country=" + params.country;
url += "&action=" + params.action;

console.log( url );

var authenticationtoken = null;

var response = request.get( { url: url }, function( error, incomingmessage, body )
{
	// console.log( error );
	// console.log( incomingmessage );
	console.log( body );

	var lines = body.split( '\n' );

	console.log( lines );

	if( lines[ 0 ] == 'OK' )
	{
		console.log( 'Paired' );

		lines.forEach( function( element, index, array ){
			var tokens = element.split( '=' );
			if( tokens[ 0 ] == 'authToken' )
			{
				authenticationtoken = tokens[ 1 ];
			}
		});

		console.log( authenticationtoken );

		var maxresults = 2;

		url = URL_WORKOUTS + "/list?";
		url += "authToken=" + authenticationtoken;
		url += "&maxResults=" +  maxresults;

		console.log( url );

		var workoutresponse = request.get( { url: url }, function( error, incomingmessage, body ) 
		{
			console.log( body );

			var data = JSON.parse( body );

			console.log( data );
		});
	}
} );

