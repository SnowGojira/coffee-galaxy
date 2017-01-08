/**
 * Created by hakuh on 2016/7/9.
 */
var w = window.innerWidth,
    h = window.innerHeight;

var circleWidth = 5;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
    "lightgray": "#819090",
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

var nodes = [
    {"name": "Mondoli",value:35,
        'image':'image/little_star1.gif'},
    {"name": "博物馆",value:20,
        'image':'image/little_star1.png'},
    {"name": "动物标本",value:30,
        'image':'image/little_star2.png'},
    {"name": "古物",value:30,
        'image':'image/little_star3.png'},
    {"name": "咖啡教学",value:30,
        'image':'image/little_star4.png'},
{"name": "独立工作室",value:14,
    'image':'image/little_star5.png'}
]

var links = [
    {source: nodes[1], target: nodes[0]},
    {source: nodes[2], target: nodes[0]},
    {source: nodes[3], target: nodes[0]},
    {source: nodes[4], target: nodes[0]},
    {source: nodes[5], target: nodes[0]}
]


var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "stage")
    .attr("width", w)
    .attr("height", h);


var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);

var link = vis.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", "#2a2a2a")
    .attr("fill", "none");

var node = vis.selectAll("circle.node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")

/*    //MOUSEOVER
    .on("mouseover", function(d,i) {
        if (i>0) {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .transition()
                .duration(250)
                .style("cursor", "none")
                .attr("r", circleWidth+3)
                .attr("fill",palette.orange);

            //TEXT
            d3.select(this).select("text")
                .transition()
                .style("cursor", "none")
                .duration(250)
                .style("cursor", "none")
                .attr("font-size","1.5em")
                .attr("x", 15 )
                .attr("y", 5 )
        } else {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .style("cursor", "none")

            //TEXT
            d3.select(this).select("text")
                .style("cursor", "none")
        }
    })

    //MOUSEOUT
    .on("mouseout", function(d,i) {
        if (i>0) {
            //CIRCLE
            d3.select(this).selectAll("circle")
                .transition()
                .duration(250)
                .attr("r", circleWidth)
                .attr("fill",palette.pink);

            //TEXT
            d3.select(this).select("text")
                .transition()
                .duration(250)
                .attr("font-size","1em")
                .attr("x", 8 )
                .attr("y", 4 )
        }
    })*/

    .call(force.drag);


/*
//CIRCLE
node.append("svg:circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", circleWidth)
    .attr("fill", function(d, i) { if (i>0) { return  palette.pink; } else { return palette.paleryellow } } )
*/

node.append("svg:image")
    .attr("xlink:href", function (d,i) {
        return nodes[i].image;
    })
    .attr("x", function (d,i) {
        return -nodes[i].value/2;
    })
    .attr("y", function (d,i) {

        return -nodes[i].value/2;

    })
    .attr("width", function(d,i){
        return nodes[i].value;
    })
    .attr("height", function(d,i){
        return nodes[i].value;})
    .on("click",function (d,i) {
        if (i==0){
            window.location.href="http://www.weibo.com/mondoli?refer_flag=1005050010_&is_hot=1";
        }
    })
//TEXT
node.append("text")
    .text(function(d, i) { return d.name; })
    .attr("x",            function(d, i) { if (i>0) { return circleWidth + 5; }   else { return -10 } })
    .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
    .attr("font-family",  "Bree Serif")
    .attr("fill",         function(d, i) { if (i>0) { return  palette.paleryellow; }        else { return palette.darkblue } })
    .attr("font-size",    function(d, i) { if (i>0) { return  "1em"; }            else { return "1.8em" } })
    .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })



force.on("tick", function(e) {
    node.attr("transform", function(d, i) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    link.attr("x1", function(d)   { return d.source.x; })
        .attr("y1", function(d)   { return d.source.y; })
        .attr("x2", function(d)   { return d.target.x; })
        .attr("y2", function(d)   { return d.target.y; })
});

force.start();