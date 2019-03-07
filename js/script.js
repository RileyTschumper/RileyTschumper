function InitIndex() {
  getNewsInfo();
}

function getNewsInfo() {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("News data recieved");
      populateNews(JSON.parse(req.responseText));
    }
  };

  req.open("GET", "json/news.json", true);
  req.send();
}

function populateNews(data) {
  for (var i = 0; i < data.length; i++) {
    var newsDiv = document.createElement("div");
    newsDiv.className = "news-container";
    var newsDivLeft = document.createElement("div");
    newsDivLeft.className = "news-container-left";
    newsDiv.appendChild(newsDivLeft);
    var img = document.createElement("img");
    img.className = "news-image";
    img.setAttribute("src", data[i].image);
    newsDivLeft.appendChild(img);
    var newsDivRight = document.createElement("div");
    newsDivRight.className = "news-container-right";
    newsDiv.appendChild(newsDivRight);
    var heading = document.createElement("h4");
    heading.innerHTML = data[i].headline;
    newsDivRight.appendChild(heading);
    var date = document.createElement("h5");
    date.innerHTML = data[i].date;
    newsDivRight.appendChild(date);
    var text = document.createElement("p");
    text.innerHTML = data[i].text;
    newsDivRight.appendChild(text);
    document.body.appendChild(newsDiv);
  }
}
