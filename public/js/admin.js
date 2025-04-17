const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value;

    console.log('Searching for: ', searchTerm);

    const urlParams = new URLSearchParams();
    urlParams.append('searchTerm', searchTerm);

    window.location.search = urlParams;
});


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