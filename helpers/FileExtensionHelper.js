function getFileExtension(url) {
       // Remove everything to the last slash in URL
    url = url.substr(1 + url.lastIndexOf("/"));

    // Break URL at ? and take first part (file name, extension)
    url = url.split('?')[0];

    // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
    url = url.split('#')[0];

    // Now we have only extension
    return url;
}

module.exports=getFileExtension