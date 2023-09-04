const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const numRows = 16;
const numCols = 32;
const tileWidth = 512 / numCols;
const tileHeight = 256 / numRows;
let loadone = false;
let selectedBuildingIndex = -1;
const alerts= document.getElementById('altmsg')
//Sugar Flour Clothing Paper Ink Wooden Artifacts Coal Iron Gun-Powder Cannon Gun 
let stuse= 0; //storage-used
let unlck = [ false,false,false,
  false,false,false,
  false,false,false,
  false,false,false,
  false,false,false ];

//Initialising cost of each item
const itemsCosts = [ 15, 20, 25, 30, 40, 60, 10, 20, 30, 40, 60, 25, 100, 100];

//Raw-material, storage
let Op = [0,0]

//Sugar0 Flour1 Clothing2 Paper3 Ink4 WoodenArtifacts5 Coal6 Iron7 Gun-Powder8 Cannon9 Gun10 
let Op2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];       //Output of secondary buildings
let CoinsCurrency = 10;                           //Starting currency
const yr = document.getElementById('yr');
const mnth = document.getElementById('mnth');

//Sellling items Vars
let tsell=0;
const sellAllButton = document.getElementById("sellall");
const tsellbtn= document.getElementById('tsell');



const cityData = Array.from({ length: numRows }, () =>
  Array.from({ length: numCols }, () => 0)
);


const water = new Image();
water.src = 'assets/water.jpg';//1 for water
const grass = new Image();
grass.src = 'assets/grass.jpg';//0 for grass
const grass2 = new Image();
grass2.src = 'assets/grass2.png';//0.5 for grass
const house = new Image();
house.src = 'assets/house.png';//-1 for house
const road = new Image();
road.src = 'assets/road.png';//-2 for road
const factory = new Image();
factory.src = 'assets/factory.png';//2 for factory
const farm = new Image();
farm.src = 'assets/farm.jpg';//3 for farm
const wind1 = new Image();
wind1.src = 'assets/wind1.png';// 5.0 set of lower windmill
const wind2 = new Image();
wind2.src = 'assets/wind2.png';// 5.1 set of upper windmill
const TownHall = new Image();
TownHall.src = 'assets/TownHall.png';// 6 is townhall
const Mine = new Image();
Mine.src = 'assets/mine.png';// 7 is Mine
const ware = new Image();
ware.src = 'assets/warehouse.png';// 4 is warehouse
const Fisry = new Image();
Fisry.src = 'assets/fishery.png';// 8 is Fisry
const park = new Image();
park.src = 'assets/park.png';// 9 is Park
const baseT = new Image();
baseT.src = 'assets/wdc1.png';// 10.0 is baseT
const UpperT = new Image();
UpperT.src = 'assets/wdc2.png';// 10.1 is UpperT
const swrdd= new Image();
swrdd.src = 'assets/swrdd.png';// 11.0 is swrd
const swrdu = new Image();
swrdu.src = 'assets/swrdu.png';// 11.1 is swrd
const left = new Image();
left.src = 'assets/left.png';// 12.0 is left
const right = new Image();
right.src = 'assets/right.png';// 12.1 is right

//Assign buildings to index
const buildingImages = {
  0: grass,
  0.5: grass2,
  1: water,
  '-1': house,
  '-2': road,
  2: factory,
  3: farm,
  6: TownHall,
  7: Mine,
  4: ware, 
  5.0: wind1,
  5.1: wind2,
  8: Fisry,
  9: park,
  10.0: baseT,
  10.1: UpperT,
  11.0: swrdd,
  11.1: swrdu,
  12.0: left,
  12.1: right

};

function drawGrid() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * tileWidth;
      const y = row * tileHeight;
      const buildingIndex = cityData[row][col];

      if (buildingImages.hasOwnProperty(buildingIndex)) {
        const image = buildingImages[buildingIndex];
        ctx.drawImage(image, x, y, tileWidth, tileHeight);
      }
    }
  }
}


function gameLoop() {
  drawGrid();
  setTimeout(requestAnimationFrame(gameLoop),30000);
}

// Start the game loop
loadOnce();
gameLoop();

function loadOnce() {
  if (loadone === false) {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (row === 0 || row === numRows - 1 || col === 0 || col === numCols - 1) {
          if (Math.random() < 0.3) {
            cityData[row][col] = 1;
            
            // Mark surrounding tiles as water so that it looks randomly generated 
            if (row > 0) cityData[row - 1][col] = 1;
            if (row < numRows - 1) cityData[row + 1][col] = 1;
            if (col > 0) cityData[row][col - 1] = 1;
            if (col < numCols - 1) cityData[row][col + 1] = 1;
          }
        }
        else{
            const randomImage = Math.random() < 0.5 ? grass2 : grass;
            if (randomImage === grass2 ){
              cityData[row][col] = 0.5;
            }
            else{
              cityData[row][col] = 0;
          }
        }
      }
    }
  }
  //making a path 
  cityData[8][0] = cityData[8][1] = -2;
  loadone = true;
}

let list = ["Destroy"," ","Factory","Farm","Warehouse","Windmill","Townhall","Mine","Fishery","Park","Wood Cutter"];
const selectedbuid = document.getElementById('selectedbuild');
const sidebarButtons = document.querySelectorAll('.sidebar-button');
sidebarButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedBuildingIndex = parseInt(button.getAttribute('data-building-index'));
    if (selectedBuildingIndex === -1){
      selectedbuid.innerHTML = "House";
    } else if (selectedBuildingIndex === -2) {
    selectedbuid.innerHTML = "Road";
    }
    else{
      try {
        selectedbuid.innerText = list[selectedBuildingIndex];
      } catch (error) {
      }
    }
  });
});



canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left - tileWidth ;
  const y = event.clientY - rect.top - tileHeight;

  const buildFunctions = {
    '-1': BuildHouse,
    '-2': BuildRoad,
    '2': BuildFactory,
    '3': BuildFarm,
    '5': BuildWindmill,
    '6': BuildTownHall,
    '7': BuildMine,
    '4': BuildWare,
    '8': BuildFishery,
    '9': BuildPark,
    '10': BuildWDC,
    '11': BSword
  };

  const col = Math.floor(x / tileWidth);
  const row = Math.floor(y / tileHeight);


  if (col >= 0 && col < numCols - 1 && row >= 0 && row < numRows - 1){
    if (buildFunctions.hasOwnProperty(selectedBuildingIndex)) {
      const buildFunction = buildFunctions[selectedBuildingIndex];
      buildFunction(row, col);
      coincount.innerHTML = CoinsCurrency; 
    }
  }
  CheckTiles();
});


let msgs = ['Requires road nearby or farm and place on grass',
            'Requires road nearby and place on grass',
            'Can be placed only over grass',
            'Can build only one townhall',
            'Can only destroy roads',
            'OR Not enough Coins ']            
//0grass 1house 2road 3fram 4warehouse 5factory 6townhall 7windmill 8mine 9fishery 10park 11WDC 12Sword
const Bcost = [ 1, 2, 0, 1, 5, 2, 10, 25, 50, 75 ,100, 150, 200]
//All Functions for building
function BuildFarm(row,col){
  if(((cityData[row][col+1] ===-2 || cityData[row][col-1]===-2 || cityData[row+1][col]===-2 || cityData[row-1][col]===-2)
      ||(cityData[row][col+1] ===3 || cityData[row][col-1]===3 || cityData[row+1][col]===3 || cityData[row-1][col]===3))
      && (cityData[row][col] === 0.5 || cityData[row][col]=== 0) && (CoinsCurrency>(Bcost[3]-1))){
    cityData[row][col] = 3;
    CoinsCurrency=CoinsCurrency-Bcost[3];

  }
  else{
    alerts.innerText = msgs[0] + " " + msgs[5];
  }
}
function BuildHouse(row,col){
  if(ISconnected(row,col) && CoinsCurrency>=Bcost[1]){
    cityData[row][col] = -1;
    CoinsCurrency-=Bcost[1];
    if(cityData[row][col+1]===-1){
      cityData[row][col]=12.0
      cityData[row][col+1]=12.1
    }
    else if (cityData[row][col-1]===-1){
      cityData[row][col-1]=12.0
      cityData[row][col]=12.1
    }
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}
function BuildFactory(row,col){
  if(ISconnected(row,col)&& CoinsCurrency>=Bcost[5]){
    cityData[row][col] = 2;
    CoinsCurrency-=Bcost[5];

  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}
function BuildRoad(row,col){
  if(cityData[row][col] ===-2 || cityData[row][col]===1){
    alerts.innerText = msgs[2]+ " " + msgs[5];
  }
  else{
    cityData[row][col] = -2;
  } 
}
function BuildWindmill(row,col){
  if((ISconnected(row,col) || ISconnected(row-1,col) ) && CoinsCurrency>=Bcost[7]
      && Math.floor(cityData[row-1][col])===0 && Math.floor(cityData[row][col])===0){
    cityData[row-1][col] = 5.1;
    cityData[row][col] = 5.0;
    CoinsCurrency-=Bcost[7];
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}
function BSword(row,col){
  if((ISconnected(row,col) || ISconnected(row-1,col) ) && CoinsCurrency>=Bcost[12]
      && Math.floor(cityData[row-1][col])===0 && Math.floor(cityData[row][col])===0){
    cityData[row-1][col] = 11.1;
    cityData[row][col] = 11.0;
    CoinsCurrency-=Bcost[12];
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}
function BuildTownHall(row,col){
  if(ISconnected(row,col) && ISTownhall === false && CoinsCurrency>=Bcost[6]){
    ISTownhall = true;
    CoinsCurrency-=Bcost[6];
    cityData[row][col] = 6;
  }
  else{
    alerts.innerText = msgs[3]+ " " + msgs[5];
  }
}
function BuildMine(row,col){
  if(ISconnected(row,col) && CoinsCurrency>=Bcost[8]){
    cityData[row][col] = 7;
    CoinsCurrency-=Bcost[8];
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}
function BuildWare(row,col){
  if(ISconnected(row,col)&& CoinsCurrency>=Bcost[4]){
    cityData[row][col] = 4;
    CoinsCurrency-=Bcost[4];
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];  
  }
}
function BuildFishery(row,col){
  if(ISconnected(row,col) && CoinsCurrency>=Bcost[9]
      && (cityData[row+1][col]===1 || cityData[row-1][col]===1 || cityData[row][col+1]===1 || cityData[row][col-1]===1)){
    cityData[row][col] = 8;
    CoinsCurrency-=Bcost[9];
  }
  else{
    alerts.innerText = msgs[1]+" Around water. "+ " " + msgs[5];  
  }
}
function BuildPark(row,col){
  if(Math.floor(cityData[row][col])===0 && CoinsCurrency>=Bcost[10]){
    cityData[row][col] = 9;
    CoinsCurrency-=Bcost[10];
  }else{
    alerts.innerText = "Only can be placed over grass"+ " " + msgs[5];
  }
}
function BuildWDC(row,col){
  if((ISconnected(row,col) || ISconnected(row-1,col)) 
      && Math.floor(cityData[row-1][col])===0 && Math.floor(cityData[row][col])===0 && CoinsCurrency>=Bcost[11]){
    cityData[row-1][col] = 10.1;
    cityData[row][col] = 10.0;
    CoinsCurrency-=Bcost[11];
  }
  else{
    alerts.innerText = msgs[1]+ " " + msgs[5];
  }
}


//Connected to Road Grass and 8,1 tile
function ISconnected(row,col){
  if((cityData[row][col+1] ===-2 || cityData[row][col-1]===-2 || cityData[row+1][col]===-2 || cityData[row-1][col]===-2) 
      && Math.floor(cityData[row][col]) === 0
      && isConnectedToInitialRoad(row, col)){
        return true;
      }
      else{
        return false;
      }
}



// NoOfHouses NoOfFactory NoOfFarmlands NoOfWindmill NoOfMines Wares Fishery WoodCutter
let No_of = [ 0, 0, 0, 0, 0, 0, 0, 0]

const coincount = document.getElementById("coins");
const NoOfPeopleHTML = document.getElementById("people");
let parks =0

function CheckTiles(){
  No_of = [ 0, 0, 0, 0, 0, 0, 0, 0]  
  // NoOfHouses NoOfFactory NoOfFarmlands NoOfWindmill NoOfMines Wares Fishery WDC
  parks=0

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if(cityData[row][col]===12.1){
        No_of[0]+=3;
      }
      else if(cityData[row][col] === -1){
        No_of[0]++;
      }
      else if(cityData[row][col] === 2){
        No_of[1]++;
      }
      else if(cityData[row][col] === 3){
        No_of[2]++;
      }
      else if(cityData[row][col] === 5){
        No_of[3]++;
      }
      else if(cityData[row][col] === 7){
        No_of[4]++;
      }
      else if(cityData[row][col] === 4){
        No_of[5]++;
        console.log(No_of[5])
      }
      else if(cityData[row][col] === 8){
        No_of[6]++;
      }
      else if(cityData[row][col] === 9){
        parks++;
      }
      else if(cityData[row][col] === 10){
        No_of[7]++;
      }
    }
  }
  NoOfPeopleHTML.innerHTML = No_of[0]*2;

}


let yrmnth = [1200, 0]

function yearupdate(){
  //Each 10 seconds past are 6 mnth 
  //20s is 1 year
  yrmnth[1]+=6;
  if(yrmnth[1]>12){
    yrmnth[0]++;
    yrmnth[1] = 0;
  }
  yr.innerText = yrmnth[0];
  mnth.innerText = yrmnth[1];
}



//-------------Production algos ----------------
function giveCoinsPeriodically() {
  CalPRO();                                   //Update production
  UpdateTotal();                              //Update total cost of goods vailable  
  yearupdate();                               //Update year
  coincount.innerHTML = CoinsCurrency;        //Display Total Coins Available

  setTimeout(giveCoinsPeriodically, 10000);   // 10000 milliseconds = 10 seconds
}

// Call the function to start giving coins periodically
coincount.innerHTML = CoinsCurrency; 
giveCoinsPeriodically();

//Checking Roads Are connected to route
function isConnectedToInitialRoad(row, col) {
  const visited = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => false)
  );
  const queue = [{ row: row, col: col }];
  while (queue.length > 0) {
    const current = queue.shift();
    const r = current.row;
    const c = current.col;
    if (r === 8 && c === 1) {
      return true; // The road is connected to (8, 1)
    }
    visited[r][c] = true;
    const neighbors = [
      { row: r - 1, col: c },
      { row: r + 1, col: c },
      { row: r, col: c - 1 },
      { row: r, col: c + 1 },
    ];
    for (const neighbor of neighbors) {
      const newRow = neighbor.row;
      const newCol = neighbor.col;
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        !visited[newRow][newCol] &&
        cityData[newRow][newCol] === -2
      ) {
        queue.push({ row: newRow, col: newCol });
        visited[newRow][newCol] = true;
      }
    }
  }
  return false; // The road is not connected to (8, 1)
}


// Get all the buttons with the "scrbtn" class
const buttons = document.querySelectorAll('.scrbtn');
//assigned all are locked




// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the re-index from the button's attribute
    const reIndex = parseInt(button.getAttribute('re-index'));
    
    // Get the cost from the itemCosts array
    const cost = itemsCosts[reIndex];

    // Check if the item is already unlocked
    if (unlck[reIndex] === false) {
      // Check if the player has enough coins
      if (CoinsCurrency >= cost) {
        // Deduct the cost from the player's coins
        CoinsCurrency -= cost;
        // Update the UI to reflect the new coin count
        coincount.innerHTML = CoinsCurrency;
        // Unlock the item by setting it to true in the list
        unlck[reIndex] = true;
        // Change the button's class to "scr" to indicate it's unlocked
        button.classList.add('scr');
      } else {
        // Display an alert if the player doesn't have enough coins
        alerts.innerText = "Not enough coins to unlock this item!"
      }
    }
  });
});



// No_of = [ 0, 0, 0, 0, 0, 0, 0, 0]  
// NoOfHouses0 NoOfFactory1 NoOfFarmlands2 NoOfWindmill3 NoOfMines4 Wares5 Fishery6 WDC7
function CalPRO(){
  let eff = 0;
  try{
    eff = Math.floor((No_of[0]*2)/(No_of[1]+No_of[2]+No_of[3]+No_of[4]+No_of[5]+No_of[6]+No_of[7]))
    //efficiency refers to how many people can be there in per building, manpower in a building
  }
  catch(error){
  }
  //Output = [ FarmsRawMaterials, Wares]
  Op[1]=25+(No_of[5]*25);
  let mp = [3, 2, 6]; //throttle producion
  //Sugar0 Flour1 Clothing2 Paper3 Ink4 WoodenArtifacts5 Coal6 Iron7 Gun-Powder8 Cannon9 Gun10 
  //let Op2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  if(stuse<Op[1])
  {  
  if(eff>0 && No_of[2]>0){Op[0]+=Math.min(6,No_of[2]);if((No_of[2]-6)>0){Op[0]+=Math.floor(No_of[2]*(1/40));}}         //Raw material produced here 
  
  if(eff>0 && (unlck[6] || unlck[7] || unlck[8])){
    const effc = Math.min(eff,2)
    if(unlck[6]){Op2[6]+=No_of[4]*effc;}   //No_of[4]*2 / 2
    if(unlck[7]){Op2[7]+=No_of[4]*effc}
    if(unlck[8]){Op2[8]+=(No_of[4]/2)*effc}
  }    // For Coal and Iron half each and one gunpowder
  
  if(eff>0 && unlck[5] && No_of[7]>0){
    const effc = Math.min(eff,2)
    Op2[5]+=(No_of[7]*effc);   //Make Artifacts
  }  

  if( unlck[1] && eff>0 && Op[0]>0){
    if(Op[0]>No_of[3]){
      Op[0]=Op[0]-Math.min(mp[2],No_of[3]);
      Op2[1]=Op2[1]+Math.min(mp[2],No_of[3]);
    }
    else{
      Op[0]=0;Op2[1]=Op2[1]+No_of[3];
    }                                             //Take one rawmaterial and turn it into flour
  } 
  if( unlck[0] && eff>0 && Op[0]>0){
    if(Op[0]>No_of[1]){
      Op[0]=Op[0]-Math.min(mp[2],No_of[1]);
      Op2[0]=Op2[0]+Math.min(mp[2],No_of[1]);}
    else{
      Op[0]=0;Op2[0]=Op2[0]+No_of[1];
    }                                              //Take one rawmaterial and turn it into sugar
  }
  if( unlck[3] && eff>1 && Op[0]>0){
    if(Op[0]>No_of[1]){Op[0]=Op[0]-Math.min(mp[2],No_of[1]);Op2[3]=Op2[3]+Math.min(mp[2],No_of[1]);}
    else{Op[0]=0;Op2[3]=Op2[3]+No_of[1];}     //Turn 1 rawmaterial into paper 
  }
  if( unlck[9] && eff>1 && Op2[7]>0 && Op2[8]>0){
    if(Op2[7]>No_of[1] && Op2[8]>No_of[1]){Op2[7]=Op2[7]-Math.min(mp[0],No_of[1]);Op2[8]=Op2[8]-Math.min(mp[0],No_of[1]);Op2[9]=Op2[9]+Math.min(mp[0],No_of[1]);}
    else{alerts.innerText="Not enough manpower and production of iron and gunpowder"}     //Turn 1 iron and gunpowder into cannon 
  }
  if( unlck[10] && eff>1 && Op2[7]>0 && Op2[8]>0){
    if(Op2[7]>No_of[1] && Op2[8]>No_of[1]){Op2[7]=Op2[7]-Math.min(mp[1],No_of[1]);Op2[8]=Op2[8]-Math.min(mp[1],No_of[1]);Op2[10]=Op2[10]+Math.min(mp[1],No_of[1]);}
    else{alerts.innerText="Not enough manpower and production of iron and gunpowder"}     //Turn 1 iron and gunpowder into cannon 
  }
  if (No_of[6]>0 && eff>0 && unlck[4])Op2[4]+=Math.min(8,No_of[6]);
  }
  else{
    alerts.innerText="Not enough storage"
  }

  for(var i=0;i<Op2.length;i++){
  stuse+=Op2[i];
  }
  stuse+=Op[0];
  SmmryUD();
}

//Update summary
function SmmryUD(){
    // Text to add before the Op2 values
    var textToAdd = ["Sugar", "Flour", "Clothing", "Paper", "Ink", "WoodenArtifacts", "Coal", "Iron", "Gun-Powder", "Cannon", "Gun"]
    var paragraphElement = document.createElement('p');
    // Get a reference to the summary element
    var summaryElement = document.getElementById('summaryElement');
    summaryElement.textContent = '';

   // Create and append a paragraph element for Raw Materials
   var rawMaterialsParagraph = document.createElement('p');
   rawMaterialsParagraph.innerHTML = "Raw Materials = " + Op[0];
   summaryElement.appendChild(rawMaterialsParagraph);

   var storageParagraph = document.createElement('p');
   console.log(No_of[5]*25)
   storageParagraph.innerHTML = "Storage = " + stuse + "/"+(25+No_of[5]*25);
   summaryElement.appendChild(storageParagraph);
    // Loop through the Op2 array and add each value one below the other
  for (var i = 0; i < Op2.length; i++) {
    var paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = textToAdd[i] + " = " + Op2[i];
    summaryElement.appendChild(paragraphElement);
  }
}

//Selling
sellAllButton.addEventListener("click", function() {
  CoinsCurrency+=tsell;
  tsell=0;
  coincount.innerHTML = CoinsCurrency;
  tsellbtn.innerText=tsell;
  Op2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  Op[0] = 0;
  SmmryUD();
});


function UpdateTotal(){
  tsell=0;
  let prices = [2, 2, 3, 3, 4, 5, 1, 1, 2, 3, 4]
  for(var i=0;i<prices.length;i++){
    tsell+=(Op2[i]*prices[i]);
  }
  tsell+=Op[0];
  if(unlck[11]){
    tsell+=Math.floor((tsell*10)/100);
  }
  else if(unlck[12]){
    tsell+=Math.floor((tsell*15)/100);
  }
  tsellbtn.innerText=tsell;
}

