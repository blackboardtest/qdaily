hubble.getXML('http://www.qdaily.com/feed.xml', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text().trim();
		var id = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));
		var dom = $(this);

		articles.get('id', id, function (article) {
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
			var image   = html.find('img').eq(0).attr('src');

			var article = {
				id: id,
				title: title,
				content: content,
				summary: summary,
				url: url,
				image: image
			};
			articles.append(article);
		});
	});
});
