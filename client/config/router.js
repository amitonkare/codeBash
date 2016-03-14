//Router.configure({layoutTemplate: 'main', notFoundTemplate: 'error_page'});

Router.route('/', {
	name: 'plantDetails',
	template: 'plantDetails'
});

Router.route('/invoiceDetailsLandingPage', {
	name: 'invoiceDetailsLandingPage',
	template: 'invoiceDetailsLandingPage'
});

Router.route('/purchaseDetailsLandingPage', {
	name: 'purchaseDetailsLandingPage',
	template: 'purchaseDetailsLandingPage'
});

Router.route('/plantTypeDetails', {
	name: 'plantTypeDetails',
	template: 'plantTypeDetails'
});

Router.route('/transactionDetails', {
	name: 'transactionDetails',
	template: 'transactionDetails'
});

Router.route('/buyerDetails', {
	name: 'buyerDetails',
	template: 'buyerDetails'
});

Router.route('/invoiceDetails', {
	name: 'invoiceDetails',
	template: 'invoiceDetails'
});

Router.route('/sellerDetails',{
	name:'sellerDetails',
	template:'sellerDetails'
});

Router.route('/purchaseDetails',{
	name:'purchaseDetails',
	template:'purchaseDetails'
});