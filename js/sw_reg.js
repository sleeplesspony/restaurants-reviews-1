/**
* Service worker registration
*/
if (navigator.serviceWorker) {

	navigator.serviceWorker.register('/sw.js').then(function(reg) {
		console.log('Registration successful: ', reg);
	}).catch(function(err) {
		console.log('Registration failed: ', err);
	});
}
