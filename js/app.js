var devKey = 'bc7ba55be7550cede7b5277f42632cff';

$(function() {
	$('#movie-search').submit(function(e) {
		e.preventDefault();
		var userInput = $('input[name="title"]').val();
		console.log(userInput);
		getMovieRecommendations(userInput);
	});

	$('.results').on('click', '.show-details', function() {
		$(this).parent().toggleClass("hidden");
		$(this).parent().next().toggleClass("hidden");
	});

});

function getMovieRecommendations(userInput) {
	$.ajax({
		url: "http://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			query: userInput,
			api_key: devKey
		},
		dataType: "jsonp"
	})
	.done(function(response) {
		var inputId = response.results[0].id;
		console.log(inputId);
		var baseUrl = "http://api.themoviedb.org/3/movie/" + inputId + "/similar";

		$.ajax({
			url: baseUrl,
			method: "GET",
			data: {
				api_key: devKey
			},
			dataType: "jsonp"
		})
		.done(function(response) {
			console.log(response);
			showMovieRecommendations(response.results);
		})
	})
	.fail(function() {
		// Return error text
	});
}

function showMovieRecommendations(results) {
	$.each(results, function(index, result) {

		var overviewElt = $('.templates .overview').clone();
		var detailsElt = $('.templates .details').clone();

		overviewElt.find(".title").text(result.title);
		overviewElt.find(".poster").attr("src", "https://image.tmdb.org/t/p/w160"+result.poster_path);
		overviewElt.find(".rating").text(result.vote_average);

		console.log(result.overview);
		detailsElt.find(".desc").text(result.overview);
		detailsElt.find(".release-date").text(result.release_date);
		detailsElt.toggleClass("hidden");

		$('<div class="recommendation"></div>').append(overviewElt).append(detailsElt).appendTo(".results");
		// overviewElt.appendTo(".results");
		// detailsElt.appendTo(".results").toggleClass("hidden");
	});
}