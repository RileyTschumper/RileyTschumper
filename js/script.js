var translation_list;

function InitIndex() {
  //getNavBar();
  getData(populateNav, "json/nav.json");
  //getNewsInfo();
  getData(populateNews, "json/news.json");

  translate("hello my name is", "el");
  getTranslationList();
}

function InitResume() {
  getData(populateNav, "json/nav.json");
  //getResumeInfo();
  getData(populateResume, "json/resume.json");
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

var translate = function(text, language){
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("tranlated date recieved");
      console.log(JSON.parse(req.responseText));
    }
  };

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190310T205737Z.4bb98a2cc12eb124.f6b1e507245c5568148391050b6e4906c0a926c8&text=" + text + "&lang=" + language;
  req.open("GET", url, true);
  req.send();
};

function getTranslationList(){
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("tranlation list recieved");
      translation_list = JSON.parse(req.responseText));
    }
  };

  var url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20190310T205737Z.4bb98a2cc12eb124.f6b1e507245c5568148391050b6e4906c0a926c8&ui=en";
  req.open("GET", url, true);
  req.send();

}

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



function populateResume(data) {
  for (var i = 0; i < data.length; i++) {
    //title
    var title = document.createElement("h1");
    title.innerHTML = data[0].title;
    document.getElementById("resume").appendChild(title);

    //technical skills
    var skills = document.createElement("h2");
    skills.innerHTML = data[0].skills.title;
    document.getElementById("resume").appendChild(skills);

    var skills_list = document.createElement("ul");

    for(var j = 0; j < data[0].skills.skills_list.length; j++){
      var skill = document.createElement("li");
      skill.innerHTML = data[0].skills.skills_list[j];
      skills_list.appendChild(skill);
    }
    document.getElementById("resume").appendChild(skills_list);

    //work experience
    var work_experience = document.createElement("h2");
    work_experience.innerHTML = data[0].work_experience.title;
    document.getElementById("resume").appendChild(work_experience);

    for(var z = 0; z < data[0].work_experience.jobs.length; z++){
      var job_title = document.createElement("h3");
      job_title.innerHTML = data[0].work_experience.jobs[z].title;
      document.getElementById("resume").appendChild(job_title);

      var workplace = document.createElement("h4");
      if(data[0].work_experience.jobs[z].workplace_link){
        var job_link = document.createElement("a");
        job_link.setAttribute("href", data[0].work_experience.jobs[z].workplace_link);
        job_link.innerHTML = data[0].work_experience.jobs[z].workplace;
        workplace.appendChild(job_link);
      }
      else{
        workplace.innerHTML = data[0].work_experience.jobs[z].workplace;
      }
      document.getElementById("resume").appendChild(workplace);

      var duties = document.createElement("p");
      duties.innerHTML = data[0].work_experience.jobs[z].duties;
      document.getElementById("resume").appendChild(duties);

    }

    //education
    var education = document.createElement("h2");
    education.innerHTML = data[0].education.title;
    document.getElementById("resume").appendChild(education);

    var school = document.createElement("h3");
    var school_link = document.createElement("a");
    school_link.setAttribute("href", data[0].education.school_link);
    school_link.innerHTML = data[0].education.school;
    school.appendChild(school_link);
    document.getElementById("resume").appendChild(school);

    var location = document.createElement("p");
    location.innerHTML = data[0].education.location;
    document.getElementById("resume").appendChild(location);

    var degree = document.createElement("p");
    degree.innerHTML = data[0].education.degree;
    document.getElementById("resume").appendChild(degree);

    var graduation = document.createElement("p");
    graduation.innerHTML = data[0].education.graduation;
    document.getElementById("resume").appendChild(graduation);
  }
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
