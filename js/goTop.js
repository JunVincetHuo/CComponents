function GoTop($ct){
    this.$ct = $ct || $('body'); // 容器
    this.$target = $('<button class="goTopBtn">Go Top</button>'); // 
    this.createNode();
    this.bindEvent();
}
GoTop.prototype = {
    bindEvent:function(){
        var _this = this;
        this.$target.on('click',function(){
            $(window).scrollTop(0);
        })
        $(window).on('scroll',function(){
            $(this).scrollTop()>100?_this.$target.show():_this.$target.hide();
        })
    },
    createNode:function(){
        this.$ct.append(this.$target);
        this.$target.hide();
    }
}

var goTop = (function(){
    return {
        init:function(){
            new GoTop()
        }
    }
})()

goTop.init();

