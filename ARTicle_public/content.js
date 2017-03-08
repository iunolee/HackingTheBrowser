chrome.runtime.onMessage.addListener(function(message) {

    var article;
    var allTexts = [];
    var allWords = [];
    var finalWords = [];
    var para = document.getElementsByTagName('p');
    // This is for new york times articles
    var articleText = document.getElementsByClassName('story-body-text story-content');

    var typeOfSentiment = null;
    var scoreOfSentiment = null;
    var emotionAnger = null;
    var emotionDisgust = null;
    var emotionFear = null;
    var emotionJoy = null;
    var emotionSadness = null;
    var emotionAngerMinus = null;
    var emotionDisgustMinus = null;
    var emotionFearMinus = null;
    var emotionJoyMinus = null;
    var emotionSadnessMinus = null;

    var select;
    var counter = 0;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyANNXCX3qWs_hIaP8OU-JIpXYPBHYUQYzE",
        authDomain: "fir-c363f.firebaseapp.com",
        databaseURL: "https://fir-c363f.firebaseio.com",
        storageBucket: "fir-c363f.appspot.com",
        messagingSenderId: "647155671887"
    };
    firebase.initializeApp(config);


    getSentences(articleText);

    // get all texts from an article and split into words
    function getSentences(tag) {
        for (i = 0; i < tag.length; i++) {
            var text = tag[i].textContent
            if (text.indexOf("  ") !== 1) {
                if (text !== "") {
                    allTexts.push(text);
                }
            }
        }

        for (i = 0; i < allTexts.length; i++) {
            article = allTexts.join("\n");
            allWords = article.split(/\W+/);
        }
    }

    var database = firebase.database();
    var ref = database.ref('article');
    ref.push(article);

    setTimeout(loadWatson, 1000);

    // get the result of Watson API analysis
    function loadWatson() {

        var emotionRef = database.ref('sentiment');
        emotionRef.once('value').then(function(data) {
            var rawData = data.val()
            var keys = Object.keys(rawData)
            var sentimentData = rawData[keys[keys.length - 1]];
            typeOfSentiment = sentimentData.docSentiment.type;

            // mapping into hue color
            scoreOfSentiment = sentimentData.docSentiment.score;
            scoreOfSentiment = Math.floor(calMapping(scoreOfSentiment, -1, 1, 220, 60));

            emotionAnger = sentimentData.docEmotions.anger;
            emotionAnger = Math.floor(calMapping(emotionAnger, 0.05, 0.7, 0, 100));
            emotionAngerMinus = Math.floor(calMapping(emotionAnger, 0, 100, 90, 50));

            emotionDisgust = sentimentData.docEmotions.disgust;
            emotionDisgust = Math.floor(calMapping(emotionDisgust, 0.05, 0.7, 0, 100));
            emotionDisgustMinus = Math.floor(calMapping(emotionDisgust, 0, 100, 90, 50));

            emotionFear = sentimentData.docEmotions.fear;
            emotionFear = Math.floor(calMapping(emotionFear, 0.05, 0.7, 0, 100));
            emotionFearMinus = Math.floor(calMapping(emotionFear, 0, 100, 90, 50));

            emotionJoy = sentimentData.docEmotions.joy;
            emotionJoy = Math.floor(calMapping(emotionJoy, 0.05, 0.7, 0, 100));
            emotionJoyMinus = Math.floor(calMapping(emotionJoy, 0, 100, 90, 50));

            emotionSadness = sentimentData.docEmotions.sadness;
            emotionSadness = Math.floor(calMapping(emotionSadness, 0.05, 0.7, 0, 100));
            emotionSadnessMinus = Math.floor(calMapping(emotionSadness, 0, 100, 90, 50));

            console.log(typeOfSentiment, scoreOfSentiment);
            console.log(emotionAnger, emotionDisgust, emotionFear, emotionJoy, emotionSadness);
            console.log(emotionAngerMinus, emotionDisgustMinus, emotionFearMinus, emotionJoyMinus, emotionSadnessMinus);

        }, function(err) {});

        function calMapping(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        setTimeout(displayKeyword, 1000);
    }

    // display words and the result of analysis with color variations
    function displayKeyword() {
        for (i = 0; i < allWords.length; i++) {
            var checkedWord = allWords[i];
            if (finalWords.indexOf(checkedWord) !== -1) {
                checkedWord = null;
            } else {
                finalWords.push(checkedWord);
            }
        }

        console.log(allTexts);
        console.log(finalWords);

        $('body').children().remove();
        $('head').children().remove();

        // background color : sentiment of article (negative or positive)
        document.body.style.backgroundColor = "hsl(" + scoreOfSentiment + ", 80%, 80%)";

        // shuffling words with gradient color (5 emotional states)
        var displayWord = document.createElement('h1');
        displayWord.setAttribute('id', 'displayWord');
        displayWord.setAttribute("style", "-webkit-background-clip:text");
        // anger : 10, disgust : 35, fear : 260, joy: 60, sandess: 220
        displayWord.style.backgroundImage = "-webkit-linear-gradient(left, hsl(10, " + emotionAnger + "%, " + emotionAngerMinus + "%) 25%, hsl(35, " + emotionDisgust + "%, " + emotionDisgustMinus + "%) 40%, hsl(260, " + emotionFear + "%, " + emotionFearMinus + "%) 60%, hsl(60, " + emotionJoy + "%, " + emotionJoyMinus + "%) 80%, hsl(220, " + emotionSadness + "%, " + emotionSadnessMinus + "%) 95%)";

        var link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Alfa+Slab+One|Heebo:900';
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(link);

        displayWord.style.fontFamily = 'Heebo, sans-serif';
        displayWord.style.fontSize = '250px';
        displayWord.style.letterSpacing = '-15px';
        displayWord.style.position = "fixed";
        displayWord.style.top = "50%";
        displayWord.style.paddingLeft = "20px";
        displayWord.style.paddingRight = "20px";
        // displayWord.style.left = "5%";
        // displayWord.style.right = "5%";
        displayWord.style.marginTop = "-160px";
        displayWord.style.color = 'transparent';

        $('body').append(displayWord);

        // display a word at a time
        setInterval(next_word, 1000);

        function next_word() {
            // displayWord.innerHTML = finalWords[counter % finalWords.length];
            // counter++;
            select = Math.floor(Math.random() * finalWords.length);
            displayWord.innerHTML = finalWords[select];
            select = null;
            $('h1').fadeIn(200).delay(300).fadeOut(200)
        }
    }
});
