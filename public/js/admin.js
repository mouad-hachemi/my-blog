function deletePost(id) {
    fetch('/admin/delete-post/' + id, {
        method: 'DELETE',
    }).then(() => window.location.reload());
}