var Dialog = (function(){

    function Model(){
        this.createDialog(); // 创建Dialog
        this.bind(); // 绑定事件
    }

    Model.prototype = {
        // 创建基本信息
        defaultOpts:{
            title:'', // modal 标题
            message:'', // modal 信息
            isShowConfirmBtn:false, // modal 按钮
            isShowCancelBtn:true, // modal 按钮
            onClose:function(){ }, // 确定 回调
            onConfirm:function(){ } // 取消 回调
        },

        open:function(opts){
            this.setOpts(opts) // 设置用户所输入的信息 
            this.setDialog() // 设置Dialog
            this.showDialog() // 展现Dialog
        },
        
        // 设置用户所输入的信息
        setOpts:function(opts){
            // 如果单纯只输入一字符串，只输出message，输入一个对象，输出对象
            if (typeof opts === 'string'){
                this.opts = $.extend({},this.defaultOpts,{message:opts})
            }else if (typeof opts === 'object'){
                this.opts = $.extend({},this.defaultOpts,opts)
            }
        },

        // 设置信息
        createDialog:function(){
            // modal元素结构
            var tpl = '<div class="dialog-box" style="display:none">'
                    + '<div class="cover"></div>'
                    + '<div class="dialog">'
                    + '<div class="header"><h3></h3><span class="btn-close">x</span></div>'
                    + '<div class="content"></div>'
                    + '<div class="footer"> <button class="btn confirm">确定</button> <button class="btn cancel">取消</button></div>'
                    + '</div>'
                    + '</div>'
            this.$dialog = $(tpl)
            $('body').append(this.$dialog)
        },

        // 如果有头部 就显示头部，如果有按钮就显示按钮，内容是必须的
        setDialog:function(){
            this.opts.title?this.$dialog.find('.header').show():this.$dialog.find('.header').hide();
            this.opts.isShowCancelBtn?this.$dialog.find('.cancel').show():this.$dialog.find('.cancel').hide();
            this.opts.isShowConfirmBtn?this.$dialog.find('.confirm').show():this.$dialog.find('.confirm').hide();
            this.$dialog.find('.header h3').text(this.opts.title)
            this.$dialog.find('.content').html(this.opts.message)
        },
        
        showDialog:function(){
            this.$dialog.show()
        },

        hideDialog:function(){
            this.$dialog.hide()
        },

        bind:function(){
            var _this = this;
            this.$dialog.find('.confirm').on('click',function(){
                _this.opts.onConfirm() // 元素回调
                _this.hideDialog() 
            })
            this.$dialog.find('.cancel').on('click',function(){
                _this.opts.onClose() // 元素回调
                _this.hideDialog()
            })
            this.$dialog.find('.btn-close').on('click',function(){
                _this.hideDialog()
            })
        }
    }
    return new Model()
})()


        $('.open1').on('click', function () {
            Dialog.open('hello, 这里是互联网的世界')
        })
        $('.open2').on('click', function () {
            Dialog.open('<a href="http://home.jscode.me/c/tasks">饥人谷</a>')
        })
        $('.open3').on('click', function () {
            Dialog.open({
                title: '欢迎来到互联网的世界', 
                message: 'welcome to the world of IT!',
                isShowCancelBtn: true,
                isShowConfirmBtn: true,
                onClose: function () {
                    alert('close')
                },
                onConfirm: function () {
                    alert('confirm')
                }
            })
        })
        var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li><li>列表5</li>'
        $('.open4').on('click', function () {
            Dialog.open({
                title: '欢迎来到互联网的世界',
                message: tpl,
                isShowCancelBtn: true,
                isShowConfirmBtn: true,
                onClose: function () {
                    alert('close')
                },
                onConfirm: function () {
                    alert('confirm')
                }
            })
        })
        $('.open5').on('click', function () {
            Dialog.open({
                title: '欢迎来到互联网的世界',
                message: 'hello',
                isShowCancelBtn: false,
                isShowConfirmBtn: false,
            })
        })
        $('.close').on('click', function () {
            Dialog.hideDialog();
        })