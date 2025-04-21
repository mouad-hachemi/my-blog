const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = true;
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
            submitButton.disabled = false;
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
            .catch((error) => {
                console.log(error.message);
                submitButton.disabled = false;
            })
            .then((data) => {
                if (data.flag) {
                    submitButton.value = "يتم التوجيه لصفحة التعديل..";
                }
                animateSnackbar(data, true);
            })
            .catch((error) => {
                console.error('An error occured', error.message);
            });
    }

    reader.readAsArrayBuffer(file);
});