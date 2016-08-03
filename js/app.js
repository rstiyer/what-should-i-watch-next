var devKey = 'bc7ba55be7550cede7b5277f42632cff';

$(function() {
	$('#movie-search').submit(function(e) {
		e.preventDefault();
		var userInput = $('input[name="title"]').val();
		console.log(userInput);
		getMovie(userInput);
	});
});

function getMovie(userInput) {
	$.ajax({
		url: "http://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			query: userInput,
			api_key: devKey
		}
	})
	.done(function(response) {
		console.log(response);
	});
}