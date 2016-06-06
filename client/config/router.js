//Router.configure({layoutTemplate: 'main', notFoundTemplate: 'error_page'});

Router.route('/', {
	name: 'plantDetails',
	template: 'plantDetails'
});

Router.route('/finalInvoicePreview', {
	name: 'finalInvoicePreview',
	template: 'finalInvoicePreview'
});

Router.route('/finalPurchasePreview', {
	name: 'finalPurchasePreview',
	template: 'finalPurchasePreview'
});

Router.route('/buyerReports', {
	name: 'buyerReports',
	template: 'buyerReports'
});

Router.route('/invoiceReports', {
	name: 'invoiceReports',
	template: 'invoiceReports'
});

Router.route('/purchaseReports', {
	name: 'purchaseReports',
	template: 'purchaseReports'
});

Router.route('/stockReports', {
	name: 'stockReports',
	template: 'stockReports'
});

Router.route('/sellerReports', {
	name: 'sellerReports',
	template: 'sellerReports'
});

Router.route('/invoiceEdit', {
	name: 'invoiceEdit',
	template: 'invoiceEdit'
});

Router.route('/purchaseEdit', {
	name: 'purchaseEdit',
	template: 'purchaseEdit'
})

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

Router.route('/plantCategoryDetails', {
	name: 'plantCategoryDetails',
	template: 'plantCategoryDetails'
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