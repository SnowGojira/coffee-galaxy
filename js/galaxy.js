
/**
 * Created by hakuh on 2016/7/9.
 */

/**
 * preload 预加载
 * @type {Number}
 */
window.onload=function () {
    manifest = [
        {src: 'image/aftaste.png', id: 'img1'},
        {src: 'image/five.png', id: 'img2'},
        {src: 'image/let.gif', id: 'img3'},
        {src: 'image/little_star1.gif', id: 'img4'},
        {src: 'image/little_star1.png', id: 'img5'},
        {src: 'image/little_star2.png', id: 'img6'},
        {src: 'image/little_star3.png', id: 'img7'},
        {src: 'image/little_star4.png', id: 'img8'},
        {src: 'image/little_star5.png', id: 'img9'},
        {src: 'image/mondoli.png', id: 'img10'},
        {src: 'image/new.png', id: 'img11'},
        {src: 'image/sense.png', id: 'img12'},
        {src: 'image/uid.gif', id: 'img13'},
        {src: 'image/um.png', id: 'img14'}
    ];

    loader = new createjs.LoadQueue(false);
    // 关键！----设置并发数
    loader.setMaxConnections(100);
    // 关键！---一定要将其设置为 true, 否则不起作用。
    loader.maintainScriptOrder=true;
    loader.addEventListener('complete', handleComplete);//加载完成 调用handleComplete函数
    loader.addEventListener('progress', handleFileProgress);//加载完成 调用handleFileProgress函数
    loader.loadManifest(manifest);
};

function handleFileProgress() {
    var percent=loader.progress*100|0+'%';
    document.getElementById('percent').innerHTML=percent+"%";
};

var loadscene=document.getElementById("preload");
var galaxyscene=document.getElementById("galaxy");
var fivescene=document.getElementById("five");

function handleComplete() {
    console.log("complete!");
    loadscene.style.display="none";
    galaxyscene.style.display="block";
};

/*******************************************d3-galaxy 首页*************************************/
var   w =window.innerWidth,
    h =  window.innerHeight,
    circleWidth = 5;

/**
 * This is color palette
 */
var galaxy_palette = {
    "lightgray": "#E5E8E8",
    "gray": "#708284",
    "mediumgray":"#303030",
    "black":"#000",
    "orange": "#a12c34",
    "yellow": "#d78f3a"
}


var galaxy_nodes = [
    { name: "Aftaste Kaffe",value:90,
      'image':'image/aftaste.png'},
    { name: "New School", target: [0], value: 80,
        'image':'image/new.png'},
    { name: "Five elephant", target: [0, 1], value: 100 ,
        'image':'image/five.png'},
    { name: "Let's grind", target: [0, 1, 2], value: 70,
        'image':'image/let.gif'},
    { name: "Mondoli", target: [0, 3], value: 100,
        'image':'image/mondoli.png'},
    { name: "The sense", target: [0,3,4], value: 90,
        'image':'image/sense.png'},
    { name: "Jason's coffee", target: [0,3,4,5], value: 110,
        'image':'image/jason.png'},
    { name: "UM!", target: [0, 1, 2], value: 70,
        'image':'image/um.png'},
    { name: "UID", target: [0, 1, 2, 8], value: 100,
        'image':'image/uid.gif'}

];



var galaxy_links = [
];

for (var i = 0; i < galaxy_nodes.length; i++){
    if (galaxy_nodes[i].target !== undefined) {
        for ( var x = 0; x < galaxy_nodes[i].target.length; x++ )
            galaxy_links.push({
                source: galaxy_nodes[i],
                target: galaxy_nodes[galaxy_nodes[i].target[x]]
            });
    };
};


var galaxyChart = d3.select('#galaxy')
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 410 730")


var galaxy_force = d3.layout.force()
    .nodes(galaxy_nodes)
    .links([])
    .gravity(0.1)
    .charge(-550)
    .size([w,h]);

var galaxy_link = galaxyChart.selectAll('line')
    .data(galaxy_links).enter().append('line')
    .attr('stroke', galaxy_palette.mediumgray)
    .attr('strokewidth', '0.3');

var galaxy_node = galaxyChart.selectAll(".node")
    .data(galaxy_force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(galaxy_force.drag)




galaxy_node.append("image")
    .attr("xlink:href", function (d,i) {
        return galaxy_nodes[i].image;
    })
    .attr("x", function (d,i) {
        return -galaxy_nodes[i].value/2;
    })
    .attr("y", function (d,i) {
        if(i==5){
            return -20-galaxy_nodes[i].value/2;
        }else if(i==8){
            return -18-galaxy_nodes[i].value/2;
        }
        else{
            return -galaxy_nodes[i].value/2;
        }

    })
    /*onclick event*/
    .on("click",function(d,i){
        switch(i){
            case 0:
                window.location.href='aftaste.html';
                break;
            case 1:
                window.location.href='new.html';
                break;
            case 2:
                window.location.href='five.html';
                break;
            case 3:
                window.location.href='Let.html';
                break;
            case 4:
                window.location.href='Mondoli.html';
                break;
            case 5:
                window.location.href='sense.html';
                break;
            case 6:
                window.location.href='jason.html';
                break;
            case 7:
                window.location.href='UM.html';
                break;
            case 8:
                window.location.href='UID.html';
                break;
            default:
                window.location.href='UID.html';
                break;
        }

    })
    .attr("width", function(d,i){
        return galaxy_nodes[i].value;
    })
    .attr("height", function(d,i){
        return galaxy_nodes[i].value;});


galaxy_force.on('tick', function(e){
    galaxy_node.attr('transform', function(d, i){
        return 'translate(' + d.x + ','+ d.y + ')'
    })

    galaxy_link
        .attr('x1', function(d){ return d.source.x; })
        .attr('y1', function(d){ return d.source.y; })
        .attr('x2', function(d){ return d.target.x; })
        .attr('y2', function(d){ return d.target.y; })
});


galaxy_node.append('text')
    .text(function(d){ return d.name; })
    .attr('font-family', 'Arial','微软雅黑')
    .attr('fill', function(d, i){
        //console.log(d.value);
        if ( i ===5) {
            return galaxy_palette.orange;
        }else if(i===7){
            return galaxy_palette.black;
        }else if(i==8){
            return galaxy_palette.black;
        }
        else {
            return galaxy_palette.lightgray;
        }
    })
    .attr('text-align',function (d,i) {
        return 'bottom';
    })
    .attr('text-anchor', function(d, i) {
        return 'middle';
    })

    .attr('font-size', function(d, i){
        if (i > 0) {
            return '.8em';
        } else {
            return '.9em';
        }
    })


galaxy_force.start()

/***********************************************d3-five-page****************************/



