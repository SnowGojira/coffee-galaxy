var w=window.innerWidth,h=window.innerHeight,circleWidth=5,fontFamily="Bree Serif",fontSizeHighlight="1.5em",fontSizeNormal="1em",palette={lightgray:"#819090",gray:"#708284",mediumgray:"#536870",darkgray:"#475B62",darkblue:"#0027bb",darkerblue:"#042029",paleryellow:"#FCF4DC",paleyellow:"#EAE3CB",yellow:"#A57706",orange:"#BD3613",red:"#D11C24",pink:"#C61C6F",purple:"#595AB7",blue:"#2176C7",green:"#259286",yellowgreen:"#738A05"},nodes=[{name:"Aftaste Kaffe",value:35,image:"image/little_star1.gif"},
{name:"\u84b8\u6c7d\u670b\u514b",value:30,image:"image/little_star1.png"},{name:"\u5546\u52a1\u793e\u4ea4\u4f73\u6240",value:30,image:"image/little_star2.png"},{name:"\u5496\u5561\u9999\u6c1b",value:30,image:"image/little_star3.png"},{name:"\u80af\u5c3c\u4e9aAA",value:30,image:"image/little_star4.png"},{name:"\u5355\u54c1\u51b7\u8403",value:14,image:"image/little_star5.png"}],links=[{source:nodes[1],target:nodes[0]},{source:nodes[2],target:nodes[0]},{source:nodes[3],target:nodes[0]},{source:nodes[4],
target:nodes[0]},{source:nodes[5],target:nodes[0]}],vis=d3.select("body").append("svg:svg").attr("class","stage").attr("width",w).attr("height",h),force=d3.layout.force().nodes(nodes).links([]).gravity(.1).charge(-1E3).size([w,h]),link=vis.selectAll(".link").data(links).enter().append("line").attr("class","link").attr("stroke","#2a2a2a").attr("fill","none"),node=vis.selectAll("circle.node").data(nodes).enter().append("g").attr("class","node").call(force.drag);
node.append("svg:image").attr("xlink:href",function(b,a){return nodes[a].image}).attr("x",function(b,a){return-nodes[a].value/2}).attr("y",function(b,a){return-nodes[a].value/2}).attr("width",function(b,a){return nodes[a].value}).attr("height",function(b,a){return nodes[a].value}).on("click",function(b,a){0==a&&(window.location.href="http://www.dianping.com/shop/65671380")});
node.append("text").text(function(b,a){return b.name}).attr("x",function(b,a){return 0<a?circleWidth+5:-10}).attr("y",function(b,a){return 0<a?circleWidth+0:8}).attr("font-family","Bree Serif").attr("fill",function(b,a){return 0<a?palette.paleryellow:palette.darkblue}).attr("font-size",function(b,a){return 0<a?"1em":"1.8em"}).attr("text-anchor",function(b,a){return 0<a?"beginning":"end"});
force.on("tick",function(b){node.attr("transform",function(a,b){return"translate("+a.x+","+a.y+")"});link.attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y})});force.start();
