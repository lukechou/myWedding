/**
 * Created by csu412 on 2015/4/22.
 */
var currentPage = 1;
var pageCount;

window.onload = function () {
    pageCount = $(".img-list").find("li").length;

    $(".cutImgLi").click(function () {
        var index = $(".cutImgLi").index(this);
        currentPage = index + 1;
        showImg(currentPage);
    });

    $(".container-list").hover(function(){
        if(adTimer){
            //console.log("the mouse is hover on the container-list");
            clearInterval(adTimer);
        }
    },function(){
        adTimer = setInterval(function(){
        showImg(currentPage);
        currentPage ++;
        //console.log(currentPage,pageCount);
        if(currentPage > pageCount){
            currentPage = 1;
            }
        },4000);
    }).trigger("mouseleave");

    drawMap();
    displayWishes();

    document.getElementById("audio1").volume = 0.35;
    console.log(document.getElementById("audio1").volume);
}

//var pageCount = $(".img-list").find("li").length;
function gotoWedding(){
   // alert("yes");
    $(".container").fadeOut();
    $(".inforPart").fadeIn();
    $("#gohome-span").css("display","inline-block");

    $("#happyWords").fadeOut();
    $("#happyWords2").fadeIn();

    $("#mapContainer").width($(".inforPart").width() - $(".leftDiv").width() - 20);

}

function gotoHome(){
    $("#gohome-span").css("display","none");
    $(".container").fadeIn();
    $(".inforPart").fadeOut();

    $("#happyWords").fadeIn();
    $("#happyWords2").fadeOut();
}

function sendWishes(){
    var wishes_words = $(".wishes_words").text();
    var name  = $(".name").text();
    var $p = document.createElement('p');
    $p.innerHTML = wishes_words+"<span>from" + name +"<span>";
    $(".wishes").append($p);
}

function showImg(currentPage){
    var $v_content = $(".container-list");
    var $v_show = $(".img-list");
    var $v_show_width = $v_content.width();
    $v_show.animate({left: - $v_show_width * (currentPage-1)},"normal");

    var $cutImgOl = $(".container").find("ol.cutImgOl");
    $cutImgOl.find("li").eq(currentPage-1)
        .addClass("active")
        .siblings().removeClass("active");
}

function cutImgToLeft(){
    var index = $cutImgOl = $(".container").find("ol.cutImgOl").find("li[class *= active]").index();
     currentPage = index + 1;
    currentPage ++ ;
    if(currentPage > pageCount){
        currentPage = 1;
    }
    showImg(currentPage);
}
function cutImgToRight(){
    var index = $cutImgOl = $(".container").find("ol.cutImgOl").find("li[class *= active]").index();
     currentPage = index + 1;
    currentPage -- ;
    if(currentPage < 1){
        currentPage = pageCount;
    }
    showImg(currentPage);
}

function displayWishes(){
    var i;
    var innerHtml='';
    for(i = 0; i < wishes.length; i ++){
        var words = wishes[i][0];
        var name = wishes[i][1];
        var p = "<p>"+words+"&nbsp;&nbsp;&nbsp;from&nbsp;&nbsp;<span style='color: mediumaquamarine; font-style: italic'>"+name+"</span></p>";
        innerHtml += p;
    }
    $(".wishes").html(innerHtml);
    //console.log($(".wishes"));
}
