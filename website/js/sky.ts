let arr = [2, 4, 8];
let a = [
  {
    width: 0,
    widths: 0
  },
  {
    width: 0,
    widths: 0
  },
  {
    width: 0,
    widths: 0
  }
]
const seal = {
  //加载进度条
  Progress:function(i){
    let count=0;
    let counts=0;
    (function(i){
      let timer = null
      timer = setInterval(function(){
        count++;
        counts++;
        a[i].width = count;
        a[i].widths = count;
        let bool =  a[i].width === 3 &&  a[i].widths === 3;
        console.log(bool);
        if(bool) {
          clearInterval(timer);
        }
      },30)
    })(i)
  },
};

for (let i = 0; i < arr.length; i++) {
  seal.Progress(i);
}
