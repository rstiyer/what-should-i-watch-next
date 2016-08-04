var devKey = 'bc7ba55be7550cede7b5277f42632cff';

$(function() {
	$('#movie-search').submit(function(e) {
		e.preventDefault();
		var userInput = $('input[name="title"]').val();
		$('.results').empty();
		getMovieRecommendations(userInput);
		$(this)[0].reset();
	});

	$('.results').on('click', '.show-details', function() {
		$(this).parent().toggleClass("hidden");
		$(this).parent().next().toggleClass("hidden");
	});

	$('.results').on('click', '.show-overview', function() {
		$(this).parent().toggleClass("hidden");
		$(this).parent().prev().toggleClass("hidden");
	});
});

function getMovieRecommendations(userInput) {
	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			query: userInput,
			api_key: devKey
		},
		dataType: "jsonp"
	})
	.done(function(response) {
		if (response.total_results == 0) {
			$('.results').append('<p>Sorry, the movie you entered could not be found. Try again with a different title!</p>');
			return;
		}
		var inputId = response.results[0].id;
		var baseUrl = "https://api.themoviedb.org/3/movie/" + inputId + "/similar";

		$.ajax({
			url: baseUrl,
			method: "GET",
			data: {
				api_key: devKey
			},
			dataType: "jsonp"
		})
		.done(function(response) {
			showMovieRecommendations(response.results);
		})
		.fail(function(jqXHR, error) {
			$('.results').append('<p>Sorry, the movie you entered could not be found. Try again with a different title!</p>');
		});
	})
	.fail(function(jqXHR, error) {
		$('.results').append('<p>Sorry, the movie you entered could not be found. Try again with a different title!</p>');
	});
}

function showMovieRecommendations(results) {
	$.each(results, function(index, result) {
		if (index % 3 === 0) {
			$('.results').append('<div class="row"></div>');
		}

		var recommendationElt = $('.templates .recommendation').clone();

		recommendationElt.find(".title").text(result.title).attr("href", "https://www.themoviedb.org/movie/"+result.id);
		recommendationElt.find(".poster").attr("src", "https://image.tmdb.org/t/p/w160"+result.poster_path);
		recommendationElt.find(".rating").text(result.vote_average);

		recommendationElt.find(".desc").text(result.overview);
		recommendationElt.find(".release-date").text(result.release_date);
		recommendationElt.find(".details").toggleClass("hidden");

		$(recommendationElt).appendTo('.row:last-child');
	});
}