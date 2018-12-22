// 常量
var NAME_REG = /^[\u4E00-\u9FA5]{2,6}$/;
var PHONE_REG = /^1(3|4|5|7|8)\d{9}$/;
var EMAIL_REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var CARD_REG = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[XxYy])$)$/;
var DELAY = 2000;
// 校验类型
var PROOF_TYPE = [
    {
        label: '任意类型',
        value: ''
    },
    {
        label: '手机号',
        value: 'phone'
    },
    {
        label: '邮箱',
        value: 'email'
    },
    {
        label: '姓名',
        value: 'name'
    },
    {
        label: '身份证',
        value: 'card'
    }
];
var unit = {
    // 初始化设置size
    ResizeRemToPxBase: function (designWidth, remToPx) {
        var html = document.documentElement;
        html.style.fontSize = "";
        //以根节点为基数  即当前默认字体大小
        var d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        head.removeChild(d);
        var innerWidth = window.innerWidth;
        if (innerWidth > 640) {
            innerWidth = 640;
        }
        //（当前设备屏幕宽度/设计稿宽度）*（当前1rem的取值/当前默认字体大小）*100+"%"
        // html.style.fontSize = window.innerWidth / designWidth * remToPx * (defaultFontSize / 50) + "px";
        html.style.fontSize = innerWidth / designWidth * remToPx * (defaultFontSize / 50) + "px";
        head = null;
        html = null;
    },
    // 判空正则
    IsEmpty: function (str) {
        if (str === null || str === '' || str === undefined) {
            return false;
        }
        else {
            return true;
        }
    },
    // 用户名验证
    IsName: function (str) {
        if (NAME_REG.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    // 邮箱正则验证
    IsEmail: function (str) {
        if (EMAIL_REG.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    // 电话正则验证
    IsPhone: function (str) {
        if (PHONE_REG.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    // 身份证正则验证
    IsCard: function (str) {
        if (CARD_REG.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
};
// jquery操作的方法
var sky = {
    // 绑定事件函数
    refer: function () {
        var submit = 'putIn';
        var minus = 'minus';
        var add = 'add';
        var type = 1;
        var click = true;
        // 绑定点击事件
        $('#app').click(function (ev) {
            var event = ev || window.event;
            var target = event.target || event.srcElement;
            var className = target.className;
            // 表单提交的
            if (className.indexOf(submit) !== -1) {
                if (click === true) {
                    // 防止连续点击
                    click = false;
                    setTimeout(function () {
                        click = true;
                    }, 2000);
                    var formId_1 = $(target).attr('data-form-id');
                    var title_1 = $(target).attr('data-title');
                    var form = $(target).parent().siblings('.refer');
                    var refs = sky.ref(form);
                    var Tally = form.find('.form-tally');
                    var arr = form.sky_serializeArray();
                    console.log(arr);
                    // 判断是否已经提交过了
                    var sub_bool = sessionStorage.getItem(formId_1);
                    if (unit.IsEmpty(sub_bool)) {
                        // 已经提交过了
                        sky.pointOut('', 99, title_1);
                    }
                    else {
                        var bool = true;
                        var type_1 = 1;
                        // 所有
                        var str_1 = '';
                        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                            var item = arr_1[_i];
                            if (bool === true) {
                                for (var _a = 0, refs_1 = refs; _a < refs_1.length; _a++) {
                                    var ref = refs_1[_a];
                                    if (item.name === ref.name) {
                                        if (item.value === '') {
                                            if (ref.must === true) {
                                                bool = false;
                                                type_1 = 3;
                                                // 类型判断
                                                str_1 = item.name;
                                                break;
                                            }
                                        }
                                        else {
                                            if (unit.IsEmpty(ref.proof)) {
                                                // 进行正则校验
                                                switch (ref.proof) {
                                                    case 'name':
                                                        bool = unit.IsName(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'phone':
                                                        bool = unit.IsPhone(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'email':
                                                        bool = unit.IsEmpty(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'card':
                                                        bool = unit.IsCard(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        }
                                        if (bool === false) {
                                            break;
                                        }
                                    }
                                    else if (item.name === ref.name) {
                                        // 不是必填，又没有填写的时候走的逻辑
                                        if (item.value === '') {
                                            // 类型判断
                                            break;
                                        }
                                        else {
                                            if (unit.IsEmpty(ref.proof)) {
                                                // 进行正则校验
                                                switch (ref.proof) {
                                                    case 'name':
                                                        bool = unit.IsName(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'phone':
                                                        bool = unit.IsPhone(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'email':
                                                        bool = unit.IsEmpty(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    case 'card':
                                                        bool = unit.IsCard(item.value);
                                                        str_1 = item.name;
                                                        type_1 = 2;
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        }
                                        if (bool === false) {
                                            break;
                                        }
                                    }
                                }
                                if (bool === false) {
                                    break;
                                }
                            }
                        }
                        // 进行提醒
                        if (bool === false) {
                            sky.pointOut(str_1, type_1, title_1);
                        }
                        else {
                            // 这里进行表单数据的ajax请求
                            var $node = $('#none');
                            var viewId = $node.attr('data-view-id');
                            var url = '/DiyWebsite/SubmitForm';
                            var params = {
                                guid: viewId,
                                formId: formId_1,
                                form: JSON.stringify(arr)
                            };
                            $.ajax({
                                url: url,
                                method: 'POST',
                                data: params,
                                dataType: 'JSON',
                                success: function (data) {
                                    if (data.code == 1) {
                                        // 提交成功，写入session不可重复提交
                                        sessionStorage.setItem(formId_1, 'yes');
                                        sky.pointOut(str_1, 1, title_1);
                                    }
                                    else {
                                        sky.pointOut(str_1, 0, title_1);
                                    }
                                },
                                error: function (err) {
                                    console.log(err);
                                    sky.pointOut(str_1, 0, title_1);
                                }
                            });
                        }
                    }
                }
                else {
                    console.log('不可连点');
                }
            }
            else if (className.indexOf(minus) !== -1) {
                // 计数减少的
                var $numInput = $(target).siblings('.tally-item');
                var num = parseInt($numInput.val());
                var min = parseInt($numInput.attr('data-minNumber'));
                if (num > min) {
                    num--;
                    $numInput.val(num);
                }
                else {
                    var str = '该选项最小值为' + min;
                    sky.pointOut(str, 4, '');
                }
            }
            else if (className.indexOf(add) !== -1) {
                // 计数减少的
                var $numInput = $(target).siblings('.tally-item');
                var num = $numInput.val();
                var max = parseInt($numInput.attr('data-maxNumber'));
                if (num < max) {
                    num++;
                    $numInput.val(num);
                }
                else {
                    var str = '该选项最大值为' + max;
                    sky.pointOut(str, 4, '');
                }
            }
        });
        // 绑定input事件
        $('.tally-item').change(function (ev) {
            var event = ev || window.event;
            var target = event.target || event.srcElement;
            var className = target.className;
            console.log(className);
            if (className.indexOf('tally-item') !== 1) {
                var num = $(target).val();
                var min = parseInt($(target).attr('data-minNumber'));
                var max = parseInt($(target).attr('data-maxNumber'));
                if (num < min) {
                    var str = '该选项最小值为' + min;
                    sky.pointOut(str, 4, '');
                    $(target).val(min);
                }
                else if (num > max) {
                    var str = '该选项最大值为' + max;
                    sky.pointOut(str, 4, '');
                    $(target).val(max);
                }
            }
        });
    },
    // 返回不能为空的label
    ref: function (form) {
        var $refs = $(form).find('.ref');
        var a = [];
        $refs.each(function (index, item) {
            var temp = {};
            var name = $(item).find('input').attr("name");
            var proof = $(item).find('input').attr("data-proof");
            if ($(item).hasClass('xinghao')) {
                temp = { name: name, proof: proof, must: true };
            }
            else {
                temp = { name: name, proof: proof, must: false };
            }
            a.push(temp);
        });
        return a;
    },
    // 提示函数，弹出模态框提示输入问题
    pointOut: function (str, type, title) {
        // 1成功，2警告，3错误，默认警告
        var icon = "icon-jinggao";
        var tip = "\u8BF7\u8F93\u5165\u6B63\u786E\u7684" + str;
        switch (type) {
            case 0:
                icon = "icon-jinggao";
                tip = "\u63D0\u4EA4\u5931\u8D25";
                break;
            case 1:
                icon = "icon-wancheng-copy";
                tip = "\u63D0\u4EA4\u6210\u529F";
                break;
            case 2:
                icon = "icon-jinggao";
                tip = "\u8BF7\u8F93\u5165\u6B63\u786E\u7684" + str;
                break;
            case 3:
                icon = "icon-cuowu";
                tip = str + "\u4E3A\u5FC5\u586B\u9879";
                break;
            case 4:
                icon = "icon-jinggao";
                tip = str;
                break;
            case 99:
                icon = "icon-wancheng-copy";
                tip = "\u4F60\u5DF2\u7ECF\u63D0\u4EA4\u8FC7\u8868\u5355\u4E86\uFF01";
                break;
            default:
                icon = "icon-jinggao";
                tip = "\u8BF7\u8F93\u5165\u6B63\u786E\u7684" + str;
        }
        // html片段
        var html = "<div class=\"warn\">\n        <div class=\"warn-header\">\n            <div class=\"warn-title\">" + title + "</div>\n            <div class=\"warn-close\">\n                <i class=\"iconfont icon-guanbi\"></i>\n            </div>\n        </div>\n        <div class=\"warn-body\">\n            <div class=\"icon iconfont " + icon + "\"></div>\n        </div>\n        <div class=\"warn-footer\">" + tip + "</div>\n    </div>";
        var $point = $('#point');
        $point.html(html);
        $point.fadeIn();
        var timer = setTimeout(function () {
            $point.fadeOut();
            clearTimeout(timer);
        }, DELAY);
    },
    // 关闭函数
    pointClose: function () {
        var $point = $('#point');
        $point.click(function (ev) {
            var event = ev || window.event;
            var target = event.target || event.srcElement;
            if (target.className.indexOf('icon-guanbi') !== -1) {
                $point.fadeOut();
            }
        });
    }
};
window.onload = function () {
    /*
  *  在此调用自己的方法
  * */
    //目前设计稿750， 根 font-size 100px  尺寸 除以100  单位：rem
    unit.ResizeRemToPxBase(750, 100);
};
// 自定义dom方法
sky.refer();
// 弹窗方法
sky.pointClose();
window.onresize = function () {
    unit.ResizeRemToPxBase(750, 100);
};
// jquery方法的扩展
$.fn.sky_serializeArray = function () {
    var a = this.serializeArray();
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    var temp = {};
    $.each($radio, function () {
        if (!temp.hasOwnProperty(this.name)) {
            if ($("input[name='" + this.name + "']:checked").length == 0) {
                temp[this.name] = "";
                a.push({ name: this.name, value: "" });
            }
        }
    });
    return a;
};
