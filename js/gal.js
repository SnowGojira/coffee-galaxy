var imgs="image/aftaste.png image/five.png image/jason.png image/let.gif image/little_star1.gif image/little_star1.png image/little_star2.png image/little_star3.png image/little_star4.png image/little_star5.png image/mondoli.png image/new.png image/sense.png image/uid.gif image/um.png".split(" "),loadscene=document.getElementById("preload"),galaxyscene=document.getElementById("galaxy");
function preload(b){function a(){e++;document.getElementById("percentage").innerHTML=6*e+"%";console.log(document.getElementById("percentage").innerHTML);e==b.length&&(f(d),document.getElementById("percentage").innerHTML="100%")}var d=[],e=0,f=function(){};b="object"!=typeof b?[b]:b;for(var c=0;c<b.length;c++)d[c]=new Image,d[c].src=b[c],d[c].onload=function(){a()},d[c].onerror=function(){a()};return{done:function(a){f=a||f}}}
preload(imgs).done(function(b){console.log(b.length);loadscene.style.display="none";galaxyscene.style.display="block"});for(var w=window.innerWidth,h=window.innerHeight,circleWidth=5,palette={lightgray:"#E5E8E8",gray:"#708284",mediumgray:"#303030",black:"#000",orange:"#a12c34",yellow:"#d78f3a"},colors="#EDB296 #E1611D #95AF8D #4F2514 #939A73 #A05432 #C6BE8E #FDD702 #BBAAA3".split(" "),nodes=[{name:"Aftaste Kaffe",value:90,image:"image/aftaste.png"},{name:"New School",target:[0],value:80,image:"image/new.png"},{name:"Five elephant",target:[0,1],value:100,image:"image/five.png"},{name:"Let's grind",target:[0,1,2],value:70,
image:"image/let.gif"},{name:"Mondoli",target:[0,3],value:100,image:"image/mondoli.png"},{name:"The sense",target:[0,3,4],value:90,image:"image/sense.png"},{name:"Jason's coffee",target:[0,3,4,5],value:110,image:"image/jason.png"},{name:"UM!",target:[0,1,2],value:70,image:"image/um.png"},{name:"UID",target:[0,1,2,8],value:100,image:"image/uid.gif"}],links=[],i=0;i<nodes.length;i++)if(void 0!==nodes[i].target)for(var x=0;x<nodes[i].target.length;x++)links.push({source:nodes[i],target:nodes[nodes[i].target[x]]});
var myChart=d3.select("#galaxy").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 410 730"),force=d3.layout.force().nodes(nodes).links([]).gravity(.1).charge(-550).size([w,h]),link=myChart.selectAll("line").data(links).enter().append("line").attr("stroke",palette.mediumgray).attr("strokewidth","0.3"),node=myChart.selectAll(".node").data(force.nodes()).enter().append("g").attr("class","node").call(force.drag);
node.append("image").attr("xlink:href",function(b,a){return nodes[a].image}).attr("x",function(b,a){return-nodes[a].value/2}).attr("y",function(b,a){return 5==a?-20-nodes[a].value/2:8==a?-18-nodes[a].value/2:-nodes[a].value/2}).on("click",function(b,a){switch(a){case 0:window.location.href="aftaste.html";break;case 1:window.location.href="new.html";break;case 2:window.location.href="five.html";break;case 3:window.location.href="Let.html";break;case 4:window.location.href="Mondoli.html";break;case 5:window.location.href=
"sense.html";break;case 6:window.location.href="jason.html";break;case 7:window.location.href="UM.html";break;case 8:window.location.href="UID.html";break;default:window.location.href="UID.html"}}).attr("width",function(b,a){return nodes[a].value}).attr("height",function(b,a){return nodes[a].value});
force.on("tick",function(b){node.attr("transform",function(a,b){return"translate("+a.x+","+a.y+")"});link.attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y})});
node.append("text").text(function(b){return b.name}).attr("font-family","Raleway","Times New Roman","\u5fae\u8f6f\u96c5\u9ed1").attr("fill",function(b,a){return 5===a?palette.orange:7===a?palette.black:8==a?palette.black:palette.lightgray}).attr("text-align",function(b,a){return"bottom"}).attr("text-anchor",function(b,a){return"middle"}).attr("font-size",function(b,a){return 0<a?".8em":".9em"});force.start();
