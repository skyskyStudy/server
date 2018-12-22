declare const $:any;
declare const jQuery:any;

// 常量
const NAME_REG = /^[\u4E00-\u9FA5]{2,6}$/
const PHONE_REG = /^1(3|4|5|7|8)\d{9}$/
const EMAIL_REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const CARD_REG = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[XxYy])$)$/;

const DELAY = 2000;
// 校验类型
const PROOF_TYPE = [
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
]

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

  // 判空正则
  IsEmpty: function (str) {
    if (str === null || str === '' || str === undefined) {
      return false;
    } else {
      return true;
    }
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
  // 绑定事件函数
  refer: () => {
    let submit = 'putIn';
    let minus = 'minus';
    let add = 'add';
    let type = 1;
    let click: boolean = true;

    // 绑定点击事件
    $('#app').click(function (ev) {
      let event = ev || window.event;

      let target = event.target || event.srcElement;

      let className = target.className;

      // 表单提交的
      if (className.indexOf(submit) !== -1) {
        if (click === true) {
          // 防止连续点击
          click = false;

          setTimeout(function () {
            click = true;
          }, 2000)

          let formId = $(target).attr('data-form-id');
          let title = $(target).attr('data-title');
          let form = $(target).parent().siblings('.refer');
          let refs = sky.ref(form);
          let Tally = form.find('.form-tally');

          let arr = form.sky_serializeArray();
          console.log(arr);

          // 判断是否已经提交过了
          let sub_bool = sessionStorage.getItem(formId);
          if (unit.IsEmpty(sub_bool)) {
            // 已经提交过了
            sky.pointOut('', 99, title);
          } else {
            let bool = true;
            let type = 1;
            // 所有
            let str = '';
            for(let item of arr) {
              if (bool === true) {
                for (let ref of refs) {
                  if (item.name === ref.name) {
                    if (item.value === '') {
                      if (ref.must === true) {
                        bool = false;
                        type = 3;
                        // 类型判断
                        str = item.name;
                        break;
                      }
                    } else {
                      if (unit.IsEmpty(ref.proof)) {
                        // 进行正则校验
                        switch (ref.proof) {
                          case 'name':
                            bool = unit.IsName(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'phone':
                            bool = unit.IsPhone(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'email':
                            bool = unit.IsEmpty(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'card':
                            bool = unit.IsCard(item.value);
                            str = item.name;
                            type = 2;
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
                    } else {
                      if (unit.IsEmpty(ref.proof)) {
                        // 进行正则校验
                        switch (ref.proof) {
                          case 'name':
                            bool = unit.IsName(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'phone':
                            bool = unit.IsPhone(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'email':
                            bool = unit.IsEmpty(item.value);
                            str = item.name;
                            type = 2;
                            break;
                          case 'card':
                            bool = unit.IsCard(item.value);
                            str = item.name;
                            type = 2;
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
                  break
                }
              }
            }

            // 进行提醒
            if (bool === false) {
              sky.pointOut(str, type, title);
            } else {
              // 这里进行表单数据的ajax请求
              let $node = $('#none');
              let viewId = $node.attr('data-view-id');

              let url = '/DiyWebsite/SubmitForm';
              let params = {
                guid: viewId,
                formId: formId,
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
                    sessionStorage.setItem(formId, 'yes');
                    sky.pointOut(str, 1, title);
                  } else {
                    sky.pointOut(str, 0, title);
                  }
                },
                error: function (err) {
                  console.log(err);
                  sky.pointOut(str, 0, title);
                }
              })
            }
          }
        } else {
          console.log('不可连点');
        }
      }
      else if (className.indexOf(minus) !== -1)
      {
        // 计数减少的
        let $numInput = $(target).siblings('.tally-item');
        let num = parseInt($numInput.val());
        let min = parseInt($numInput.attr('data-minNumber'));

        if (num > min) {
          num --;
          $numInput.val(num);
        } else {
          let str = '该选项最小值为' + min;
          sky.pointOut(str, 4, '');
        }
      }
      else if (className.indexOf(add) !== -1)
      {
        // 计数减少的
        let $numInput = $(target).siblings('.tally-item');
        let num = $numInput.val();
        let max = parseInt($numInput.attr('data-maxNumber'));
        if (num < max) {
          num ++;
          $numInput.val(num);
        }
        else {
          let str = '该选项最大值为' + max;
          sky.pointOut(str, 4, '');
        }
      }
    })

    // 绑定input事件
    $('.tally-item').change(function (ev) {
      let event = ev || window.event;
      let target = event.target || event.srcElement;
      let className = target.className;
      console.log(className);
      if (className.indexOf('tally-item') !== 1) {
        let num = $(target).val();
        let min = parseInt($(target).attr('data-minNumber'));
        let max = parseInt($(target).attr('data-maxNumber'));

        if (num < min) {
          let str = '该选项最小值为' + min;
          sky.pointOut(str, 4, '');
          $(target).val(min);
        }
        else if (num > max) {
          let str = '该选项最大值为' + max;
          sky.pointOut(str, 4, '');
          $(target).val(max);
        }
      }
    })

  },

  // 返回不能为空的label
  ref: (form) => {
    let $refs = $(form).find('.ref');
    let a = [];
    $refs.each(function (index, item) {
      let temp = {};
      let name = $(item).find('input').attr("name");
      let proof = $(item).find('input').attr("data-proof");

      if ($(item).hasClass('xinghao')) {
        temp = {name: name, proof: proof, must: true}
      } else {
        temp = {name: name, proof: proof, must: false}
      }
      a.push(temp);
    });
    return a;
  },

  // 提示函数，弹出模态框提示输入问题
  pointOut: (str: string ,type?: number, title?: string, ) => {
    // 1成功，2警告，3错误，默认警告

    let icon = `icon-jinggao`;
    let tip = `请输入正确的${str}`;

    switch (type) {
      case 0:
        icon = `icon-jinggao`;
        tip = `提交失败`;
        break;
      case 1:
        icon = `icon-wancheng-copy`;
        tip = `提交成功`;
        break;
      case 2:
        icon = `icon-jinggao`;
        tip = `请输入正确的${str}`;
        break;
      case 3:
        icon = `icon-cuowu`;
        tip = `${str}为必填项`;
        break;
      case 4:
        icon = `icon-jinggao`;
        tip = str;
        break;
      case 99:
        icon = `icon-wancheng-copy`;
        tip = `你已经提交过表单了！`;
        break;
      default:
        icon = `icon-jinggao`;
        tip = `请输入正确的${str}`
    }

    // html片段
    let html = `<div class="warn">
        <div class="warn-header">
            <div class="warn-title">${title}</div>
            <div class="warn-close">
                <i class="iconfont icon-guanbi"></i>
            </div>
        </div>
        <div class="warn-body">
            <div class="icon iconfont ${icon}"></div>
        </div>
        <div class="warn-footer">${tip}</div>
    </div>`;

    let $point = $('#point');

    $point.html(html);
    $point.fadeIn();

    let timer = setTimeout(function () {
      $point.fadeOut();
      clearTimeout(timer);
    }, DELAY)
  },

  // 关闭函数
  pointClose() {
    let $point = $('#point');
    $point.click(function (ev) {
      let event = ev || window.event;
      let target = event.target || event.srcElement;
      if (target.className.indexOf('icon-guanbi') !== -1) {
        $point.fadeOut();
      }
    })
  }
}

window.onload = function () {
  /*
*  在此调用自己的方法
* */
//目前设计稿750， 根 font-size 100px  尺寸 除以100  单位：rem
  unit.ResizeRemToPxBase(750, 100);
}

// 自定义dom方法
sky.refer();

// 弹窗方法
sky.pointClose();

window.onresize = function() {
  unit.ResizeRemToPxBase(750, 100);
}


// jquery方法的扩展

$.fn.sky_serializeArray = function () {
  let a = this.serializeArray();
  let $radio = $('input[type=radio],input[type=checkbox]', this);
  let temp = {};
  $.each($radio, function () {
    if (!temp.hasOwnProperty(this.name)) {
      if ($("input[name='" + this.name + "']:checked").length == 0) {
        temp[this.name] = "";
        a.push({name: this.name, value: ""});
      }
    }
  });
  return a;
  
};
