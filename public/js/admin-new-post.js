import { owner, repo, getGitHubToken } from "env";

const form = document.querySelector("form");

async function uploadImageToGithub(file, fileName) {
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;
    const GITHUB_TOKEN = getGitHubToken();

    const config = {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`);
        },
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        }
    }

    const payLoad = {
        message: `Upload ${fileName}`,
        content: file,
    }

    const { data } = await axios.put(githubURL, payLoad, config);
    const imgURL = data.content.download_url;
    return imgURL;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Submitting..");
    // Capture quill editor content.
    const content = JSON.stringify(quill.getContents().ops);

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const [_, ext] = file.name.split('.');

    const formData = new FormData(form);
    formData.delete("post-thumbnail");
    const fileName = formData.get("title").split(" ").join("-");

    const reader = new FileReader();
    reader.onload = async (ev) => {
        const uint8Array = new Uint8Array(ev.target.result);
        const base64String = uint8Array.reduce((data, byte) => data += String.fromCharCode(byte), '');
        const base64Encoded = btoa(base64String);
        let thumbnailURL = "";
        try {
            thumbnailURL = await uploadImageToGithub(base64Encoded, `${fileName}.${ext}`);
        } catch (error) {
            console.error(error.message);
            return;
        }
        // Capture other input data.
        formData.append('content', content);
        formData.append('thumbnail', thumbnailURL);

        fetch('/admin/new-post', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.flag) {
                    const submitButton = document.querySelector('input[type="submit"]');
                    submitButton.disabled = true;
                    submitButton.value = "يتم التوجيه لصفحة التعديل..";
                }
                animateSnackbar(data, true);
            })
            .catch((error) => console.error(error));
    }

    reader.readAsArrayBuffer(file);
});