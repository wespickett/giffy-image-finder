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
            console.log('data', JSON.parse(data).embed_url, (typeof gifData === 'string'));
            var gifData = JSON.parse(data);
            console.log(gifData);
            if (data.status === 'fail') {
                console.log(fail);
                alert(data.errorMsg);
                $("#gifImage").attr('src', '');
            } else {
                $("#gifImage").attr('src', gifData.embed_url);
            }
        })
    });
});