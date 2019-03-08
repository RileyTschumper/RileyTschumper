function InitIndex() {
  //getNavBar();
  getData(populateNav, "json/nav.json");
  //getNewsInfo();
  getData(populateNews, "json/news.json");
}

function InitResume() {
  getNavBar();
  getResumeInfo();
}

var getData = function(populateLocation, url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("Resume data recieved");
      populateLocation(JSON.parse(req.responseText));
    }
  };

  req.open("GET", url, true);
  req.send();
};

var populateNav = function(data) {
  var name = document.createElement("a");
  name.id = "name";
  name.setAttribute("href", data[0].home_link);
  name.innerHTML = data[0].name;
  document.getElementById("top-nav").appendChild(name);
  var navContainer = document.createElement("div");
  navContainer.className = "nav-container";

  var home = document.createElement("a");
  home.setAttribute("href", data[0].home_link);
  home.innerHTML = data[0].home;
  navContainer.appendChild(home);
  var projects = document.createElement("a");
  projects.setAttribute("href", data[0].projects_link);
  projects.innerHTML = data[0].projects;
  navContainer.appendChild(projects);
  var resume = document.createElement("a");
  resume.setAttribute("href", data[0].resume_link);
  resume.innerHTML = data[0].resume;
  navContainer.appendChild(resume);
  document.getElementById("top-nav").appendChild(navContainer);
};

function getNavBar() {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("Resume data recieved");
      populateNav(JSON.parse(req.responseText));
    }
  };

  req.open("GET", "json/nav.json", true);
  req.send();
}

function getResumeInfo() {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("Resume data recieved");
      populateResume(JSON.parse(req.responseText));
    }
  };

  req.open("GET", "json/resume.json", true);
  req.send();
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

function populateResume(data) {
  for (var i = 0; i < data.length; i++) {}
}

var populateNews = function(data) {
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
};
