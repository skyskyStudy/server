declare const $:any;

// 常量
const NAME_REG = /^[\u4E00-\u9FA5]{2,4}$/
const PHONE_REG = /^1(3|4|5|7|8)\d{9}$/
const EMAIL_REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const CARD_REG = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[XxYy])$)$/;

const unit = {
  // 初始化设置size
  ResizeRemToPxBase: function(designWidth, remToPx){
    let html = document.documentElement;
    html.style.fontSize = "";
    //以根节点为基数  即当前默认字体大小
    let d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    let head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    let defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));

    head.removeChild(d);

    let innerWidth = window.innerWidth;
    if (innerWidth > 640) {
      innerWidth = 640
    }

    //（当前设备屏幕宽度/设计稿宽度）*（当前1rem的取值/当前默认字体大小）*100+"%"
    // html.style.fontSize = window.innerWidth / designWidth * remToPx * (defaultFontSize / 50) + "px";
    html.style.fontSize = innerWidth / designWidth * remToPx * (defaultFontSize / 50) + "px";
    head = null;
    html = null;
  },

  // 用户名验证
  IsName(str: string) {
    if (NAME_REG.test(str)) {
      return true
    } else {
      return false
    }
  },

  // 邮箱正则验证
  IsEmail(str: string) {
    if (EMAIL_REG.test(str)) {
      return true;
    } else {
      return false;
    }
  },

  // 电话正则验证
  IsPhone(str: string) {
    if (PHONE_REG.test(str)) {
      return true;
    } else {
      return false;
    }
  },

  // 身份证正则验证
  IsCard(str: string) {
    if (CARD_REG.test(str)) {
      return true;
    } else {
      return false;
    }
  }

};

// jquery操作的方法
const sky = {
  // 提交
  refer: () => {
    let name = 'putIn';
    $('#app').click(function (ev) {
      let event = ev || window.event;

      let target = event.target || event.srcElement;
      let className = target.className;
      if (className.indexOf(name) !== -1) {
        let form = $(target).parent().siblings('.refer');
        let input = form.find('input');

        let arr = form.serializeArray();
        console.log(arr[1].value);
        let isName = unit.IsCard(arr[1].value);
        console.log(isName);
      }
    })
  }
}



window.onload = function () {
  /*
*  在此调用自己的方法
* */
// debugger
//目前设计稿750， 根 font-size 100px  尺寸 除以100  单位：rem
  unit.ResizeRemToPxBase(750, 100);
}

// 自定义dom方法
sky.refer();

window.onresize = function() {
  unit.ResizeRemToPxBase(750, 100);
}