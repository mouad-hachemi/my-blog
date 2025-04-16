async function deletePost(id, thumbnailURL) {

    const fileName = thumbnailURL.split("/").at(-1);

    try {
        await fetch('/admin/delete-post/' + id, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(error.message);
        return;
    }

    try {
        await deleteImageFromGithub(fileName);
        window.location.reload();
    } catch (error) {
        console.error(error.message);
    }
}