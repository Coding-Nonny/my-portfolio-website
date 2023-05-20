$(document).ready(function () {
  let lastCategory = localStorage.getItem(
    "lastCategory"
  );
  let blogType = document.querySelectorAll(
    ".intro #blog .blog .blog-type span"
  );
  const message = new AlertNotify(10000,"center", "#000000");
  $(
    ".blog-search #search-blog"
  ).on("keydown",(e)=>{
    if(e.keyCode === 13){
      let value = $(
        ".blog-search #search-blog"
      ).val();
      if (value !== "") {
        getSearchBlog(value);
        localStorage.setItem(
          "lastCategory",
          "search-blog"
        );
        localStorage.setItem("searched", value);
        blogType.forEach((cat) => {
          cat.classList.remove("current");
          cat.style.background = "none";
        });
        message.alert_message(
          `showing search results for ${value}`,
          "success"
        );
      }else{
        message.alert_message(
          "fill search field and try again",
          "warning"
        );
      }
    }
    message.shouldAutoHide();
  })
  $(".blog-search button").on("click", (e) => {
    e.preventDefault();
    let value = $(
      ".blog-search #search-blog"
    ).val();
    if (value !== "") {
      getSearchBlog(value);
      localStorage.setItem(
        "lastCategory",
        "search-blog"
      );
      localStorage.setItem("searched", value);
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      message.alert_message(
        `showing search results for ${value}`,
        "success"
      );
    }else{
      message.alert_message(
        "fill search field and try again",
        "warning"
      );
    }
    message.shouldAutoHide();
  });
  if (lastCategory === "personal") {
    getPersonalBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "tech") {
    getTechBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "sports") {
    getSportsBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "funny") {
    getFunnyBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "history") {
    getHistoryBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "gov") {
    getGovBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "ent") {
    getEntBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "edu") {
    getEduBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory === "dev") {
    getDevBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById(lastCategory)
      .classList.add("current");
    document.getElementById(
      lastCategory
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  } else if (lastCategory == "search-blog") {
    let value = localStorage.getItem("searched");
    if (value) getSearchBlog(value);
    if (value)
      $(".blog-search #search-blog").val(value);
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
  } else {
    getAllBlog();
    blogType.forEach((cat) => {
      cat.classList.remove("current");
      cat.style.background = "none";
    });
    document
      .getElementById("all")
      .classList.add("current");
    document.getElementById(
      "all"
    ).style.background = `${
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275"
    }`;
  }

  document
    .getElementById("personal")
    .addEventListener("click", function () {
      localStorage.setItem(
        "lastCategory",
        "personal"
      );
      getPersonalBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("all")
    .addEventListener("click", function () {
      localStorage.setItem("lastCategory", "all");
      getAllBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("tech")
    .addEventListener("click", function () {
      localStorage.setItem(
        "lastCategory",
        "tech"
      );
      getTechBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("sports")
    .addEventListener("click", function () {
      localStorage.setItem(
        "lastCategory",
        "sports"
      );
      getSportsBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("funny")
    .addEventListener("click", function () {
      localStorage.setItem(
        "lastCategory",
        "funny"
      );
      getFunnyBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("history")
    .addEventListener("click", function () {
      localStorage.setItem(
        "lastCategory",
        "history"
      );
      getHistoryBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("gov")
    .addEventListener("click", function () {
      localStorage.setItem("lastCategory", "gov");
      getGovBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("ent")
    .addEventListener("click", function () {
      localStorage.setItem("lastCategory", "ent");
      getEntBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("edu")
    .addEventListener("click", function () {
      localStorage.setItem("lastCategory", "edu");
      getEduBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
  document
    .getElementById("dev")
    .addEventListener("click", function () {
      localStorage.setItem("lastCategory", "dev");
      getDevBlog();
      blogType.forEach((cat) => {
        cat.classList.remove("current");
        cat.style.background = "none";
      });
      this.classList.add("current");
      this.style.background = `${
        JSON.parse(
          localStorage.getItem("color")
        ) || "#31d275"
      }`;
    });
});
let blogType = document.querySelectorAll(
  ".intro #blog .blog .blog-type span"
);
function getAllBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/all.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();
      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getAllBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getAllBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}


function generatePaginationButtons(
  page,
  totalPages
) {
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  let buttonHtml = "";
  let start = 1;
  let end = totalPages;
  if (totalPages > 10) {
    if (page > 5) {
      start = page - 4;
      end = page + 5;
      if (end > totalPages) {
        end = totalPages;
        start = end - 9;
      }
    } else {
      end = 10;
    }
  }

  // Get the last viewed page from localStorage
  const lastPage =
    localStorage.getItem("lastPage");

  // Add page buttons
  for (let i = start; i <= end; i++) {
    if (i === parseInt(lastPage)) {
      /* --- If the last viewed page matches the current page, mark the button as active --- */
      buttonHtml += `<button style="background:${color}" class="page-btn active" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === page) {
      /* --- Otherwise, if the current page is being displayed, mark the button as active --- */
      buttonHtml += `<button style="background:${color}" class="page-btn active" onclick="goToPage(${i})">${i}</button>`;
      // Save the current page in localStorage
      localStorage.setItem("lastPage", page);
    } else {
      buttonHtml += `<button class="page-btn" onclick="goToPage(${i})">${i}</button>`;
    }
  }

  return buttonHtml;
}

function goToPage(page) {
  let lastCategorys = localStorage.getItem(
    "lastCategory"
  );
  if (lastCategorys === "personal") {
    getPersonalBlog("", page, 12);
    localStorage.setItem(
      "current1",
      page
    );
  } else if (lastCategorys === "tech") {
    getTechBlog("", page, 12);
    localStorage.setItem(
      "current2",
      page
    );
  } else if (lastCategorys === "sports") {
    getSportsBlog("", page, 12);
    localStorage.setItem(
      "current3",
      page
    );
  } else if (lastCategorys === "funny") {
    getFunnyBlog("", page, 12);
    localStorage.setItem(
      "current4",
      page
    );
  } else if (lastCategorys === "history") {
    getHistoryBlog("", page, 12);
    localStorage.setItem(
      "current5",
      page
    );
  } else if (lastCategorys === "gov") {
    getGovBlog("", page, 12);
    localStorage.setItem(
      "current6",
      page
    );
  } else if (lastCategorys === "ent") {
    getEntBlog("", page, 12);
    localStorage.setItem(
      "current7",
      page
    );
  } else if (lastCategorys === "edu") {
    getEduBlog("", page, 12);
    localStorage.setItem(
      "current8",
      page
    );
  } else if (lastCategorys === "dev") {
    getDevBlog("", page, 12);
    localStorage.setItem(
      "current9",
      page
    );
  } else if (lastCategorys === "search-blog") {
    let value = localStorage.getItem("searched");
      getSearchBlog(value, page, 12);
        $(".blog-search #search-blog").val(value);
        blogType.forEach((cat) => {
          cat.classList.remove("current");
          cat.style.background = "none";
        });
        localStorage.setItem(
          "current10",
          page
        );
  } else {
    getAllBlog("", page, 12);
    localStorage.setItem(
      "current",
      page
    );
  }
}
// GET Personal

function getPersonalBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current1")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/personal.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getPersonalBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current1",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getPersonalBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current1",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getTechBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current2")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/tech.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getTechBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current2",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getTechBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current2",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getSportsBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current3")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/sport.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getSportsBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current3",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getSportsBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current3",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

/* FETCH FUNNY BLOG */
function getFunnyBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current4")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/funny.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getFunnyBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current4",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getFunnyBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current4",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

/* FETCH HISTORY BLOG */

function getHistoryBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current5")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/history.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getHistoryBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current5",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getHistoryBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current5",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getGovBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current6")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/gov.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No content found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getGovBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current6",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getGovBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current6",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getEntBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current7")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/ent.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getEntBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current7",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getEntBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current7",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getEduBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current8")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/edu.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getEduBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current8",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getEduBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current8",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}

function getDevBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current9")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/dev.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          getDevBlog(
            param,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current9",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          getDevBlog(
            param,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current9",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}
function getSearchBlog(
  param,
  currentPage = parseInt(
    localStorage.getItem("current10")
  ) || 1,
  itemsPerPage = 12
) {
  const apiUrl = `assets/php/searched-blog.php?param=${param}`;
  const blogDiv = $(".blog-div");
  let paginationDiv = $(".pagination-div");
  if (!paginationDiv.length) {
    // If the pagination-div doesn't exist, create it
    paginationDiv = $(
      "<div class='pagination-div'></div>"
    );
    blogDiv.after(paginationDiv);
  }
  const color =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length == 0) {
        blogDiv.html(
          "<p>No blog posts found</p>"
        );
        paginationDiv.empty();
        return;
      }

      const startIndex =
        (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalPages = Math.ceil(
        data.length / itemsPerPage
      );
      let blogHtml = "";
      const currentPageData = data.slice(
        startIndex,
        endIndex
      );
      currentPageData.forEach((blog) => {
        const fileType = blog.files
          .split(".")
          .pop();
        let file;

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        const commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${comment.comment_date}</em>
                </div>
              `
          )
          .join("");

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${blog.date_created}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content)}</div>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button style="background:${color}" data-id="${blog.id}" class="com">Post comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Share this blog</h3>
                    <div class="share-icons">
                    <a href="" id="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="" id="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="" id="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="" id="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
       Prism.highlightAll();

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button>Previous</button>"
      );
      const nextButton = $(
        "<button>Next</button>"
      );
      prevButton.click(() => {
        if (currentPage > 1) {
          let value =
            localStorage.getItem("searched");
          getSearchBlog(
            value,
            currentPage - 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current10",
            currentPage - 1
          );
        }
      });
      nextButton.click(() => {
        if (currentPage < totalPages) {
          let value =
            localStorage.getItem("searched");
          getSearchBlog(
            value,
            currentPage + 1,
            itemsPerPage
          );
          localStorage.setItem(
            "current10",
            currentPage + 1
          );
        }
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.error(error));
}
