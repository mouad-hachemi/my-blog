async function uploadImageToGithub(file, fileName) {
    let credentials = {}
    try {
        credentials = await getGithubCredentials();
    } catch (error) {
        throw new Error("Can't get github credentials.");
    }

    const { GITHUB_TOKEN, owner, repo } = credentials;

    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;

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
    let credentials = {}
    try {
        credentials = await getGithubCredentials();
    } catch (error) {
        throw new Error("Can't get github credentials.");
    }

    const { GITHUB_TOKEN, owner, repo } = credentials;


    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;

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
    let credentials = {}
    try {
        credentials = await getGithubCredentials();
    } catch (error) {
        throw new Error("Can't get credentials.");
    }

    const { GITHUB_TOKEN, owner, repo } = credentials;
    
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;

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
    let credentials = {};

    try {
        credentials = await getGithubCredentials();
    } catch (error) {
        throw new Error("Can't get credentials.");
    }

    const {owner, repo} = credentials;

    const githubURL = `https://api.github.com/repos/${owner}/${repo}/contents/uploads/${fileName}`;

    const { data } = await axios.get(githubURL);
    return data.sha;
}

async function getGithubCredentials() {
    const response = await fetch("/api/github-credentials", {
        method: "GET",
    })
    const credentials = await response.json();
    return credentials;
}