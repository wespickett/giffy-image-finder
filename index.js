$(function(){
    $("#go").click(function() {
        var inputText = $("#goInput").val();

        $.ajax({
            url: 'http://localhost:8888/getGiffy',
            data: { keyword: inputText },
            crossDomain: true,
            dataType: 'jsonp'
        })
        .done(function(data, textStatus, jqXhr) {
            var gifData = JSON.parse(data);
            $("#gifImage").attr('src', gifData.embed_url);
        })
    });
});