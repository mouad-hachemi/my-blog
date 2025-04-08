const quill = new Quill("#editor", {
    modules: {
        syntax: true,
        toolbar: '#toolbar-container',
    },
    theme: 'snow'
});

document.querySelector(".ql-direction").click();