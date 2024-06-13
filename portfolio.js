var information=[]
var project=[]
//로컬 json에서 데이터 가져오기
$.getJSON('information.json',function(data){
    information=data.informations[0];
    project=data.projects;
    project.forEach(function(item){
        $('.port-content-projects').append(`
            <div data-id="${item.id}">
                <img src="img/${item.img[0]}">
                <p class="projects-title">${item.name}</p>
            </div>`);
    })
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
        $('.copy-box').fadeOut(200).delay(1000).fadeIn(200);
        $('.copyCheck-box').fadeIn(200).delay(1000).fadeOut(200);
    }).catch(function(error) {
        // 복사 실패한 경우
        console.error('Copy failed', error);
    });
})

// 모달창 함수
function modalAppend(projectNum){
    var imgArray=project[projectNum].img;
    var lastIndex=imgArray.length-1;
    $('.modal-box').append(`<div class="modal-img"></div>`);
    imgArray.forEach(function(item,i){
        if(i==0){ //처음 사진
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="right-button"><i class="fa-solid fa-chevron-right"></i></button>
                    <img src="img/${item}">
                </div>`); 
        }
        else if(i==lastIndex){ //마지막 사진
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="left-button"><i class="fa-solid fa-chevron-left"></i></button>
                    <img src="img/${item}">
                </div>`); 
        }
        else{ //나머지 중간 사진
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="left-button"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="right-button"><i class="fa-solid fa-chevron-right"></i></button>
                    <img src="img/${item}">
                </div>`)
        }
    })
    $('.modal-box').append(
         `<div class="modal-content">
            <div class="modal-content-name">
                <h4>${project[projectNum].name}</h4>
            </div>
            <div class="modal-content-description">
                <p>${project[projectNum].description}</p>
            </div>
            <div class="modal-content-comment">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-comment"></i>
                <i class="fa-regular fa-paper-plane"></i>
            </div>
            <div class="modal-content-move"><a href=${project[projectNum].url}><button>Go To Github</button></a></div>
         </div>`);
}

//모달창 이벤트
$('.port-content-main').on('click',".port-content-projects>div",function(e){
    $('.modal-bg').addClass('show-modal');
    $('.modal-box').css('transform','scale(1.0)'); //모달창 나올때 애니메이션

    $('.modal-box').html("");
    modalAppend(this.dataset.id); // 누른 div에 따라 다른 모달창
});

$('.close-modal').on('click',function(){
    $('.modal-bg').removeClass('show-modal');
    $('.modal-box').css('transform','scale(1.2)'); //모달창 나올때 애니메이션
    moveX=0; //슬라이드 초기화
});

// 모달창 내부의 슬라이드
var moveX=0;
$('.modal-box').on('click','.right-button',function(){
    moveX-=100;
    $('.modal-img-slide').css('transform',`translateX(${moveX}%)`);
})
$('.modal-box').on('click','.left-button',function(){
    moveX+=100;
    $('.modal-img-slide').css('transform',`translateX(${moveX}%)`);
})
