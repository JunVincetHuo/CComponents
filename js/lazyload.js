/* 
 ** 1.属性
 ** 2.方法
 ** 3.绑定
 */

function Exposure($target, callback) {
    this.$target = $target; // 元素
    this.callback = callback; // 用于回调
    this.bind();
    this.check();
}

Exposure.prototype = {
    bind: function () {
        var _this = this;
        $(window).on('scroll',function(){
            _this.check();
        })
    },
    check: function () {
        var _this = this;
        if (this.isShow(this.$target)) {
            this.callback(this.$target);
        }
    },
    isShow: function () {
        var _this = this;
        var winHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            offsetTop = this.$target.offset().top,
            nodeHeight = this.$target.height();
        // 什么时候开始触发
        if(winHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight){
            return true;
        }else{
            return false;
        }
    }
}

var Lazy = (function(){
    return {
        init:function($targets,callback){
            $targets.each(function(idx,target){
                new Exposure($(target),callback)
            })
        },
        one:function($targets,callback){
            
        }
    }
})();

Lazy.init($('#hello'),function($node){
    $node.text($node.text()+'曝光加载成功!')
});
Lazy.init($('#world'),function($node){
    $node.text($node.text()+'曝光加载成功!')
})
Lazy.init($('.container img'),function($node){
    showImg($node)
})

function showImg($img){
    var imgUrl = $img.attr('data-src');
    $img.attr('src',imgUrl)
}
