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

async function deleteImageFromGithub(fileName) {
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;
    const GITHUB_TOKEN = getGitHubToken();

    const config = {
        headers: {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Content-Type": "application.json",
        }
    }

    const fileSha = await getFileSha(fileName);

    const payload = {
        message: `Delete ${fileName}`,
        sha: fileSha,
    }

    await fetch(githubURL, {
        method: "DELETE",
        headers: config.headers,
        body: JSON.stringify(payload),
    });
    return;
}


async function updateImageInGithub(file, fileName) {
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;
    const GITHUB_TOKEN = getGitHubToken();

    const config = {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            console.log("Upload Progress: ", percentCompleted);
        },
        headers: {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        }
    }

    const fileSha = await getFileSha(fileName);

    const payload = {
        message: `Update: ${fileName}`,
        content: file,
        sha: fileSha,
    }

    const { data } = await axios.put(githubURL, payload, config);
    const imageURL = data.content.download_url;
    return imageURL;
}


async function getFileSha(fileName) {
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;

    const { data } = await axios.get(githubURL);
    return data.sha;
}