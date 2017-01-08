/**
 * Created by hakuh on 2016/7/9.
 */
var w = window.innerWidth,
    h = window.innerHeight;

var circleWidth = 5;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';


var five_palette = {
    "lightgray": "#2a2a2a",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",

    "darkblue": "#0027bb",
    "darkerblue": "#042029",

    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "#2176C7",
    "green": "#259286",
    "yellowgreen": "#738A05"
}

var five_nodes = [
    {"name": "Five elephant",value:35 ,
     'image':'image/little_star1.gif'},
    {"name": "来自柏林",value:30,
     'image':'image/little_star1.png'},
    {"name": "精测咖啡参数",value:30,
     'image':'image/little_star2.png'},
    {"name": "北欧浅洪",value:30,
     'image':'image/little_star3.png'},
    {"name": "极简空间设计",value:30,
     'image':'image/little_star4.png'},
    {"name": "线上售卖",value:14,
     'image':'image/little_star5.png'}
]

var five_links = [
    {source: five_nodes[1], target: five_nodes[0]},
    {source: five_nodes[2], target: five_nodes[0]},
    {source: five_nodes[3], target: five_nodes[0]},
    {source: five_nodes[4], target: five_nodes[0]},
    {source: five_nodes[5], target: five_nodes[0]}
]


var five_vis = d3.select('body')
    .append("svg")
    .attr("class", "stage")
    .attr("width", w)
    .attr("height", h);


var five_force = d3.layout.force()
    .nodes(five_nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);

var five_link = five_vis.selectAll(".link")
    .data(five_links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", five_palette.lightgray)
    .attr("fill", "none");

var five_node = five_vis.selectAll(".node")
    .data(five_nodes)
    .enter().append("g")
    .attr("class", "node")
    .on("click",function(d,i){
        if(i==5){
            window.location.href='https://fiveelephant.taobao.com/?spm=2013.1.1000126.2.dR8V4R';
        }
    })


    .call(five_force.drag);

five_node.append("svg:image")
    .attr("xlink:href", function (d,i) {
        return five_nodes[i].image;
    })
    .attr("x", function (d,i) {
        return -five_nodes[i].value/2;
    })
    .attr("y", function (d,i) {

            return -five_nodes[i].value/2;

    })
    .attr("width", function(d,i){
        return five_nodes[i].value;
    })
    .attr("height", function(d,i){
        return five_nodes[i].value;})
    .on("click",function (d,i) {
        window.location.href="http://www.dianping.com/shop/66671047";
    });

//TEXT
five_node.append("text")
    .text(function(d, i) { return d.name; })
    .attr("x",            function(d, i) { if (i>0) { return circleWidth + 5; }   else { return -10 } })
    .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
    .attr("font-family",  "Bree Serif")
    .attr("fill",         function(d, i) { if (i>0) { return  five_palette.paleryellow; }        else { return five_palette.darkblue } })
    .attr("font-size",    function(d, i) { if (i>0) { return  "1em"; }            else { return "1.8em" } })
    .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })



five_force.on("tick", function(e) {
    five_node.attr("transform", function(d, i) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    five_link.attr("x1", function(d)   { return d.source.x; })
        .attr("y1", function(d)   { return d.source.y; })
        .attr("x2", function(d)   { return d.target.x; })
        .attr("y2", function(d)   { return d.target.y; })
});

five_force.start();