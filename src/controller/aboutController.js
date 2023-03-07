const testAbout = (req, res) => {
    return res.send("about");
}

const aboutAuthor = (req, res) => {
    return res.send("author");
}

module.exports = {
    testAbout,
    aboutAuthor
}