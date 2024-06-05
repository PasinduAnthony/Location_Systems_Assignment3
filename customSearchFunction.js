function search() {
    var query = document.getElementById('searchInput').value.toLowerCase();
    var elements = document.querySelectorAll('*');
    var results = [];

    elements.forEach(function (element) {
        if (element.innerText.toLowerCase().includes(query)) {
            results.push(element.outerHTML);
        }
    });

    // Encode search results as URL parameters
    var searchResultsUrl = 'search_results.html?query=' + encodeURIComponent(query) +
        '&results=' + encodeURIComponent(results.join('\n'));

    // Redirect to the search results page
    window.location.href = searchResultsUrl;
}
