hubble.getXML('http://www.qdaily.com/feed.xml', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text();
		var key = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));
		var dom = $(this);

		articles.get('key', key, function (article) {
			if (article) {
				return;
			}

			var title = dom.find('title').text().trim();
			var body  = dom.find('description').text();
			var $ = cheerio.load('<html>' + body + '</html>');
			var html = $('html').eq(0);
			html.find('style').remove();

			var content = html.html().trim()
			var summary = html.text().trim().substring(0, 50);

			var article = {
				key: key,
				title: title,
				content: content,
				summary: summary,
				url: url
			};
			articles.append(article);
		});
	});
});
