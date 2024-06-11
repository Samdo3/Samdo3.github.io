//로컬 json에서 데이터 가져오기
$.getJSON('information.json',function(data){
    var information=data.informations[0];
    $('#information-card-name').append(`<p class="information-card-content">${information.name}</p>`);
    $('#information-card-education').append(`<p class="information-card-content">${information.education}</p>`);
    $('#information-card-work').append(`<p class="information-card-content">${information.workex}</p>`);
    $('#email').html(`${information.email}`);

}).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Failed to load data: " + err);
});





// projects/information/contact 바 클릭시 이벤트
$('.navbar-button').on('click',function(e){
    // 바 활성화 기능
    $('.port-content-navbar div').stop(true,true).removeClass('port-content-navbar-active');
    $('.port-content-navbar div').eq(e.target.dataset.id).addClass('port-content-navbar-active');

    // 누른 바에 따라 정해진 content 활성화
    $('.port-content-main div').find('img').hide(); // 이미지가 늦게 없어지는 문제 해결
    $('.port-content-main div').stop(true,true).removeClass('showContent');

    $('.port-content-main>div').eq(e.target.dataset.id).find('img').show();
    $('.port-content-main>div').eq(e.target.dataset.id).addClass('showContent');
});


// 이메일 누르면 복사 + 알림
$('.click-email').on('click',function(){
    var emailText = $('#email').text();
    navigator.clipboard.writeText(emailText).then(function() {
        // 성공적으로 복사된 경우
        $('#copy-confirmation').fadeIn().delay(1000).fadeOut();
    }).catch(function(error) {
        // 복사 실패한 경우
        console.error('Copy failed', error);
    });
})

