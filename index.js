var channels = [1068, 29, 18, 4, 3, 54];
var timestamp = Date.parse(new Date()) / 1000;

hubble.getJSON('http://www.qdaily.com/homes/articlemore/' + timestamp + '.json', function (error, response, data) {
	data.data.feeds.forEach(function (feed) {
		articles.get('id', feed.post.id, function(article) {
			if (article) {
				return;
			}

			var url = "http://m.qdaily.com/mobile/articles/" + feed.post.id + ".html";
			hubble.getHtml(url, function (error, response, $) {
				// data-src -> src
				$('[data-src]').each(function(){
					var $img = $(this);
					$img.attr('src', $img.attr('data-src'));
				});

				var content = $('.article-detail-bd .detail').html();
				var article = {
					id: feed.post.id,
					title: feed.post.title,
					summary: feed.post.description,
					content: content,
					url: url,
					image: feed.image,
					channel: 0
				};
				articles.append(article);
			});
		});
	});
});

channels.forEach( function(tag) {
	hubble.getJSON("http://www.qdaily.com/tags/tagmore/" + tag + "/" + timestamp + '.json', function (error, response, data) {
		data.data.feeds.forEach(function (feed) {
			articles.get('id', feed.post.id, function(article) {
				if (article) {
					return;
				}
	
				var url = "http://www.qdaily.com/articles/" + feed.post.id + ".html";
				hubble.getHtml(url, function (error, response, $) {
					// data-src -> src
					$('[data-src]').each(function(){
						var $img = $(this);
						$img.attr('src', $img.attr('data-src'));
					});

					$('.embed-mask').remove();
					var content = $('.article-detail-bd .detail').html();
					var article = {
						id: feed.post.id,
						title: feed.post.title,
						summary: feed.post.description,
						content: content,
						url: url,
						image: feed.image,
						channel: tag
					};
					articles.append(article);
				});
			});
		});
	});
});
