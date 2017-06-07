        var Dialog = (function () {

            function Modal() {
                this.createDialog(); // 创建Dialog
                this.bind(); // 绑定事件
            }

            Modal.prototype = {
                defaultOpts: {
                    title: '', // modal 标题
                    message: '', // modal 信息
                    isShowConfirmBtn: false, // 是否有确定按钮
                    isShowCancelBtn: true, // 是否有关闭按钮
                    onClose: function () { }, // 确定之后的回调
                    onConfirm: function () { } // 取消之后的回调
                },

                open: function (opts) {
                    this.setOpts(opts) //  
                    this.setDialog() // 设置Dialog
                    this.showDialog() // 展现Dialog
                },

                setOpts: function (opts) { // 设置信息
                    if (typeof opts === 'string') {
                        this.opts = $.extend({}, this.defaultOpts, { message: opts }) // 
                    } else if (typeof opts === 'object') {
                        this.opts = $.extend({}, this.defaultOpts, opts)
                    }
                },

                bind: function () { // 弹窗之后的按钮绑定
                    var _this = this
                    this.$dialog.find('.confirm').on('click', function () {
                        _this.opts.onConfirm() //
                        _this.hideDialog()
                    })
                    this.$dialog.find('.cancel').on('click', function () {
                        _this.opts.onClose()
                        _this.hideDialog()
                    })
                    this.$dialog.find('.btn-close').on('click', function () {
                        _this.hideDialog()
                    })
                },

                createDialog: function () { // 创建Dialog
                    var tpl = '<div class="dialog-box" style="display:none">'
                        + '<div class="cover"></div>'
                        + '<div class="dialog">'
                        + '<div class="header"><h3></h3><span class="btn-close">x</span></div>'
                        + '<div class="content"></div>'
                        + '<div class="footer">'
                        + '<button href="#" class="btn confirm">确定</button>'
                        + '<button href="#" class="btn cancel">取消</button>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                    this.$dialog = $(tpl)
                    $('body').append(this.$dialog)
                },

                setDialog: function () {  // 如果有那些属性就展示，关闭
                    if (!this.opts.title) { 
                        this.$dialog.find('.header').hide()
                    } else {
                        this.$dialog.find('.header').show()
                    }
                    if (!this.opts.isShowCancelBtn) {
                        this.$dialog.find('.cancel').hide()
                    } else {
                        this.$dialog.find('.cancel').show()
                    }
                    if (!this.opts.isShowConfirmBtn) {
                        this.$dialog.find('.confirm').hide()
                    } else {
                        this.$dialog.find('.confirm').show()
                    }
                    this.$dialog.find('.header h3').text(this.opts.title) // 添加信息
                    this.$dialog.find('.content').html(this.opts.message) // 添加信息
                },
                showDialog: function () { 
                    this.$dialog.show()
                },
                hideDialog: function () {
                    this.$dialog.hide()
                }
            }
            return new Modal()
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
                title: '欢迎来到饥人谷',
                message: 'hello',
                isShowCancelBtn: false,
                isShowConfirmBtn: false,
            })
        })
        $('.close').on('click', function () {
            Dialog.hideDialog();
        })