/**
 * Created by csu412 on 2015/4/24.
 */
 function drawMap(){
    var map = new BMap.Map("mapContainer");
    var point = new BMap.Point(112.572853,33.002176);
    var centerPoint = new BMap.Point(112.551774,33.014474);
    map.centerAndZoom(centerPoint,15);
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
    map.addControl(new BMap.ScaleControl({offset: new BMap.Size(50,15)}));//添加比例尺，PC上默认在左下角（这里我添加了偏移量）
    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));  //右下角，打开

    var marker = new BMap.Marker(point);  // 创建标注，为要查询的地方对应的经纬度
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
        '<img src="img/wangfu.jpg" alt="" style="float:left;zoom:1;overflow:hidden;width:100px;height:100px;margin-right:3px;"/>' +
        '地址:医圣祠街与独山大道中段交叉口南118米路西<br>电话：(0377)61168666<br>中餐馆</div>';
    //创建检索信息窗口对象
    var searchInfoWindow = null;
    searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title  : "旺府酒店",      //标题
        width  : 290,             //宽度
        height : 105,              //高度
        panel  : "panel",         //检索结果面板
        enableAutoPan : false,     //自动平移
        searchTypes   :[
            BMAPLIB_TAB_TO_HERE,  //到这里去
            BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
    });
   // marker.enableDragging(); //marker可拖拽
    marker.addEventListener("click", function(e){
        searchInfoWindow.open(marker);
    });
    map.addOverlay(marker); //在地图中添加marker
}
