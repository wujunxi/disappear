/**
 * Created by Administrator on 2016/6/30.
 */
$(function () {
    // define Class Page
    function Page(id, host, path) {
        this.id = id;
        this.host = host;
        this.path = path;
    }

    // define Class PageList
    function PageList() {
        this._ar = [];
    }

    PageList.prototype.push = function (page) {
        if(page instanceof Page){
            this._ar.push(page);
            return this._ar.length;
        }
        return null;
    };

    PageList.prototype.findByUrl = function () {
        var url,host,path, i,len,result,temp,flag;
        if (arguments.length == 1) {
            url = arguments[0];
            // to-do url to host\path
            result = url.match(/^(http|https):\/\/(\w+(\.\w+){1,3})(\/[^\?]*)/);
            if(!result) return null;
            host = result[2];
            path = result[4];
        } else if(arguments.length == 2){
            host = arguments[0];
            path = arguments[1];
        }
        for(i = 0,len = this._ar.length; i < len; i++){
            temp = this._ar[i].host;
            if(temp instanceof RegExp){
                flag = temp.test(host);
            }else{
                flag = temp == host;
            }
            temp = this._ar[i].path;
            if(temp instanceof RegExp){
                flag = temp.test(path) && flag;
            }else{
                flag = (temp == path) && flag;
            }
            if(flag) {
                return this._ar[i];
            }
        }
        return null;
    };

    // push data
    var pageList = new PageList();
    pageList.push(new Page("qqzone-index", "user.qzone.qq.com", /^\/\d+$/));
    pageList.push(new Page("qqzone-infocenter", "user.qzone.qq.com", /^\/\d+\/infocenter$/));

    var selectList = [];
    var ar = [
        "#fixLayout", // 右下角通知框
        "#qz-head-level", // 空间等级icon
        ".qz-app-flag", // 手机qqzone icon
        ".qz-btn-vip-open", // 开通黄钻
        "#QM_Container_11", // 左边ad
        ".mod-side-nav-recently-used", // 游戏应用
        "#QM_Container_100005", // 右上ad
        "#QM_Container_100002", // 大家都在看
        "#QM_Container_100012", // 猜你喜欢
        "#QM_Container_3", // 谁看过我
        "#QM_Container_100003", // 谁在意我
        "#QM_Container_333" // 礼物
    ];
    selectList.push({id:"qqzone-index",selectors:ar});
    selectList.push({id:"qqzone-infocenter",selectors:ar});

    main();

    var main = function () {
        console.log("visiting:" + window.location.href);
        var page = pageList.findByUrl(window.location.host,window.location.pathname);
        if(page){
            var selectors = findInList(selectList,"id",page.id);
            if(selectors){
                doClear(selectors);
            }
        }
    };

    function doClear(selectors){
        hideElem(selectors);
        // 3s后再执行一次，处理异步数据调整布局
        setTimeout(function () {
            var result = hideElem(selectors, true);
            // 如果还有没找到的，再延时3s处理
            if (result.length > 0) {
                setTimeout(function () {
                    hideElem(result, true);
                }, 3000);
            }
        }, 3000);

    }

    function hideElem(list, isSoft) {
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

    function findInList(list, key, val) {
        var i, len;
        for (i = 0, len = list.length; i < len; i++) {
            if (list[i][key] == val) {
                return list[i];
            }
        }
        return null;
    }
});
