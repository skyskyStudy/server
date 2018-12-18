var arr = [2, 4, 8];
var a = [
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
];
var seal = {
    //加载进度条
    Progress: function (i) {
        var count = 0;
        var counts = 0;
        (function (i) {
            var timer = null;
            timer = setInterval(function () {
                count++;
                counts++;
                a[i].width = count;
                a[i].widths = count;
                var bool = a[i].width === 3 && a[i].widths === 3;
                console.log(bool);
                if (bool) {
                    clearInterval(timer);
                }
            }, 30);
        })(i);
    },
};
for (var i = 0; i < arr.length; i++) {
    seal.Progress(i);
}
