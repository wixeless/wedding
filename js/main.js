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
        console.log("success");
        let male = null
        let female = null
        $.each(result, function (i, field) {
            /**
             * @param field
             * @param field.male
             * @param field.female
             */
            if (clearId === field.id) {
                if (field.hasOwnProperty("male")) {
                    male = field.male
                }
                if (field.hasOwnProperty("female")) {
                    female = field.female
                }
            }
        });


        if (male == null && female == null) {
            $(".content-main").hide();
            let text = $("#error-message").text('Пригласительный\nне найден')
            text.html(text.html().replace(/\n/g, '<br/>'));
            $(".error-message").show();
            return
        }


        if (male != null && female != null) {
            let nameWith = male + " и"
            $("#male-name").text(nameWith)
            $("#female-name").text(female)
        }else if (male!=null){
            $("#male-name").text(male)
        }else if (female!=null){
            $("#female-name").text(female)
        }

    })
});

$(function(){
    $("#event-field").click(function(){
        let icsMSG = "BEGIN:VCALENDAR\n" +
            "VERSION:2.0\n" +
            "PRODID:-//Apple Inc.//macOS 11.1//EN\n" +
            "CALSCALE:GREGORIAN\n" +
            "BEGIN:VTIMEZONE\n" +
            "TZID:Asia/Bishkek\n" +
            "BEGIN:STANDARD\n" +
            "TZOFFSETFROM:+0600\n" +
            "RRULE:FREQ=YEARLY;UNTIL=20041030T203000Z;BYMONTH=10;BYDAY=-1SU\n" +
            "DTSTART:19971026T023000\n" +
            "TZNAME:GMT+6\n" +
            "TZOFFSETTO:+0500\n" +
            "END:STANDARD\n" +
            "BEGIN:DAYLIGHT\n" +
            "TZOFFSETFROM:+0500\n" +
            "DTSTART:20050327T023000\n" +
            "TZNAME:GMT+6\n" +
            "TZOFFSETTO:+0600\n" +
            "END:DAYLIGHT\n" +
            "END:VTIMEZONE\n" +
            "BEGIN:VEVENT\n" +
            "TRANSP:OPAQUE\n" +
            "DTEND;TZID=Asia/Bishkek:20210409T230000\n" +
            "UID:D6781C75-B0E8-4E9C-ABAB-1A69571CF237\n" +
            "DTSTAMP:20210325T060751Z\n" +
            "LOCATION:Дияр\\, проспект Победы (Жибек-Жолу)\\, 327\\, с. Лебединовка\n" +
            "DESCRIPTION:​Ресторан \"Дияр\"\\, проспект Победы\\, 327\n" +
            "URL;VALUE=URI:https://go.2gis.com/2u5w6\n" +
            "STATUS:CONFIRMED\n" +
            "SEQUENCE:1\n" +
            "SUMMARY:Свадьба ЖАХОНГИР & СИВАРА\n" +
            "LAST-MODIFIED:20210325T060751Z\n" +
            "DTSTART;TZID=Asia/Bishkek:20210409T170000\n" +
            "CREATED:20210325T054737Z\n" +
            "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\n" +
            "BEGIN:VALARM\n" +
            "X-WR-ALARMUID:49EC04D5-8CD1-447D-82E4-49E5FC000EB8\n" +
            "UID:49EC04D5-8CD1-447D-82E4-49E5FC000EB8\n" +
            "TRIGGER:-PT1H\n" +
            "DESCRIPTION:This is an event reminder\n" +
            "ACTION:DISPLAY\n" +
            "END:VALARM\n" +
            "END:VEVENT\n" +
            "END:VCALENDAR\n"
        window.open("data:text/calendar;charset=utf8," + icsMSG);
    });
});

