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
    // if (defaultFontSize > 640) {
    //   defaultFontSize = 640
    // }
    head.removeChild(d);
    //（当前设备屏幕宽度/设计稿宽度）*（当前1rem的取值/当前默认字体大小）*100+"%"
    html.style.fontSize = window.innerWidth / designWidth * remToPx * (defaultFontSize / 50) + "px";
    head = null;
    html = null;
  },
};



window.onload = function () {
  /*
*  在此调用自己的方法
* */
// debugger
//目前设计稿750， 根 font-size 100px  尺寸 除以100  单位：rem
  unit.ResizeRemToPxBase(750, 100);
}