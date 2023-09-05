const canvas=document.getElementById("gameCanvas"),ctx=canvas.getContext("2d"),numRows=16,numCols=32,tileWidth=16,tileHeight=16;let loadone=!1,selectedBuildingIndex=-1;const alerts=document.getElementById("altmsg");let stuse=0,unlck=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];const itemsCosts=[15,20,25,30,40,60,10,20,30,40,60,25,100,100];let Op=[0,0],Op2=[0,0,0,0,0,0,0,0,0,0,0],CoinsCurrency=10;const yr=document.getElementById("yr"),mnth=document.getElementById("mnth");let tsell=0;const sellAllButton=document.getElementById("sellall"),tsellbtn=document.getElementById("tsell"),cityData=Array.from({length:16},()=>Array.from({length:32},()=>0)),water=new Image;water.src="assets/water.jpg";const grass=new Image;grass.src="assets/grass.jpg";const grass2=new Image;grass2.src="assets/grass2.png";const house=new Image;house.src="assets/house.png";const road=new Image;road.src="assets/road.png";const factory=new Image;factory.src="assets/factory.png";const farm=new Image;farm.src="assets/farm.jpg";const wind1=new Image;wind1.src="assets/wind1.png";const wind2=new Image;wind2.src="assets/wind2.png";const TownHall=new Image;TownHall.src="assets/TownHall.png";const Mine=new Image;Mine.src="assets/mine.png";const ware=new Image;ware.src="assets/warehouse.png";const Fisry=new Image;Fisry.src="assets/fishery.png";const park=new Image;park.src="assets/park.png";const baseT=new Image;baseT.src="assets/wdc1.png";const UpperT=new Image;UpperT.src="assets/wdc2.png";const swrdd=new Image;swrdd.src="assets/swrdd.png";const swrdu=new Image;swrdu.src="assets/swrdu.png";const left=new Image;left.src="assets/left.png";const right=new Image;right.src="assets/right.png";const buildingImages={0:grass,.5:grass2,1:water,"-1":house,"-2":road,2:factory,3:farm,6:TownHall,7:Mine,4:ware,5:wind1,5.1:wind2,8:Fisry,9:park,10:baseT,10.1:UpperT,11:swrdd,11.1:swrdu,12:left,12.1:right};function drawGrid(){for(let t=0;t<16;t++)for(let n=0;n<32;n++){let e=16*n,o=16*t,s=cityData[t][n];if(buildingImages.hasOwnProperty(s)){let a=buildingImages[s];ctx.drawImage(a,e,o,16,16)}}}function gameLoop(){drawGrid(),setTimeout(requestAnimationFrame(gameLoop),3e4)}function loadOnce(){if(!1===loadone)for(let t=0;t<16;t++)for(let n=0;n<32;n++)if(0===t||15===t||0===n||31===n).3>Math.random()&&(cityData[t][n]=1,t>0&&(cityData[t-1][n]=1),t<15&&(cityData[t+1][n]=1),n>0&&(cityData[t][n-1]=1),n<31&&(cityData[t][n+1]=1));else{let e=.5>Math.random()?grass2:grass;e===grass2?cityData[t][n]=.5:cityData[t][n]=0}cityData[8][0]=cityData[8][1]=-2,loadone=!0}loadOnce(),gameLoop();let list=["Destroy"," ","Factory","Farm","Warehouse","Windmill","Townhall","Mine","Fishery","Park","Wood Cutter"];const selectedbuid=document.getElementById("selectedbuild"),sidebarButtons=document.querySelectorAll(".sidebar-button");sidebarButtons.forEach(t=>{t.addEventListener("click",()=>{if(-1===(selectedBuildingIndex=parseInt(t.getAttribute("data-building-index"))))selectedbuid.innerHTML="House";else if(-2===selectedBuildingIndex)selectedbuid.innerHTML="Road";else try{selectedbuid.innerText=list[selectedBuildingIndex]}catch(n){}})}),canvas.addEventListener("click",t=>{let n=canvas.getBoundingClientRect(),e=t.clientX-n.left-16,o=t.clientY-n.top-16,s={"-1":BuildHouse,"-2":BuildRoad,2:BuildFactory,3:BuildFarm,5:BuildWindmill,6:BuildTownHall,7:BuildMine,4:BuildWare,8:BuildFishery,9:BuildPark,10:BuildWDC,11:BSword},a=Math.floor(e/16),r=Math.floor(o/16);if(a>=0&&a<31&&r>=0&&r<15&&s.hasOwnProperty(selectedBuildingIndex)){let i=s[selectedBuildingIndex];i(r,a),coincount.innerHTML=CoinsCurrency}CheckTiles()});let msgs=["Requires road nearby or farm and place on grass","Requires road nearby and place on grass","Can be placed only over grass","Can build only one townhall","Can only destroy roads","OR Not enough Coins "];const Bcost=[1,2,0,1,5,2,10,25,50,75,100,150,200];function BuildFarm(t,n){(-2===cityData[t][n+1]||-2===cityData[t][n-1]||-2===cityData[t+1][n]||-2===cityData[t-1][n]||3===cityData[t][n+1]||3===cityData[t][n-1]||3===cityData[t+1][n]||3===cityData[t-1][n])&&(.5===cityData[t][n]||0===cityData[t][n])&&CoinsCurrency>Bcost[3]-1?(cityData[t][n]=3,CoinsCurrency-=Bcost[3]):alerts.innerText=msgs[0]+" "+msgs[5]}function BuildHouse(t,n){ISconnected(t,n)&&CoinsCurrency>=Bcost[1]?(cityData[t][n]=-1,CoinsCurrency-=Bcost[1],-1===cityData[t][n+1]?(cityData[t][n]=12,cityData[t][n+1]=12.1):-1===cityData[t][n-1]&&(cityData[t][n-1]=12,cityData[t][n]=12.1)):alerts.innerText=msgs[1]+" "+msgs[5]}function BuildFactory(t,n){ISconnected(t,n)&&CoinsCurrency>=Bcost[5]?(cityData[t][n]=2,CoinsCurrency-=Bcost[5]):alerts.innerText=msgs[1]+" "+msgs[5]}function BuildRoad(t,n){-2===cityData[t][n]||1===cityData[t][n]?alerts.innerText=msgs[2]+" "+msgs[5]:cityData[t][n]=-2}function BuildWindmill(t,n){(ISconnected(t,n)||ISconnected(t-1,n))&&CoinsCurrency>=Bcost[7]&&0===Math.floor(cityData[t-1][n])&&0===Math.floor(cityData[t][n])?(cityData[t-1][n]=5.1,cityData[t][n]=5,CoinsCurrency-=Bcost[7]):alerts.innerText=msgs[1]+" "+msgs[5]}function BSword(t,n){(ISconnected(t,n)||ISconnected(t-1,n))&&CoinsCurrency>=Bcost[12]&&0===Math.floor(cityData[t-1][n])&&0===Math.floor(cityData[t][n])?(cityData[t-1][n]=11.1,cityData[t][n]=11,CoinsCurrency-=Bcost[12]):alerts.innerText=msgs[1]+" "+msgs[5]}function BuildTownHall(t,n){ISconnected(t,n)&&!1===ISTownhall&&CoinsCurrency>=Bcost[6]?(ISTownhall=!0,CoinsCurrency-=Bcost[6],cityData[t][n]=6):alerts.innerText=msgs[3]+" "+msgs[5]}function BuildMine(t,n){ISconnected(t,n)&&CoinsCurrency>=Bcost[8]?(cityData[t][n]=7,CoinsCurrency-=Bcost[8]):alerts.innerText=msgs[1]+" "+msgs[5]}function BuildWare(t,n){ISconnected(t,n)&&CoinsCurrency>=Bcost[4]?(cityData[t][n]=4,CoinsCurrency-=Bcost[4]):alerts.innerText=msgs[1]+" "+msgs[5]}function BuildFishery(t,n){ISconnected(t,n)&&CoinsCurrency>=Bcost[9]&&(1===cityData[t+1][n]||1===cityData[t-1][n]||1===cityData[t][n+1]||1===cityData[t][n-1])?(cityData[t][n]=8,CoinsCurrency-=Bcost[9]):alerts.innerText=msgs[1]+" Around water.  "+msgs[5]}function BuildPark(t,n){0===Math.floor(cityData[t][n])&&CoinsCurrency>=Bcost[10]?(cityData[t][n]=9,CoinsCurrency-=Bcost[10]):alerts.innerText="Only can be placed over grass "+msgs[5]}function BuildWDC(t,n){(ISconnected(t,n)||ISconnected(t-1,n))&&0===Math.floor(cityData[t-1][n])&&0===Math.floor(cityData[t][n])&&CoinsCurrency>=Bcost[11]?(cityData[t-1][n]=10.1,cityData[t][n]=10,CoinsCurrency-=Bcost[11]):alerts.innerText=msgs[1]+" "+msgs[5]}function ISconnected(t,n){return!!((-2===cityData[t][n+1]||-2===cityData[t][n-1]||-2===cityData[t+1][n]||-2===cityData[t-1][n])&&0===Math.floor(cityData[t][n])&&isConnectedToInitialRoad(t,n))}let No_of=[0,0,0,0,0,0,0,0];const coincount=document.getElementById("coins"),NoOfPeopleHTML=document.getElementById("people");let parks=0;function CheckTiles(){No_of=[0,0,0,0,0,0,0,0],parks=0;for(let t=0;t<16;t++)for(let n=0;n<32;n++)12.1===cityData[t][n]?No_of[0]+=3:-1===cityData[t][n]?No_of[0]++:2===cityData[t][n]?No_of[1]++:3===cityData[t][n]?No_of[2]++:5===cityData[t][n]?No_of[3]++:7===cityData[t][n]?No_of[4]++:4===cityData[t][n]?(No_of[5]++,console.log(No_of[5])):8===cityData[t][n]?No_of[6]++:9===cityData[t][n]?parks++:10===cityData[t][n]&&No_of[7]++;NoOfPeopleHTML.innerHTML=2*No_of[0]}let yrmnth=[1200,0];function yearupdate(){yrmnth[1]+=6,yrmnth[1]>12&&(yrmnth[0]++,yrmnth[1]=0),yr.innerText=yrmnth[0],mnth.innerText=yrmnth[1]}function giveCoinsPeriodically(){CalPRO(),UpdateTotal(),yearupdate(),coincount.innerHTML=CoinsCurrency,setTimeout(giveCoinsPeriodically,1e4)}function isConnectedToInitialRoad(t,n){let e=Array.from({length:16},()=>Array.from({length:32},()=>!1)),o=[{row:t,col:n}];for(;o.length>0;){let s=o.shift(),a=s.row,r=s.col;if(8===a&&1===r)return!0;e[a][r]=!0;let i=[{row:a-1,col:r},{row:a+1,col:r},{row:a,col:r-1},{row:a,col:r+1},];for(let c of i){let l=c.row,_=c.col;l>=0&&l<16&&_>=0&&_<32&&!e[l][_]&&-2===cityData[l][_]&&(o.push({row:l,col:_}),e[l][_]=!0)}}return!1}coincount.innerHTML=CoinsCurrency,giveCoinsPeriodically();const buttons=document.querySelectorAll(".scrbtn");function CalPRO(){let t=0;try{t=Math.floor(2*No_of[0]/(No_of[1]+No_of[2]+No_of[3]+No_of[4]+No_of[5]+No_of[6]+No_of[7]))}catch(n){}Op[1]=25+25*No_of[5];let e=[3,2,6];if(stuse<Op[1]){if(t>0&&No_of[2]>0&&(Op[0]+=Math.min(6,No_of[2]),No_of[2]-6>0&&(Op[0]+=Math.floor(No_of[2]*(1/40)))),t>0&&(unlck[6]||unlck[7]||unlck[8])){let o=Math.min(t,2);unlck[6]&&(Op2[6]+=No_of[4]*o),unlck[7]&&(Op2[7]+=No_of[4]*o),unlck[8]&&(Op2[8]+=No_of[4]/2*o)}if(t>0&&unlck[5]&&No_of[7]>0){let s=Math.min(t,2);Op2[5]+=No_of[7]*s}unlck[1]&&t>0&&Op[0]>0&&(Op[0]>No_of[3]?(Op[0]=Op[0]-Math.min(e[2],No_of[3]),Op2[1]=Op2[1]+Math.min(e[2],No_of[3])):(Op[0]=0,Op2[1]=Op2[1]+No_of[3])),unlck[0]&&t>0&&Op[0]>0&&(Op[0]>No_of[1]?(Op[0]=Op[0]-Math.min(e[2],No_of[1]),Op2[0]=Op2[0]+Math.min(e[2],No_of[1])):(Op[0]=0,Op2[0]=Op2[0]+No_of[1])),unlck[3]&&t>1&&Op[0]>0&&(Op[0]>No_of[1]?(Op[0]=Op[0]-Math.min(e[2],No_of[1]),Op2[3]=Op2[3]+Math.min(e[2],No_of[1])):(Op[0]=0,Op2[3]=Op2[3]+No_of[1])),unlck[9]&&t>1&&Op2[7]>0&&Op2[8]>0&&(Op2[7]>No_of[1]&&Op2[8]>No_of[1]?(Op2[7]=Op2[7]-Math.min(e[0],No_of[1]),Op2[8]=Op2[8]-Math.min(e[0],No_of[1]),Op2[9]=Op2[9]+Math.min(e[0],No_of[1])):alerts.innerText="Not enough manpower and production of iron and gunpowder"),unlck[10]&&t>1&&Op2[7]>0&&Op2[8]>0&&(Op2[7]>No_of[1]&&Op2[8]>No_of[1]?(Op2[7]=Op2[7]-Math.min(e[1],No_of[1]),Op2[8]=Op2[8]-Math.min(e[1],No_of[1]),Op2[10]=Op2[10]+Math.min(e[1],No_of[1])):alerts.innerText="Not enough manpower and production of iron and gunpowder"),No_of[6]>0&&t>0&&unlck[4]&&(Op2[4]+=Math.min(8,No_of[6]))}else alerts.innerText="Not enough storage";for(var a=0;a<Op2.length;a++)stuse+=Op2[a];stuse+=Op[0],SmmryUD()}function SmmryUD(){var t=["Sugar","Flour","Clothing","Paper","Ink","WoodenArtifacts","Coal","Iron","Gun-Powder","Cannon","Gun"],n=document.createElement("p"),e=document.getElementById("summaryElement");e.textContent="";var o=document.createElement("p");o.innerHTML="Raw Materials = "+Op[0],e.appendChild(o);var s=document.createElement("p");console.log(25*No_of[5]),s.innerHTML="Storage = "+stuse+"/"+(25+25*No_of[5]),e.appendChild(s);for(var a=0;a<Op2.length;a++){var n=document.createElement("p");n.innerHTML=t[a]+" = "+Op2[a],e.appendChild(n)}}function UpdateTotal(){tsell=0;let t=[2,2,3,3,4,5,1,1,2,3,4];for(var n=0;n<t.length;n++)tsell+=Op2[n]*t[n];tsell+=Op[0],unlck[11]?tsell+=Math.floor(10*tsell/100):unlck[12]&&(tsell+=Math.floor(15*tsell/100)),tsellbtn.innerText=tsell}buttons.forEach(t=>{t.addEventListener("click",()=>{let n=parseInt(t.getAttribute("re-index")),e=itemsCosts[n];!1===unlck[n]&&(CoinsCurrency>=e?(CoinsCurrency-=e,coincount.innerHTML=CoinsCurrency,unlck[n]=!0,t.classList.add("scr")):alerts.innerText="Not enough coins to unlock this item!")})}),sellAllButton.addEventListener("click",function(){CoinsCurrency+=tsell,tsell=0,coincount.innerHTML=CoinsCurrency,tsellbtn.innerText=tsell,Op2=[0,0,0,0,0,0,0,0,0,0,0],Op[0]=0,SmmryUD()});