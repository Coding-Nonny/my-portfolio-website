$(document).ready(() => {
  let username ="Coding-Nonny";
  let url = `assets/php/api.php`;
  let page = 1;
  let perPage = 8;
  let maxPages;
  let dataCache = localStorage.getItem("my_repos");
  
  if (dataCache) {
    let data = JSON.parse(dataCache);
    document.querySelector(".intro #home .intro-img .project h4").innerHTML = data.length;
    showRepos(data);
  }
  
  dataRefresh();
  setInterval(dataRefresh, 60 * 60 * 1000);
  
  function dataRefresh() {
        $.ajax({
          url: url,
         method : "POST",
          success: function (data) {
            localStorage.setItem("my_repos", JSON.stringify(data));
            showRepos(data);
          },
        });
  }

  function showRepos(data) {
    maxPages = Math.ceil(data.length / perPage);
    $(".all-projects").empty();
    $.each(
      data.slice((page - 1) * perPage, page * perPage),
      function (index, repo) {
        let div = $("<div>");
        div.addClass("project-box");
        let link = $("<a>")
          .attr("href", repo.html_url)
          .text("Star On Github?");
        let language = $("<b>").text("Language: " + repo.language);
        link.attr("target", "_blank");
        let alink = $("<div>");
        alink.addClass("alink");
        let readmeDiv = $("<div>");
        if (repo.description) {
          let readmeContent = repo.description;
          if (readmeContent.length > 150) {
            readmeContent = readmeContent.substring(0, 150) + "...";
          }
          readmeDiv.addClass("readme-box");
          let readmeTitle = $("<strong>").text(repo.name);
          readmeTitle.css(
            "color",
            `${JSON.parse(localStorage.getItem("color")) || "#31d275"}`
          );
          let readmeContentElem = $("<p>").text(readmeContent);
          readmeDiv.append(readmeTitle).append(readmeContentElem);
          alink.append(readmeDiv);
        } else {
          readmeDiv.text("no description");
          alink.append(readmeDiv);
        }
        let Badges = "https://img.shields.io/github/stars/{Coding-Nonny}/{repository}.svg"
          .replace("{Coding-Nonny}", repo.owner.login)
          .replace("{repository}", repo.name);
        let img = $("<img>")
          .attr("src", Badges)
          .attr("alt", "stars");
        alink.append(link);
        div.append(alink).append(img).append(language);
        $(".all-projects").append(div);
      }
    );

    if (page > 1) {
      let prevBtn = $("<button>")
        .addClass("load-less")
        .html("<i class='fas fa-arrow-left'></i>");
      $(".all-projects").append(prevBtn);
      prevBtn.on("click", function () {
        page--;
            $.ajax({
              url: url,
              method : "POST",
              success: function (data) {
                showRepos(data);
              },
            });
        let gitPage = document.getElementById('work');
        gitPage.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      console.log();
    }

    if (page < maxPages) {
      let loadMoreBtn = $("<button>")
        .addClass("load-more")
        .html("<i class='fas fa-arrow-right'></i>");
      $(".all-projects").append(loadMoreBtn);
      loadMoreBtn.on("click", function () {
        page++;
            $.ajax({
              url: url,
              method : "POST",
              success: function (data) {
                showRepos(data);
              },
            });
        let gitPage = document.getElementById('work');
        gitPage.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      console.log();
    }
  }
});
