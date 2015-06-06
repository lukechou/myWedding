/**
 * Created by csu412 on 2015/4/22.
 */
var currentPage = 1;
var pageCount;

$(document).ready(function(){
    //alert("温馨提示: 1,请建议使用谷歌(Chrome)、火狐(Firefox)等高级浏览器，在电脑上访问；不建议使用IE浏览器，或在手机上访问. "+
       // "2,如果访问出错，比如提示404错误，可以发邮件至598199879@qq.com反映，我们将在第一时间修复。谢谢。");
});
window.onload = function () {
    pageCount = $(".img-list").find("li").length;
    showImg(currentPage);

    $(".cutImgLi").click(function () {
        var index = $(".cutImgLi").index(this);
        currentPage = index + 1;
        showImg(currentPage);
    });

    $(".container").hover(function(){
        if(adTimer){
            //console.log("the mouse is hover on the container-list");
            clearInterval(adTimer);
        }
    },function(){
        //showImg(currentPage);
        adTimer = setInterval(function(){
        currentPage ++;
        showImg(currentPage);
        //console.log(currentPage,pageCount);
        },5000);
    }).trigger("mouseleave");

    drawMap();
    displayWishes();
    cloneImages(".img-list ul:first-child");

    document.getElementById("audio1").volume = 0.35;
    console.log(document.getElementById("audio1").volume);
}

function cloneImages(father){
    var $fa = $(father);
    var innerHtml = $fa.html();
    $fa.prepend(innerHtml);
    $fa.append(innerHtml);

    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    console.log('width: '+screenWidth+"  height:  "+screenHeight);
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

function showImg(currentP){
    var $v_content = $(".container-list");
    var $v_show = $(".img-list");
    var $v_show_width = $v_content.width();
    //console.log(pageCount);

    //此处遭遇一个坑：由于动画执行需要一定的时间，所以如果不是在动画执行完毕后的function里判断currentp是否小于1或者大于pagecount，
    //if判断语句中的语句可能会在动画完成之前就执行，那么最后还是动画的效果的结果。
    $v_show.animate({left: - $v_show_width * (pageCount + currentP-1)},"normal",function(){
        if(currentP < 1){
            $v_show.css({left:- $v_show_width * (pageCount + pageCount -1)});
            currentPage = pageCount;
            //console.log($v_show.css('left'));
        }
        if(currentP > pageCount){
            $v_show.css("left",- $v_show_width * pageCount);
            //$v_show.css({left:- $v_show_width * pageCount});
            currentPage = 1;
            //console.log($v_show.css('left'));
        }
        //console.log(currentPage);
        var $cutImgOl = $(".container").find("ol.cutImgOl");
        $cutImgOl.find("li").eq(currentPage -1)
            .addClass("active")
            .siblings().removeClass("active");
    });

}

function cutImgToLeft(){
    var index = $cutImgOl = $(".container").find("ol.cutImgOl").find("li[class *= active]").index();
     currentPage = index + 1;
    currentPage ++ ;
    showImg(currentPage);
}
function cutImgToRight(){
    var index = $cutImgOl = $(".container").find("ol.cutImgOl").find("li[class *= active]").index();
     currentPage = index + 1;
    currentPage -- ;
    //console.log(currentPage);
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
