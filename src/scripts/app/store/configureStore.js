if (__DEVELOPMENT__) {
	// const configureStore = require('./configureStore.dev');
	module.exports = require('./configureStore.dev');
} else {
	// const configureStore = require('./configureStore.prod');
	module.exports = require('./configureStore.prod');
}
