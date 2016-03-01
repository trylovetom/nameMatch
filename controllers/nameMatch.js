// Load required packages
var NameMatch = require('../models/nameMatch');
var graph = require('fbgraph');

// Create endpoint /namematch for POST
exports.postNameMatch = function(request, response) {

	// Create a new instance of the NameMatch model
	var nameMatch = new NameMatch();

	// Set the nameMatch properties that came from the POST data
	nameMatch.boy = request.body.name_b;
	nameMatch.girl = request.body.name_g;

	var matchNumber = random(60, 100);
	var goodString = randomGoodString();

	console.log(request.user.facebook.token);
	graph.setAccessToken(request.user.facebook.token);
	console.log("pass");

	var wallPost = {
		message: "愛情溫度計：" + request.body.name_b + " 與 "
		 + request.body.name_g + "\n速配指數：" + matchNumber + 
		 "\n" + goodString + "\n子晏製作，萬用無窮！！"
	};

	graph.post("/feed", wallPost, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}

		// returns the post id
		console.log("https://www.facebook.com/" + res.id); // { id: xxxxx}
	});

	graph.post("/189416308057954/feed", wallPost, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}

		// returns the post id
		console.log("https://www.facebook.com/" + res.id); // { id: xxxxx}
	});

	graph.get("/me/accounts", wallPost, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}

		for (var i = 0; i < res.data.length; ++i) {
			if (res.data[i].id === "396609957199539") {
				graph.setAccessToken(res.data[i].access_token);
				graph.post("/396609957199539/feed", wallPost, function(err, res) {
					if (err) {
						console.log(err);
						return;
					}

					// returns the post id
					console.log("https://www.facebook.com/" + res.id); // { id: xxxxx}
				});
			}
		}
	});

	// Save the nameMatch and check for errors
	nameMatch.save(function(error) {
		if (error) {
			return response.send(error);
		}

		response.render('matchNumber', {
			matchNumber: matchNumber,
			goodString: goodString
		});
	});
};

// Create endpoint /namematch for GET
exports.getNameMatch = function(request, response) {
	response.render('namematch');
};

function random(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function randomGoodString() {
	var randomNumber = random(0, 8);

	goodString = [
		"【為對方下廚】掌握對方的心，也要掌握對方的胃，偶爾為對方下廚煮飯、做做點心，不但能給對方驚喜，又能讓雙方感情更濃密，一舉兩得！",
		"【保持深情動作】牽手、擁抱、接吻不是熱戀情侶的專利，就算穩定交往，別忘了時時和伴侶一同複習這些深情動作，讓感情持續升溫！",
		"【時常讚美對方】當兩人相處久了，習慣彼此的存在，容易忽略對方的優點與付出。嘿～別吝嗇你的讚美，開口之後，你將發現讚美的力量有多大！",
		"【一同挑戰新鮮事物】別讓感情、生活一成不變，帶著伴侶一同挑戰新鮮事物，一起嘗鮮、一起High，將重新為戀情注入活力！",
		"【陪對方發洩負面情緒】陪著伴侶度過情緒低潮，將能讓兩人感情更緊密，加上適時地陪對方發洩，絕對能提升戀情溫度～",
		"【製造突如其來的驚喜】驚喜是不可或缺的升溫祕訣！無論你和伴侶處於哪個交往時期，別忘了時時給對方驚喜，讓戀情日日如新，天天都甜蜜～",
		"【規劃一場旅行】當你過於習慣身邊事物，將不自覺感到疲乏，戀情也不例外，這時候不妨帶著伴侶出門，到一個陌生的環境，享受兩個人一同探險的快樂！",
		"【愛的告白】告白！告白！告白！很重要所以說三次！你多久沒向伴侶告白？該不會只有追求的時候吧？噢～這可是戀情升溫大絕招！絕對不能不做！",
	]

	return goodString[randomNumber];
}