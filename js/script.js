function Init(){
  console.log("did something");
}

function InitIndex() {
  var language = "en";
  getTranslationListPromise().then(data => getNavData(populateNav, data, language, "json/nav.json"));
  getData(populateNews, language, "json/news.json");
}

function InitResume() {
  var language = "en";
  getTranslationListPromise().then(data => getNavData(populateNav, data, language, "json/nav.json"));
  getData(populateResume, language, "json/resume.json");
}

function InitProjects() {
  var language = "en";
  getTranslationListPromise().then(data => getNavData(populateNav, data, language, "json/nav.json"));
  getData(populateProjects, language, "json/projects.json");
}

var getNavData = function(populateLocation, translateData, language, url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("Nav data recieved");
      console.log("language " + language);
      populateLocation(JSON.parse(req.responseText), translateData, language);
    }
  };

  req.open("GET", url, true);
  req.send();
};

var getData = function(populateLocation, language, url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("Nav data recieved");
      console.log("language " + language);
      populateLocation(JSON.parse(req.responseText), language);
    }
  };

  req.open("GET", url, true);
  req.send();
};
/*
var getData = function(populateLocation, url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("data recieved");
      populateLocation(JSON.parse(req.responseText));
    }
  };

  req.open("GET", url, true);
  req.send();
};
*/

function translateResult(language){
  getTranslationListPromise().then(data => getNavData(populateNav, data, language, "json/nav.json"));
  if(document.getElementById("news") != null){
    console.log("asddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    getData(populateNews, language, "json/news.json");
  }
  else{
    getData(populateResume,language,"json/resume.json");
  }

  console.log("language code: " + language);
}

/*
var translate = function(text, language){
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log("tranlated data recieved");
      return JSON.parse(req.responseText);
    }
  };

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190310T205737Z.4bb98a2cc12eb124.f6b1e507245c5568148391050b6e4906c0a926c8&text=" + text + "&lang=" + language +"&format=plain";
  req.open("GET", url, true);
  req.send();
};
*/

var translatePromise = function(text, language){
  var p = new Promise((resolve,reject) => {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        console.log("tranlated data recieved");
        var data = JSON.parse(req.responseText);
        console.log("heeereee " + data.text[0]);
        //resolve(data.text[0], text);
        resolve(data.text[0]);
      }
      else if (req.readyState == 4) {
        reject("Error: " + req.status);
      }
    };
  
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190310T205737Z.4bb98a2cc12eb124.f6b1e507245c5568148391050b6e4906c0a926c8&text=" + text + "&lang=" + language;
    req.open("GET", url, true);
    req.send();

  });
  return p;
}


function getTranslationListPromise(){
  var p = new Promise((resolve,reject) => {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        console.log("tranlation list recieved");
        var data = JSON.parse(req.response);
        resolve(data);
      }
      else if (req.readyState == 4) {
        reject("Error: " + req.status);
      }
    };

    var url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20190310T205737Z.4bb98a2cc12eb124.f6b1e507245c5568148391050b6e4906c0a926c8&ui=en";
    req.open("GET", url, true);
    req.send();
  });
  return p;

}

var populateProjects = async function(data, language){
  //clears projects
  document.getElementById("projects").innerHTML = "";

  var page_title = document.createElement("h1");
  page_title.innerHTML = data[0].page_title;
  document.getElementById("projects").appendChild(page_title);

  var project_list = document.createElement("ul");
  project_list.id = "project_list";
  for(var i = 1; i < data.length;  i++){
    var list_item = document.createElement("li");
    list_item.id = "projectId" + data[i].id;
    var image = document.createElement("img");
    image.setAttribute("src",data[i].image_thumbnail);
    var onclickFunction = "openLightbox(" + data[i].id + ");";
    image.setAttribute("onclick",onclickFunction);
    list_item.appendChild(image);

    var project_details = document.createElement("div");
    project_details.className = "project_details";
    list_item.appendChild(project_details);

    var title = document.createElement("h3");
    title.id = "project_title" + data[i].id;
    title.innerHTML = data[i].title;
    project_details.appendChild(title);

    var project_description = document.createElement("p");
    project_description.id = "project_description" + data[i].id;
    project_description.className = "project_description";
    project_description.innerHTML = data[i].description;
    project_details.appendChild(project_description);

    project_list.appendChild(list_item);

    //create modal div
    modalDiv = document.createElement("div");
    modalDiv.id = "myModal" + data[i].id;
    modalDiv.className = "modal";

    closeCursor = document.createElement("span");
    closeCursor.className = "close cursor";
    onclickFunction = "closeLightbox(" + data[i].id + ");";
    closeCursor.setAttribute("onclick",onclickFunction);
    closeCursor.innerHTML = "&times;"
    modalDiv.appendChild(closeCursor);

    modalContent = document.createElement("div");
    modalContent.className = "modal_content";

    for(var j = 0; j < data[i].images.length; j++){
      var mySlide = document.createElement("div");
      mySlide.className = "mySlides";

      var slideNumber = document.createElement("div");
      slideNumber.className = "numbertext";
      var numberText = (j + 1) + " / " + data[i].images.length;
      slideNumber.innerHTML = numberText;
      mySlide.appendChild(slideNumber);

      var slideImage = document.createElement("img");
      slideImage.setAttribute("src",data[i].images[j]);
      mySlide.appendChild(slideImage);

      modalContent.appendChild(mySlide);
    }
    
    var prev = document.createElement("a");
    prev.className = "prev";
    prev.setAttribute("onclick","plusSlides(-1," + data[i].id + ")");
    prev.innerHTML = "&#10094;";
    modalContent.appendChild(prev);

    var next = document.createElement("a");
    next.className = "next";
    next.setAttribute("onclick","plusSlides(1," + data[i].id + ")");
    next.innerHTML = "&#10095;";
    modalContent.appendChild(next);

    //ADD caption container
    var captionContainer = document.createElement("div");
    captionContainer.id = "caption" + data[i].id;
    captionContainer.className = "caption_container";
    var captionHeading = document.createElement("h3");
    captionHeading.id = "caption_heading" + data[i].id;
    captionContainer.appendChild(captionHeading);
    var caption = document.createElement("p");
    caption.id = "caption_content" + data[i].id;
    //caption.id = "caption" + data[i].id;
    captionContainer.appendChild(caption);
    modalContent.appendChild(captionContainer);


    modalDiv.appendChild(modalContent);
    document.getElementById("projects").appendChild(modalDiv);


  }
  document.getElementById("projects").appendChild(project_list);
}

function openLightbox(id) {
  var elementId = "myModal" + id;
  document.getElementById(elementId).style.display = "block";
  showSlides(1, id);
}

function closeLightbox(id) {
  var elementId = "myModal" + id;
  document.getElementById(elementId).style.display = "none";
}

var slideIndex = 1;

// Next/previous controls
function plusSlides(n, id) {
  showSlides(slideIndex += n, id);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n, id) {
  console.log("slide number passed: " + n);
  var i;
  var elementId = "myModal" + id;
  var modalById = document.getElementById(elementId);
  var slides = modalById.getElementsByClassName("mySlides");
  var captionHeading = document.getElementById("caption_heading" + id);
  var captionText = document.getElementById("caption_content" + id);
  console.log("captionText: " + captionText);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  console.log("slide number acutal: " + (slideIndex - 1));
  slides[slideIndex-1].style.display = "block";
  captionHeading.innerHTML = document.getElementById("project_title" + id).innerHTML;
  captionText.innerHTML = document.getElementById("project_description" + id).innerHTML;
}

var populateNav = function(data, translateData, language) {
  console.log("langauge passed to popNav " + language);

  //clears nav
  document.getElementById("top-nav").innerHTML = "";

  var name = document.createElement("a");
  name.id = "name";
  name.setAttribute("href", data[0].home_link);
  //name.innerHTML = data[0].name;
  translatePromise(data[0].name, language).then(data => {
    name.innerHTML = data;
  });
  
  document.getElementById("top-nav").appendChild(name);
  var navContainer = document.createElement("div");
  navContainer.className = "nav-container";

  var home = document.createElement("a");
  home.setAttribute("href", data[0].home_link);
  //home.innerHTML = data[0].home;
  translatePromise(data[0].home, language).then(data => {
    home.innerHTML = data;
  });

  navContainer.appendChild(home);
  var projects = document.createElement("a");
  projects.setAttribute("href", data[0].projects_link);
  //projects.innerHTML = data[0].projects;
  translatePromise(data[0].projects, language).then(data => {
    projects.innerHTML = data;
  });

  navContainer.appendChild(projects);
  var resume = document.createElement("a");
  resume.setAttribute("href", data[0].resume_link);
  //resume.innerHTML = data[0].resume;
  translatePromise(data[0].resume, language).then(data => {
    resume.innerHTML = data;
  });

  navContainer.appendChild(resume);
  document.getElementById("top-nav").appendChild(navContainer);

  var dropdown = document.createElement("div");
  dropdown.id = "dropdown";
  var dropdown_button = document.createElement("button");
  dropdown_button.className = "dropdown_button";
  //dropdown_button.innerHTML = data[0].dropdown;
  translatePromise(data[0].dropdown, language).then(data => {
    dropdown_button.innerHTML = data;
  });

  dropdown.appendChild(dropdown_button);

  var dropdown_content = document.createElement("div");
  dropdown_content.id = "dropdown_content";
  //console.log(translateData.langs);
  for(var key in translateData.langs){
    if(translateData.langs.hasOwnProperty(key)){
      var a = document.createElement("a");
      a.setAttribute("href","#");
      var function_call = "translateResult(\"" + key + "\");";
      a.setAttribute("onclick",function_call);
      a.innerHTML = translateData.langs[key]
      dropdown_content.appendChild(a);
      //console.log(key + " -> " + translateData.langs[key]);
    }
  }
  dropdown.appendChild(dropdown_content);
  navContainer.appendChild(dropdown);

};

async function populateResume(data, language) {
  //clears resume
  document.getElementById("resume").innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    //title
    var title = document.createElement("h1");
    //title.innerHTML = data[0].title;
    await translatePromise(data[0].title, language).then(data => {
      title.innerHTML = data;
    });
    document.getElementById("resume").appendChild(title);

    //technical skills
    var skills = document.createElement("h2");
    //skills.innerHTML = data[0].skills.title;
    await translatePromise(data[0].skills.title, language).then(data => {
      skills.innerHTML = data;
    });
    document.getElementById("resume").appendChild(skills);

    var skills_list = document.createElement("ul");

    for(var j = 0; j < data[0].skills.skills_list.length; j++){
      var skill = document.createElement("li");
      //skill.innerHTML = data[0].skills.skills_list[j];
      await translatePromise(data[0].skills.skills_list[j], language).then(data => {
        skill.innerHTML = data;
      });
      skills_list.appendChild(skill);
    }
    document.getElementById("resume").appendChild(skills_list);

    //work experience
    var work_experience = document.createElement("h2");
    //work_experience.innerHTML = data[0].work_experience.title;
    await translatePromise(data[0].work_experience.title, language).then(data => {
      work_experience.innerHTML = data;
    });

    document.getElementById("resume").appendChild(work_experience);

    for(var z = 0; z < data[0].work_experience.jobs.length; z++){
      var job_title = document.createElement("h3");
      //job_title.innerHTML = data[0].work_experience.jobs[z].title;
      await translatePromise(data[0].work_experience.jobs[z].title, language).then(data => {
        job_title.innerHTML = data;
      });
      document.getElementById("resume").appendChild(job_title);

      var workplace = document.createElement("h4");
      if(data[0].work_experience.jobs[z].workplace_link){
        var job_link = document.createElement("a");
        job_link.setAttribute("href", data[0].work_experience.jobs[z].workplace_link);
        //job_link.innerHTML = data[0].work_experience.jobs[z].workplace;
        await translatePromise(data[0].work_experience.jobs[z].workplace, language).then(data => {
          job_link.innerHTML = data;
        });
        workplace.appendChild(job_link);
      }
      else{
        //workplace.innerHTML = data[0].work_experience.jobs[z].workplace;
        await translatePromise(data[0].work_experience.jobs[z].workplace, language).then(data => {
          workplace.innerHTML = data;
        });
      }
      document.getElementById("resume").appendChild(workplace);

      var duties = document.createElement("p");
      //duties.innerHTML = data[0].work_experience.jobs[z].duties;
      await translatePromise(data[0].work_experience.jobs[z].duties, language).then(data => {
        duties.innerHTML = data;
      });
      document.getElementById("resume").appendChild(duties);

    }

    //education
    var education = document.createElement("h2");
    //education.innerHTML = data[0].education.title;
    await translatePromise(data[0].education.title, language).then(data => {
      education.innerHTML = data;
    });
    document.getElementById("resume").appendChild(education);

    var school = document.createElement("h3");
    var school_link = document.createElement("a");
    school_link.setAttribute("href", data[0].education.school_link);
    //school_link.innerHTML = data[0].education.school;
    await translatePromise(data[0].education.school, language).then(data => {
      school_link.innerHTML = data;
    });
    school.appendChild(school_link);
    document.getElementById("resume").appendChild(school);

    var location = document.createElement("p");
    //location.innerHTML = data[0].education.location;
    await translatePromise(data[0].education.location, language).then(data => {
      location.innerHTML = data;
    });
    document.getElementById("resume").appendChild(location);

    var degree = document.createElement("p");
    //degree.innerHTML = data[0].education.degree;
    await translatePromise(data[0].education.degree, language).then(data => {
      degree.innerHTML = data;
    });
    document.getElementById("resume").appendChild(degree);

    var graduation = document.createElement("p");
    //graduation.innerHTML = data[0].education.graduation;
    await translatePromise(data[0].education.graduation, language).then(data => {
      graduation.innerHTML = data;
    });
    document.getElementById("resume").appendChild(graduation);
  }
}

var populateNews = async function(data, language) {
  document.getElementById("news").innerHTML = "";
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
    //heading.innerHTML = data[i].headline;
    await translatePromise(data[i].headline, language).then(data => {
      heading.innerHTML = data;
    });

    newsDivRight.appendChild(heading);
    var date = document.createElement("h5");
    date.innerHTML = data[i].date;
    newsDivRight.appendChild(date);
    var text = document.createElement("p");
    //toString.text.innerHTML = data[i].text;
    await translatePromise(data[i].text, language).then(data => {
      text.innerHTML = data;
    });
    
    newsDivRight.appendChild(text);
    //document.body.appendChild(newsDiv);
    document.getElementById("news").appendChild(newsDiv);
  }
};
