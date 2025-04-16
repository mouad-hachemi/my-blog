const form = document.querySelector("form");
const submitButton = document.querySelector('input[type="submit"]');
const actionButton = document.querySelector('input[type="button"]');

if (published == '1') {
    actionButton.value = "إخفاء";
    actionButton.onclick = hidePost;
    actionButton.style["background-color"] = "#FFD63A";
} else {
    actionButton.value = "نشر";
    actionButton.onclick = publishPost;
    actionButton.style["background-color"] = "#00c451";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitButton.disabled = true;

    const formData = new FormData(form);
    formData.delete("post-thumbnail");

    const content = JSON.stringify(quill.getContents().ops);
    formData.append('content', content);

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file) {
        let [_, ext] = file.name.split('.');

        const reader = new FileReader();
        reader.onload = async (ev) => {
            const u8intArray = new Uint8Array(ev.target.result);
            const base64String = u8intArray.reduce((data, byte) => data += String.fromCharCode(byte), '');
            const base64Encoded = btoa(base64String);

            // Get file name from URL, then get file name without type extension.
            const [gitFileName, gitFileExt] = thumbnailURL.split('/').at(-1).split('.');
            const postTitle = formData.get('title');
            const fileName = postTitle.split(' ').join('-');
            let newThumbnailURL = "";

            try {
                if (postTitle.split(' ').join('-') == gitFileName) {
                    newThumbnailURL = await updateImageInGithub(base64Encoded, `${gitFileName}.${gitFileExt}`);
                } else {
                    newThumbnailURL = await uploadImageToGithub(base64Encoded, `${fileName}.${ext}`);
                    await deleteImageFromGithub(`${gitFileName}.${gitFileExt}`);
                }
            } catch (error) {
                console.log(error.message)
                return;
            }
            formData.append("thumbnail", newThumbnailURL);
            editPost(formData)
        }
        reader.readAsArrayBuffer(file);
    } else {
        formData.append("thumbnail", thumbnailURL);
        editPost(formData);
    }
});


function editPost(payload) {
    fetch("/admin/edit-post/" + postId, {
        method: "PUT",
        body: payload,
    })
        .then((res) => res.json())
        .then((data) => {
            submitButton.disabled = false;
            animateSnackbar(data);
        });
}

function publishPost() {
    fetch("/admin/edit-post/publish/" + postId, {
        method: 'PUT',
    })
        .then((res) => res.json())
        .then((data) => {
            animateSnackbar(data);
            if (data.flag) {
                actionButton.value = "إخفاء";
                actionButton.onclick = hidePost;
                actionButton.style["background-color"] = "#FFD63A";
            }
        });
}

function hidePost() {
    fetch("/admin/edit-post/hide/" + postId, {
        method: 'PUT',
    })
        .then((res) => res.json())
        .then((data) => {
            animateSnackbar(data);
            if (data.flag) {
                actionButton.value = "نشر";
                actionButton.onclick = publishPost;
                actionButton.style["background-color"] = "#00c451";
            }
        });
}