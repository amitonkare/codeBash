//Router.configure({layoutTemplate: 'main', notFoundTemplate: 'error_page'});

Router.route('/', {
	name: 'plantDetails',
	template: 'plantDetails'
});

Router.route('/transactionDetails', {
	name: 'transactionDetails',
	template: 'transactionDetails'
});

Router.route('/buyerDetails', {
	name: 'buyerDetails',
	template: 'buyerDetails'
});
