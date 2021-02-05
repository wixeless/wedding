function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const mainUrl = "https://jahongir28.github.io/wedding/guests.json"

$(document).ready(function () {
    //const guests = JSON.parse(guests)
    let queryId = getParameterByName('id').replace(/"/g, '');
    console.log("queryId:" + queryId)
    $.getJSON("guests.json", function (result) {
        console.log("success " + result);
        var names = []
        $.each(result, function(i, field){
            if (queryId === field.id){
                names = field.names
                $("#guest-name").text(names)
                console.log("FOUND")
            }
            console.log(field.id)
            console.log(field.names)
            console.log("############################################")
        });
        console.log("names:" + names)
        /*var names = []
        for (let i = 0; i < result.length; i++) {
            let fileId = result[i].id
            if (fileId === queryId){
                names = result[i].names
                break
            }
            console.log(fileId)
        }*/

    })
});

