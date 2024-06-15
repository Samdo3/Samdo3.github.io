var information=[];
var project=[];
var Heart=[false,false];
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
$('.navbar-button').on('click touchstart',function(e){
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
$('.click-email').on('click touchstart',function(){
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
    // 모달창 만들기 전에 예전꺼 전부 제거
    $('.modal-box').html("");
    $('.modal-left-button').remove();
    $('.modal-right-button').remove();

    // 프로젝트 첫번째꺼, 마지막꺼, 중간꺼에 따라 넘기는 화살표 버튼 생성
    if(projectNum==0){
        $('.modal-bg').prepend(`<button class="modal-right-button"><i class="fa-solid fa-chevron-right"></i></button>`);
    }
    else if(projectNum==(project.length-1)){
        $('.modal-bg').prepend(`<button class="modal-left-button"><i class="fa-solid fa-chevron-left"></i></button>`);
    }
    else{
        $('.modal-bg').prepend(`<button class="modal-left-button"><i class="fa-solid fa-chevron-left"></i></button>`);
        $('.modal-bg').prepend(`<button class="modal-right-button"><i class="fa-solid fa-chevron-right"></i></button>`);
    }

    // 한 프로젝트에 여러사진들 슬라이드
    $('.modal-box').append(`<div class="modal-img"></div>`);
    imgArray.forEach(function(item,i){
        if(i==0){ //처음 사진 화살표
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="right-button"><i class="fa-solid fa-chevron-right"></i></button>
                    <img src="img/${item}">
                </div>`); 
        }
        else if(i==lastIndex){ //마지막 사진 화살표
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="left-button"><i class="fa-solid fa-chevron-left"></i></button>
                    <img src="img/${item}">
                </div>`); 
        }
        else{ //나머지 중간 사진 화살표
            $('.modal-img').append(
                `<div class="modal-img-slide">
                    <button class="left-button"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="right-button"><i class="fa-solid fa-chevron-right"></i></button>
                    <img src="img/${item}">
                </div>`)
        }
    })
    // 모달창 형식
    $('.modal-box').append(
         `<div class="modal-content">
            <div class="modal-content-name">
                <h4>${project[projectNum].name}</h4>
            </div>
            <div class="modal-content-description">
                <p>${project[projectNum].description}</p>
            </div>
            <div class="modal-content-comment">
                <i class="comment-heart fa-regular fa-heart"></i>
                <i class="comment-comment fa-regular fa-comment"></i>
                <i class="comment-plane fa-regular fa-paper-plane"></i>
            </div>
            <div class="modal-content-move"><a href=${project[projectNum].url}><button>Go To Github</button></a></div>
         </div>`);

    // 하트됬었지는 확인
    if(Heart[projectNum]==true){
        $('.comment-heart').removeClass("fa-regular").addClass("fa-solid");
        $('.comment-heart').css("color","red");
    }
    // 하트 클릭 이벤트
    $('.modal-box').off('click touchstart', '.comment-heart').on('click touchstart',".comment-heart",function(e){
        e.stopPropagation(); 
        // 하트 클릭 했었는지 프로젝트별로 배열에 저장
        if(Heart[projectNum]==false){
            $('.comment-heart').removeClass("fa-regular").addClass("fa-solid");
            $('.comment-heart').css("color","red");
            $('.modal-content-move button').css("animation","뱃지흔들 1s ease");
            Heart[projectNum]=true;
        }
        else if(Heart[projectNum]==true){
            $('.comment-heart').removeClass("fa-solid").addClass("fa-regular");
            $('.comment-heart').css("color","");
            $('.modal-content-move button').css("animation","");
            Heart[projectNum]=false;
        }
    });
}

// 모바일 크기일때 html 순서 변경 함수
function mediaQuery(projectNum){
    var windowWidth = $(window).width();

    if(windowWidth<=768){
       $(".modal-content-description").remove();
       $('.modal-img').insertAfter('.modal-content-name');
       $(".modal-content-move").remove();
    }
    else{
        modalAppend(projectNum);
    }

}

//모달창 이벤트
$('.port-content-main').on('click touchstart',".port-content-projects>div",function(e){
    var projectNum=this.dataset.id;
    $('.modal-bg').addClass('show-modal');
    $('.modal-box').css('transform','scale(1.0)'); //모달창 나올때 애니메이션
    modalAppend(projectNum); // 누른 div에 따라 다른 모달창

    // 오른쪽 화살표 누르면 프로젝트 넘버 +1 해서 모달창
    $('.modal-bg').off('click touchstart', '.modal-right-button').on('click touchstart',".modal-right-button",function(e){
        projectNum=(parseInt(projectNum)+1).toString();
        modalAppend(projectNum);
        mediaQuery(projectNum)
    });
    // 왼쪽 화살표 누르면 프로젝트 넘버 -1 해서 모달창
    $('.modal-bg').off('click touchstart', '.modal-left-button').on('click touchstart',".modal-left-button",function(e){
        projectNum=(parseInt(projectNum)-1).toString();
        modalAppend(projectNum);
        mediaQuery(projectNum)
    });

    mediaQuery(projectNum);

    //모바일 크기일때 html 순서 변경
    $(window).on('resize', function() {
        mediaQuery(projectNum);
    });
});

// X표시 눌렀을때 모달창 닫는 기능
$('.close-modal').on('click touchstart',function(){
    $('.modal-bg').removeClass('show-modal');
    $('.modal-box').css('transform','scale(1.2)'); //모달창 나올때 애니메이션
    moveX=0; //슬라이드 초기화
});

// 모달창 내부의 슬라이드
var moveX=0;
$('.modal-box').on('click touchstart','.right-button',function(){
    moveX-=100;
    $('.modal-img-slide').css('transform',`translateX(${moveX}%)`);
})
$('.modal-box').on('click touchstart','.left-button',function(){
    moveX+=100;
    $('.modal-img-slide').css('transform',`translateX(${moveX}%)`);
})

// 하트 애니메이션
$('.modal-box').on('mouseleave',".comment-heart",function(){
    $(this).css('transform','scale(1.2)');

    setTimeout(()=>{
        $(this).css("transform","scale(1)");
    },100);
})