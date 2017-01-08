
/**
 * Created by hakuh on 2016/7/9.
 */
var   w =window.innerWidth,
    h =  window.innerHeight,
    circleWidth = 5;

/**
 * This is color palette
 */
var palette = {
    "lightgray": "#E5E8E8",
    "gray": "#708284",
    "mediumgray":"#303030",
    "black":"#000",
    "orange": "#a12c34",
    "yellow": "#d78f3a"
}

var colors = ['#EDB296',
    '#E1611D',
    '#95AF8D',
    '#4F2514',
    '#939A73',
    '#A05432',
    '#C6BE8E',
    '#FDD702',
    '#BBAAA3'
];



var nodes = [
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



var links = [
];

for (var i = 0; i < nodes.length; i++){
    if (nodes[i].target !== undefined) {
        for ( var x = 0; x < nodes[i].target.length; x++ )
            links.push({
                source: nodes[i],
                target: nodes[nodes[i].target[x]]
            });
    };
};


var myChart = d3.select('#galaxy')
    //.append("div")
    //.classed("svg-container", true)
    .append('svg')
    //.append('width',w)
    //.append('height',h)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 410 730")
    //.classed("svg-content-responsive", true)


var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-550)
    .size([w,h]);

var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', palette.mediumgray)
    .attr('strokewidth', '0.3');

var node = myChart.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)




node.append("image")
    .attr("xlink:href", function (d,i) {
        return nodes[i].image;
    })
    .attr("x", function (d,i) {
        return -nodes[i].value/2;
    })
    .attr("y", function (d,i) {
        if(i==5){
            return -20-nodes[i].value/2;
        }else if(i==8){
            return -18-nodes[i].value/2;
        }
        else{
            return -nodes[i].value/2;
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

                /*galaxyScene.style.display='none';
                fiveScene.style.display='block';*/
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
        return nodes[i].value;
    })
    .attr("height", function(d,i){
        return nodes[i].value;});

/*
var node =  myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag);
*/



/*
node.append('circle')
    .attr('cx', function(d){return d.x; })
    .attr('cy', function(d){return d.y; })
    .attr('r', function(d,i){
        console.log(d.value);
        if ( i > 0 ) {
            return circleWidth + d.value;
        } else {
            return circleWidth + 35;
        }
    })
    .append("image")
    .attr("xlink:href", function(d, i){
        return nodes[i].image;
    })
    .attr('fill', function(d,i){
        switch (i){
            case 0:
                return '#fe506c';
                break;
            case 1:
                return '#f8a41a';
                break;
            case 2:
                return    '#b8c247';
                break;
            case 3:
                return    '#e2d1e9';
                break;
            case 4:
                return    '#f59162';
                break;
            case 5:
                return    '#b8b1f3';
                break;
            case 6:
                return    '#52366a';
                break;
            case 7:
                return    '#FDD702';
                break;
            case 8:
                return    '#71c3f8';
                break;
            default:
                return '#fff'
                break;
        }

    })
    .attr('strokewidth', function(d,i){
        if ( i > 0 ) {
            return '0';
        } else {
            return '2.5';
        }
    })
    .attr('stroke', function(d,i){
        if ( i > 0 ) {
            return '';
        } else {
            return 'black';
        }
    });
*/

force.on('tick', function(e){
    node.attr('transform', function(d, i){
        return 'translate(' + d.x + ','+ d.y + ')'
    })

    link
        .attr('x1', function(d){ return d.source.x; })
        .attr('y1', function(d){ return d.source.y; })
        .attr('x2', function(d){ return d.target.x; })
        .attr('y2', function(d){ return d.target.y; })
});


node.append('text')
    .text(function(d){ return d.name; })
    .attr('font-family', 'Raleway','Times New Roman','微软雅黑')
    .attr('fill', function(d, i){
        //console.log(d.value);

        if ( i ===5) {
            return palette.orange;
        }else if(i===7){
            return palette.black;
        }else if(i==8){
            return palette.black;
        }
        else {
            return palette.lightgray;
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

/*node.append('onClick')
    .onclick(function(d,i){
        switch(i){
            case 0:
                break;
            case 1:
                break;
            default:
                break;
        }
    })*/

force.start();




