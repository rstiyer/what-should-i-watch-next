var devKey = 'R0y5wSMxSN8qx1bhQYEl0A';

$(function() {
	$('#book-search').submit(function(e) {
		e.preventDefault();
		var userInput = $('input[name="title"]').val();
		console.log(userInput);
		getBook(userInput);
	});
});

function getBook(userInput) {
	$.ajax({
		url: "https://www.goodreads.com/search/index.xml",
		method: "GET",
		data: {
			q: userInput,
			key: devKey,
			'search[field]': 'title'
		}
	})
	.done(function(response) {
		console.log(response);
	});
}