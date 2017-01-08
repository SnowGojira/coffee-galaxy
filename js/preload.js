/**
 * Created by hakuh on 2016/7/25.
 */
var imgs=[
    "image/aftaste.png",
    'image/five.png',
    'image/jason.png',
    'image/let.gif',
    'image/little_star1.gif',
    'image/little_star1.png',
    'image/little_star2.png',
    'image/little_star3.png',
    'image/little_star4.png',
    'image/little_star5.png',
    'image/mondoli.png',
    'image/new.png',
    'image/sense.png',
    'image/uid.gif',
    'image/um.png'
];
var loadscene=document.getElementById("preload");
var galaxyscene=document.getElementById("galaxy");

function preload(arr) {
    var newimages = [];
    var loadedimages = 0;

    var postaction=function(){};
    var arr = (typeof arr != "object") ? [arr] : arr;

    function imageloadpost() {
        loadedimages++;
        document.getElementById("percentage").innerHTML = loadedimages*6+'%';
        console.log(document.getElementById("percentage").innerHTML);

        if (loadedimages == arr.length) {
            
            postaction(newimages);
            document.getElementById("percentage").innerHTML = 100+'%';

            
        }
    }


    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image();
        newimages[i].src = arr[i];

        newimages[i].onload = function() {
            //timer();
            imageloadpost();
        }
        newimages[i].onerror = function() {
            //timer();
            imageloadpost();
        }
    }

    return {
        done: function(f) {
            postaction = f || postaction;
        }
    }
}

/*console.log("图片已经加载完成");
setInterval(function(){
    percentage.innerHTML = i*6+'%';
},1000);
console.log(percentage);*/





preload(imgs).done(function(images) {
    console.log(images.length);
    loadscene.style.display="none";
    galaxyscene.style.display="block";

});
