function getSearchBlog(
  param = "",
  currentPage = 1,
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
          "<p>Coming Soon</p>"
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
        let postTime = formatDateToJustNowTime(blog.date_created);

        if (fileType.match(/^(jpg|jpeg|png)$/i)) {
          file = `<img data-src="admin/blog/${blog.files}" class="blog-ui lazyload" alt="blog image"/>`;
        } else {
          file = `<video data-src="admin/blog/${blog.files}" controls class="blog-ui lazyload"></video>`;
        }

        let commentsHtml = blog.comment
          .map(
            (comment) => `
                <div class="comments">
                <img src="./assets/user/${comment.img}" alt="user" id="profile-img"/>
                  <strong style="color: ${color}">${comment.username}</strong>
                  <small>${comment.comment_text} </small>
                  <em>${formatDateToJustNowTime(comment.comment_date)}</em>
                </div>
              `
          )
          .join("");
          if(commentsHtml === "")commentsHtml="Be the first to comment";

        const blogPost = `
            <div class="blog-posts" data-id="${blog.id}">
              <i class="fas fa-times" data-id="${blog.id}"></i>
              <div class="blog-details">
                ${file}
                <div class="title">
                  <p>${blog.writer}</p>
                  <p>${blog.category}</p>
                  <span>${postTime}</span>
                </div>
              </div>
              <div class="blog-text">
                <h3 class="title-text" style="border-bottom:2px solid ${color};">${blog.title}</h3>
                <div class="blog-writing">${marked(blog.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">"))}</div>
                <br/><br/>
                <p style="width:100%;text-align:left;color:${color};margin-top:18px;text-transform:capitalize" class="title-date">By ${blog.writer} - ${formatDateToJustNowTime(blog.date_created)}</p>
                <div class="blog-action">
                  <form action="" data-id="${blog.id}">
                    <input type="text" style="border:2px solid ${color}" autocomplete="off" placeholder="Your name" name="name" user-id="${blog.id}" class="name" />
                    <input type="email" style="border:2px solid ${color}" autocomplete="off" placeholder="Your email address" name="email" email-id="${blog.id}" />
                    <textarea name="comment" id="" cols="30" rows="10" autocomplete="off" style="border:2px solid ${color}" placeholder="comment" comment-id="${blog.id}"></textarea>
                    <button type="submit" title="comment" style="background:${color}" data-id="${blog.id}" class="com">Comment</button>
                    <small style="margin-top: 10px"><input type="checkbox" name="check" class="check" data-id="${blog.id}"/> Remember my details when next i want to comment on this device.</small>
                  </form>
                  <div class="blog-share">
                    <h3 style="border-bottom:2px solid ${color}">Feel Free To Share This Content</h3>
                    <div class="share-icons">
                    <a href="#" class="wa-share"><i class="fa fa-whatsapp"></i></a>
                    <a href="#" class="facebook-share"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="twitter-share"> <i class="fa fa-twitter"></i></a>
                    <a href="#" class="instagram-share"><i class="fa fa-instagram"></i></a>
                    </div>
                  </div>
                </div>
                <div class="blog-comments">
                  <h3 style="border-bottom:2px solid ${color}">Comments ${blog.comment.length}</h3>
                  ${commentsHtml}
                </div>
                <div class="read-post">
                  <h4 data-title="${blog.title}" data-id="${blog.id}" style="background: ${color}">Continue Reading <i class="fas fa-arrow-right"></i></h4>
                </div>
              </div>
              <div class="footer">
          <div class="col-1">
            <h3>
              CodingNonny &copy; <p>${new Date().getFullYear()}</p>. All
              Right Reserved
            </h3>
            <img src="./assets/image/logo-no-background.png" alt="logo">
          </div>
         <div class="col-2">
          <h3>NEWSLETTER</h3>
          <div class="form">
            <input name="text" data-id="${blog.id}" type="text" placeholder="Your Email Address">
            <br>
            <button data-id="${blog.id}" title="subscribe" type="button" class="s">SUBSCRIBE NOW</button>
          </div>
         </div>
         <div class="col-3">
          <h3>SOCIAL LINKS</h3>
          <div class="social-links">
            <a
              href="https://www.facebook.com/theophilusnonny"
              target="_blank"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a
              href="https://wa.me/message/SXGIV25TKXYOO1"
              target="_blank"
              ><i class="fa fa-whatsapp"></i
            ></a>
            <a
              href="https://www.linkedin.com/in/theophilus-chinonso-chikezie-2a4555237"
              target="_blank"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a
              href="https://instagram.com/nonny_theophilus?igshid=YmMyMTA2M2Y="
              target="_blank"
              ><i class="fab fa-instagram"></i
            ></a>
          </div>
         </div>
        </div>
            </div>
          `;
        blogHtml += blogPost;
      });
      blogDiv.html(blogHtml);
          Prism.highlightAll();
      //  Prism.highlightAllUnder(blogDiv);

      // Add buttons to DOM
      // Generate pagination buttons
      const buttonHtml =
        generatePaginationButtons(
          currentPage,
          totalPages
        );

      // Add event listeners for next and previous buttons
      const prevButton = $(
        "<button type='button' title='previous'>Previous</button>"
      );
      const nextButton = $(
        "<button type='button' title='next'>Next</button>"
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
        let blogPage = document.getElementById('blog');
  blogPage.scrollIntoView({behavior: 'smooth'});
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
        let blogPage = document.getElementById('blog');
        blogPage.scrollIntoView({behavior: 'smooth'});
      });

      // Remove old buttons and add new buttons to DOM
      paginationDiv.empty(); // remove old buttons
      paginationDiv.append(prevButton);
      paginationDiv.append(buttonHtml);
      paginationDiv.append(nextButton);
      //blogDiv.after(paginationDiv)
    })
    .catch((error) => console.log(error));
}
function formatDateToJustNowTime(dateString) {
  const currentDate = new Date();
  const givenDateParts = dateString.split(/[-: ]+/);
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  // Manually extract the date components
  const day = parseInt(givenDateParts[0]);
  const monthIndex = months.indexOf(givenDateParts[1]);
  const year = parseInt(givenDateParts[2]);
  const hours = parseInt(givenDateParts[3]);
  const minutes = parseInt(givenDateParts[4]);
  const seconds = parseInt(givenDateParts[5]);
  const amOrPm = givenDateParts[6].toUpperCase();

  // Create a new date object with the extracted components
  const givenDate = new Date(year, monthIndex, day, (hours % 12) + (amOrPm === "PM" ? 12 : 0), minutes, seconds);

  const timeDifferenceInSeconds = Math.floor((currentDate - givenDate) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return "just now";
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // If the time difference is greater than a week, format the date manually
    const formatter = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    return formatter.format(givenDate);
  }
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
      buttonHtml += `<button type='button' title='page ${i}' style="background:${color}" class="page-btn active" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === page) {
      /* --- Otherwise, if the current page is being displayed, mark the button as active --- */
      buttonHtml += `<button type='button' title='page ${i}' style="background:${color}" class="page-btn active" onclick="goToPage(${i})">${i}</button>`;
      // Save the current page in localStorage
      localStorage.setItem("lastPage", page);
    } else {
      buttonHtml += `<button class="page-btn" type='button' title='page ${i}' onclick="goToPage(${i})">${i}</button>`;
    }
  }

  return buttonHtml;
}
