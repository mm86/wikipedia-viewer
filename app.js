$(document).ready(function() {

    $('input').keydown(function(e) {
        if (e.keyCode === 13) {
            $("#list ul").empty();
            var input = $(this).val()
                //make the corresponding API call and console.log the results

            var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + input + '&format=json&callback=?';
            $.ajax({
                url: url,
                dataType: 'jsonp',

            }).done(function(results) {
                //from the above api call, try retrieving the title, snippet and url for each item in the results array
                var title = results[1];
                var snippet = results[2];
                var urls = results[3];

                for (var i in title) {
                    $("#list ul").append("<li><a href=" + urls[i] + ">" + title[i] + ": " + snippet[i] + "</a></li>");

                }
                
                $("#list ul a").click(function(e) {
                    e.preventDefault();
                    var urlVal = $(this).attr("href");
                    var newTab = window.open(urlVal, '_blank');
                    if (newTab) {
                        newTab.focus();
                    } else {
                        alert('enable popups for this website');
                    }
                });


            })

            .fail(function() {
                alert("Data could not be retrieved from Wikipedia API");
            });
        }
    });
});
