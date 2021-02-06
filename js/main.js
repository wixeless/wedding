function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const mainUrl = "https://jahongir28.github.io/wedding?id=ccfc1369-3769-4db9-b325-ab950d677e60"

$(document).ready(function () {
    let queryId = getParameterByName('id')
    if (queryId == null) {
        /*$( ".content-main" ).hide();
        $("#error-message").text('Неверная ссылка')
        $( ".error-message" ).show();*/
        $("#guest-name-1").text("***************")
        return
    }
    let clearId = queryId.replace(/"/g, '');
    console.log("queryId:" + queryId)
    $.getJSON("guests.json", function (result) {
        console.log("success " + result);
        let names = []
        let gender = ""
        $.each(result, function (i, field) {
            if (clearId === field.id) {
                names = field.names
                gender = field.gender
            }
        });
        if (names.length === 0){
            $( ".content-main" ).hide();
            $("#error-message").text('Пригласительный не найден')
            $( ".error-message" ).show();
            return
        }

        if (names.length === 2) {
            $("#welcome-title").text('Уважаемые')
            let name1 = names[0] + " и"
            $("#guest-name-1").text(name1)
            $("#guest-name-2").text(names[1])
        } else {
            let prefix
            if (gender === "F"){
                prefix = 'Уважаемая'
            }else {
                prefix = 'Уважаемый'
            }
            $("#welcome-title").text(prefix)
            $("#guest-name-1").text(names)
        }
    })
});

