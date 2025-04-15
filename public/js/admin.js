async function deletePost(id, thumbnailURL) {

    const fileName = thumbnailURL.split("/").at(-1);

    try {
        await deleteImageFromGithub(fileName);
    } catch (error) {
        console.error(error.message);
        return;
    }

    fetch('/admin/delete-post/' + id, {
        method: 'DELETE',
    }).then(() => window.location.reload());
}