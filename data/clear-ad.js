/**
 * Created by Administrator on 2016/6/30.
 */
$(function () {
    var selectList = [
        "#fixLayout", // 右下角通知框
        "#qz-head-level", // 空间等级icon
        ".qz-app-flag", // 手机qqzone icon
        ".qz-btn-vip-open", // 开通黄钻
        "#QM_Container_11", // 左边ad
        "#applist_html", // 游戏应用
        "#QM_Container_100005", // 右上ad
        "#QM_Container_100002", // 大家都在看
        "#QM_Container_100012", // 猜你喜欢
        "#QM_Container_3", // 谁看过我
        "#QM_Container_100003", // 谁在意我
        "#QM_Container_333" // 礼物
    ];

    hideList(selectList);
    // 3s后再执行一次，处理异步数据调整布局
    setTimeout(function () {
        var result = hideList(selectList, true);
        // 如果还有没找到的，再延时3s处理
        if(result.length > 0){
            setTimeout(function(){
                hideList(result,true);
            },3000);
        }
    }, 3000);

    function hideList(list, isSoft) {
        var i, len, $elem, foundList = [], notFoundList = [];
        for (i = 0, len = list.length; i < len; i++) {
            $elem = $(list[i]);
            if ($elem.length > 0) {
                if (isSoft) {
                    $elem.fadeOut();
                } else {
                    $elem.hide();
                }
                foundList.push(list[i]);
            } else {
                notFoundList.push(list[i]);
            }
        }
        console.log(foundList.length + " found :" + foundList);
        console.log(notFoundList.length + " not found :" + notFoundList);
        return notFoundList;
    }
});
