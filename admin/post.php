<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
if (!isset($_SESSION['user'])) {
    header("location: login.php");
}
?>
<div class="manage-posts">
    <div class="mg-head">
        <h1>Manage Contents</h1>
        <button class="create"><i class="fa fa-plus"></i> Add new</button>
    </div>
    <input type="text" class="search-id" placeholder="search blog using the id">
    <div class="btns" style="margin: 1rem;">
        <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
        <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
    </div>
    <table>
        <tr>
            <th>
                Title
            </th>
            <th>Content</th>
            <th>File</th>
            <th>Writer</th>
            <th>
                Category
            </th>
            <th>Date</th>
            <th>
                Edit
            </th>
            <th>
            </th>
        </tr>
        <?php
        require_once(__DIR__ . "/server/connection.php");
        // set default value for $fetch
        $fetch = 2 + 2;
        $postfiles = "";
        $selectId = "";
        $select = "";
        // check if "posts" parameter is set and not empty
        if (isset($_GET['posts']) && $_GET['posts'] !== '') {

            // parse "posts" parameter as integer
            $posts = intval($_GET['posts']);

            // set $fetch based on "posts" value
            if ($posts <= 2) {
                $fetch = 2 + 2;
            } elseif ($posts > 2) {
                // limit maximum value of $fetch to 100
                $fetch = min($posts + 2, 100);
            }
            // limit $fetch to number of available posts in the database
            $select1 = $connect->query("SELECT COUNT(*) FROM blog");
            $num_posts = $select1->fetch_row()[0];
            $fetch = min($fetch, $num_posts);
        }
        if (isset($_GET['id']) && !empty($_GET['id'])) {
            $selectId = htmlspecialchars($_GET['id'], ENT_QUOTES);
            $select = $connect->query("SELECT * FROM blog WHERE id = {$selectId} ORDER BY id DESC LIMIT $fetch");
        } else {
            $select = $connect->query("SELECT * FROM blog ORDER BY id DESC LIMIT $fetch");
        }

        $postfiles = "";
        if ($select->num_rows > 0) :

            while ($row = $select->fetch_assoc()) :
                $file_explode = explode(".", $row['files']);
                $end = end($file_explode);
                if ($end == "mp4" || $end == "gif" || $end == "mpeg-4") {
                    $postfiles = '<video src="./blog/' . $row['files'] . '" width="150" height="150" controls></video>';
                } elseif ($end == "jpg" || $end == "jpeg" || $end == "png" || $end == "svg") {
                    $postfiles = ' <img src="./blog/' . $row['files'] . '" alt="content file" width="150" height="150">';
                } else {
                    echo "unsuppoerted file type";
                }
        ?>
                <tr>
                    <td class="title">
                        <p data-id="<?= $row['id'] ?>"><?= $row['title'] ?></p>
                        (<?= $row['id'] ?>)
                    </td>
                    <td class="content" data-id="<?= $row['id'] ?>">
                        <div>
                            <?= $row['content'] ?>
                        </div>
                    </td>
                    <td><?= $postfiles ?></td>
                    <td class="writer" data-id="<?= $row['id'] ?>"><?= $row['writer'] ?></td>
                    <td><?= $row['category'] ?></td>
                    <td><?= $row['date_created'] ?></td>
                    <td><button class="edit" data-id="<?= $row['id'] ?>">Edit</button></td>
                    <td><button class="delete" data-id="<?= $row['id'] ?>">Delete</button></td>
                </tr>
            <?php endwhile; ?>
        <?php else : ?>
            <h1>No Data</h1>
        <?php endif; ?>
    </table>
    <div class="btns" style="margin: 1rem;">
        <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
        <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
    </div>
    <div class="create-manage">
        <form action="">
            <input type="text" name="title" placeholder="Title" id="title" />
            <input type="text" name="name" value="<?= $user['username'] ?>" placeholder="Your name" id="name" />
            <input type="text" name="type" class="type" readonly>
            <input type="text" name="id" class="id" readonly>
            <select name="category" id="category">
                <option value="">Category</option>
                <option value="personal">Personal</option>
                <option value="sports">Sports</option>
                <option value="funny">Funny</option>
                <option value="technology">Technology</option>
                <option value="history">History</option>
                <option value="government">Government</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="development">Development</option>
            </select>
            <input type="file" name="file" id="file" accept="image/*, video/*" />
            <div class="text-place">
                <div class="text-place-head">
                    <strong onclick="boldText()">Bold</strong>
                    <u onclick=" UnderLineText()">Underline</u>
                    <i onclick="italicText()">Italic</i>
                    <span class="delete" onclick="deleteText()">Delete</span>
                    <strong onclick="code()">Link</strong>
                    <strong onclick="lineBreak()">Break</strong>
                </div>
                <textarea name="text" id="text" cols="30" rows="10" placeholder="write here..."></textarea>
            </div>
            <div class="p-tray">

            </div>
            <div class="f-bottom">
                <button class="upload">Post content</button>
                <button class="cancel">Cancel</button>
            </div>
        </form>
    </div>
</div>
<script src="./script/marked.js"></script>
<script src="./script/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(() => {
        const message = new AlertNotify(10000, "top-right", "#000000");
        // prevent form default submission and send formdata using ajax
        let form = document.querySelector(".create-manage form");
        $(".create-manage form").on("submit", function(e) {
            e.preventDefault();
        })
        $(".upload").on("click", function() {
            let formData = new FormData(form);
            $.ajax({
                url: "server/create_update.php",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: async (data) => {
                    if (data == "posted") {
                        message.alert_message(data, "success");
                        await new Promise((resolve) =>
                            setTimeout(resolve, 3000)
                        );
                        location.reload();
                    } else {
                        message.alert_message(data, "warning");
                    }
                },
                error: (jxr, xhr, error) => {
                    console.log("error: " + error);
                }
            })
        })

        $(".create").on("click", () => {
            $(".create-manage").css("display", "flex");
            $('.type').val("new");
            $('.id').val("");
        });
        $(".cancel").on("click", (e) => {
            e.preventDefault();
            document.querySelector(".create-manage form").reset();
            $(".create-manage").css("display", "none");
        });
        $("body").on("click", ".manage-posts .edit", function() {
            $(".create-manage").css("display", "flex");
            $('.type').val("update");
            let v = $(this).data("id");
            $('.id').val(v);
            let v1 = $(".content[data-id=" + v + "] div").html();
            let v2 = $(".title p[data-id=" + v + "]").html();
            let v3 = $(".writer[data-id=" + v + "]").html();
            $(".create-manage #text").val(v1);
            $(".create-manage #title").val(v2);
            $(".create-manage #name").val(v3);
            const textareaValue = $(".create-manage #text").val();

            // Remove spaces from the textarea value
            const trimmedValue = textareaValue.trim();

            // Set the modified value back to the textarea
            $(".create-manage #text").val(trimmedValue);
            $(".create-manage #text").focus();
        });


        $("#text").on("input keyup keydown paste", async function() {
            if ($(this).val().length >= 1) {
                let interval = setInterval(() => {
                    const markDown = $(this).val();
                    const outText = marked(markDown.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
                    $(".p-tray").html(outText);
                    Prism.highlightAll();
                }, 1000);
                await new Promise(res => setTimeout(res, 1000));
                clearInterval(interval)
            }
        });
        $("#text").on("focus", function() {
            const markDown = $(this).val();
            const outText = marked(markDown.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
            $(".p-tray").html(outText);
            Prism.highlightAll();
        });

        $("body").on("click", "td .delete", async function() {
            let id = $(this).data("id");
            if (await message.alert_Confirm("Do you want to delete this content?")) {
                $.ajax({
                    url: "server/blog_delete.php",
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: async (data) => {
                        message.alert_message('Deleted', "success");
                        await new Promise((resolve) =>
                            setTimeout(resolve, 3000)
                        );
                        location.reload();
                    }
                })
            }
        })

        $('.search-id').on('keyup', (e) => {
            if (e.keyCode === 13) {
                const url = new URL(window.location.href);
                url.searchParams.set("id", $('.search-id').val());
                window.location.href = url.toString();
            }
        })
    })
    const textArea = document.getElementById("text");

    function boldText() {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const boldText = `<b>${selectedText}</b>`;
        textArea.value =
            textArea.value.substring(0, selectionStart) +
            boldText +
            textArea.value.substring(selectionEnd);
        textArea.setSelectionRange(selectionStart, selectionEnd + 7);
        textArea.focus();
    }

    function code() {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const boldText = `<a href="" target="_blank">${selectedText}</a>`;
        textArea.value =
            textArea.value.substring(0, selectionStart) +
            boldText +
            textArea.value.substring(selectionEnd);
        textArea.setSelectionRange(selectionStart, selectionEnd + 7);
        textArea.focus();
    }

    function italicText() {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const italicText = `<i>${selectedText}</i>`;
        textArea.value =
            textArea.value.substring(0, selectionStart) +
            italicText +
            textArea.value.substring(selectionEnd);
        textArea.setSelectionRange(selectionStart, selectionEnd + 7);
        textArea.focus();
    }

    function UnderLineText() {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const lineText = `<u>${selectedText}</u>`;
        textArea.value =
            textArea.value.substring(0, selectionStart) +
            lineText +
            textArea.value.substring(selectionEnd);
        textArea.setSelectionRange(selectionStart, selectionEnd + 7);
        textArea.focus();
    }

    function lineBreak() {
        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;
        const selectedText = textArea.value.substring(selectionStart, selectionEnd);
        const lineText = `<br/><br/>`;
        textArea.value =
            textArea.value.substring(0, selectionStart) +
            lineText +
            textArea.value.substring(selectionEnd);
        textArea.setSelectionRange(selectionStart, selectionEnd + 7);
        textArea.focus();
    }

    function deleteText() {
        const startPos = textArea.selectionStart;
        const endPos = textArea.selectionEnd;
        const value = textArea.value;
        textArea.value =
            value.substring(0, startPos) + value.substring(endPos, value.length);
        textArea.selectionStart = startPos;
        textArea.selectionEnd = endPos;
        textArea.focus();
    }


    const nextButton = document.querySelectorAll(".next");
    const prevButton = document.querySelectorAll(".prev");
    if (nextButton && prevButton) {
        nextButton.forEach((nextBtn) => {
            nextBtn.addEventListener("click", () => {
                // get current "posts" parameter from URL
                const params = new URLSearchParams(window.location.search);
                const currentPosts = parseInt(params.get("posts")) || 0;

                // check if current "posts" value is valid
                if (isNaN(currentPosts) || currentPosts < 0) {
                    console.error("Invalid 'posts' parameter:", currentPosts);
                    return;
                }

                // calculate new "posts" value
                const newPosts = Math.min(currentPosts + 2, <?= $fetch ?>);

                // redirect to new URL with updated "posts" parameter
                if (newPosts !== currentPosts) {
                    const url = new URL(window.location.href);
                    url.searchParams.set("posts", newPosts);
                    window.location.href = url.toString();
                }
            });
        })

        prevButton.forEach((prevBtn) => {
            prevBtn.addEventListener("click", () => {
                // get current "posts" parameter from URL
                const params = new URLSearchParams(window.location.search);
                const currentPosts = parseInt(params.get("posts")) || 0;

                // check if current "posts" value is valid
                if (isNaN(currentPosts) || currentPosts < 0) {
                    console.error("Invalid 'posts' parameter:", currentPosts);
                    return;
                }

                // calculate new "posts" value
                const newPosts = Math.max(currentPosts - 2, 0);

                // redirect to new URL with updated "posts" parameter
                if (newPosts !== currentPosts) {
                    const url = new URL(window.location.href);
                    url.searchParams.set("posts", newPosts);
                    window.location.href = url.toString();
                }
            });
        })
    }
</script>