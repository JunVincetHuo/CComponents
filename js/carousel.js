/* 
 **  1.属性
 **  2.方法
 **  3.绑定
 */

function Carousel($ct) {
    this.$ct = $ct;
    this.init();
    this.bind();
}

Carousel.prototype = {
    init: function () {
        var $imgCt = this.$imgCt = this.$ct.find('.carousel'), // 图片盒子
            $left = this.$left = this.$ct.find('.arrow-left'), // 左按钮
            $right = this.$right = this.$ct.find('.arrow-right'), // 右按钮
            $items = $imgCt.children(), // 轮播图片
            $bottomNav = this.$bottomNav = this.$ct.find('.bottom-nav') // 底部按钮

        this.$imgWidth = $items.width(); // 图片容器宽度
        this.$imgCount = $items.length; // 图片数量
        console.log(this.$imgCount)

        $imgCt.prepend($items.last().clone());
        $imgCt.append($items.first().clone());

        var newImgWidth = this.$imgWidth * $imgCt.children().length;
        $imgCt.css({
            width: ($imgCt.children().length * 100) + '%',
            left: 0 - 100 + '%'
        })

        this.curIdx = 0;
        this.isAnimate = false; //锁
        this.autoPlay();
    },

    bind: function () {
        var _this = this;
        // 左按钮
        this.$left.on('click', function (e) {
            e.preventDefault();
            _this.playPre();

        })
        // 右按钮
        this.$right.on('click', function (e) {
            e.preventDefault();
            _this.playNext();
        })

        this.$bottomNav.find('li').on('click',function(){
            var idx = $(this).index();
            if(idx > _this.curIdx){
                _this.playNext(idx - _this.curIdx);
            }
            else if(idx < _this.curIdx){
                _this.playPre(_this.curIdx - idx);
            }
        })
    },

    // 左
    playPre: function (idx) {
        var idx = idx || 1;
        var _this = this;
        if (!_this.isAnimate) {
            _this.isAnimate = true;
            _this.$imgCt.animate({
                left: '+=' + (100 * idx + '%')
            }, function () {
                _this.curIdx = (_this.curIdx + _this.$imgCount - idx) % _this.$imgCount;
                if (_this.curIdx === _this.$imgCount - 1) {
                    _this.$imgCt.css({
                        left: (0 - 100 * _this.$imgCount) + '%'
                    })
                }
                _this.isAnimate = false;
                _this.setBottomBtn();
            })
        }
    },

    // 右
    playNext: function (idx) {
        var _this = this;
        var idx = idx || 1;
        if (!_this.isAnimate) {
            _this.isAnimate = true;
            _this.$imgCt.animate({
                left: '-=' + (100 * idx + '%')
            }, function () {
                _this.curIdx = (_this.curIdx + idx) % _this.$imgCount;
                if (_this.curIdx === 0) {
                    _this.$imgCt.css({
                        left: 0 - 100 + '%'
                    })
                    _this.curIdx = 0;
                }
                _this.isAnimate = false;
                _this.setBottomBtn();
            })
        }
    },

    // 底部按钮
    setBottomBtn: function () {
        this.$bottomNav.find('li').removeClass('active').eq(this.curIdx).addClass('active');
    },

    // 自动播放
    autoPlay:function(){
        var _this = this;
        clocl = setInterval(function(){
            _this.playNext()
        },5000)
    }
}

var carousel = (function () {
    return {
        init: function ($targets) {
            $targets.each(function (index, node) {
                new Carousel($(node))
            })
        }
    }
})();

carousel.init($('#carousel-box'));