// document.getElementsByTagName("body")[0].style.cursor = "url('./images/mouse.png'), auto";

// var bgMusic;

// function start(){
//     console.log('i enter ...');
//     bgMusic = new sound("test.mp3");
//     bgMusic.play();
// }
// start();

// function bgMusic() {
//     console.log('i enter...');
//     // var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
//     var audio = new Audio('test.mp3');
//     audio.play();
// }


// var vw = window.innerWidth + "px", vh = window.innerHeight + "px";
var left_margin = 75, top_margin = 200, current_key = 0, last_key = 0, clearHalf = 0, disable_inventory_click = 0;
var player = document.getElementById('walkLeft');
var last_click = 1;//was it seller's or your inventory's click ?
//0 == yours, 1 == seller's
//only two type => no need of 0 and 1 keep only 0 -done-
//can also be used for owned and not owned //MONEY CASE -done-

//USE AND THROW VARIABLES -> MAKE REUSABLE
var purchaseCake2 = 0, purchaseCake3 = 0, confirm1 = -1, display = 1, display2 = 1, price = 200, break_barrier = 0, break_barrier2 = 0, blockBGclick = 0;
//DEBUG CONFIRM1 AND DISPLAY CODE -done-
//REDUCE SIMILAR WORKING VARIABLES
var digClkCnt = 0;
//to avoid error don't allow your items to go to seller because there are no selling options (YET) -done-

document.addEventListener('keyup', function(event2){
    current_key = 0;
    updateClick(current_key);
});



//if you press enter near seller after opening the description box, both open simultaneously


//for the close button on inventory
var screen = document.getElementById('inv-screen');
var drawInv = document.getElementById('drawInv');
var invBtn = document.getElementById('invBtn');
var sellInv = document.getElementById('sellInv');
var close = document.getElementsByClassName("close")[0];


invBtn.onclick = function(){
    screen.style.display = "block";
    drawInv.style.display = "block";
    close.style.display = "block";
    sellInv.style.display = "none";
    clearHalf = 1 ;
    disable_inventory_click = 1;
}

//BIG ERROR : PURCHASED ITEMS DISAPPEAR IN INVENTORY ! -done-

// currently seller's items dissappear if we click close while holding them -done-
close.onclick = function() { 
        screen.style.display = "none";
        clearHalf = 0;
        disable_inventory_click = 0;
        //SHOULD WORK FOR BOTH INVENTORIES -done-
        
        //clearHalf == 0 => both are open
        
        if(last_click == 0){
        //when the previously clicked lock was empty
        if(board[xi][yi] == 0){
            board[xi][yi] = identify_click_previous;
            identify_click = 0;
            identify_click_previous = 0;
        }

        //but what when it's not empty ?
        else{
        // => put at last
        for(let i=3; i>=0; i--){
            for(let j=4; j>=0; j--){
                if(board[i][j] == 0){
                    board[i][j] = identify_click_previous;
                    identify_click = 0;
                    identify_click_previous = 0;
                    return;
                }
            }
        }
        }
    }

    else{
        if(sell[xi][yi] == 0){
            sell[xi][yi] = identify_click_previous;
            identify_click = 0;
            identify_click_previous = 0;
        }

        
        else{
        for(let i=3; i>=0; i--){
            for(let j=4; j>=0; j--){
                if(sell[i][j] == 0){
                    sell[i][j] = identify_click_previous;
                    identify_click = 0;
                    identify_click_previous = 0;
                    return;
                }
            }
        }
        }
    }
}
    



//BAD CODE
var yes = document.getElementsByClassName('yes')[0];
var no = document.getElementsByClassName('no')[0];
var confirm_purchase = document.getElementById('confirm_purchase');
var yes2 = document.getElementsByClassName('yes2')[0];
var no2 = document.getElementsByClassName('no2')[0];
var confirm_purchase2 = document.getElementById('confirm_purchase2');
//IMPROVE THIS CODE

//DONT ALLOW TO CLICK IN BACKGROUND WHEN SCREEN IS DISPLAYED -done-
function confirmPurchase(){
    if(display == 1){
    blockBGclick = 1;
    confirm_purchase.style.display = "block";
    yes.style.display = "block";
    no.style.display = "block";
    }
}
function confirmPurchase2(){
    if(display2 == 1){
    blockBGclick = 1;
    confirm_purchase2.style.display = "block";
    yes2.style.display = "block";
    no2.style.display = "block";
    }
}
yes.onclick = function(){
    // console.log('i enter...');
    confirm_purchase.style.display = "none";
    yes.style.display = "none";
    no.style.display = "none";
    confirm1 = 1; 
    display = 0;
    blockBGclick = 0;
}
no.onclick = function(){
    confirm_purchase.style.display = "none";
    yes.style.display = "none";
    no.style.display = "none";
    confirm1 = 0;
    display = 0;
    blockBGclick = 0;
    board[xi][yi] = 0;
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(sell[i][j] == 0){
                sell[i][j] = 21;
                display = 1;
                return;
            }
        }
    }
}
yes2.onclick = function(){
    confirm_purchase2.style.display = "none";
    yes2.style.display = "none";
    no2.style.display = "none";
    confirm1 = 1; 
    display2 = 0;
    blockBGclick = 0;
}
no2.onclick = function(){
    confirm_purchase2.style.display = "none";
    yes2.style.display = "none";
    no2.style.display = "none";
    confirm1 = 0;
    display2 = 0;
    blockBGclick = 0;
    board[xi][yi] = 0;
   
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(sell[i][j] == 0){
                sell[i][j] = 22;
                display2 = 1;
                return;
            }
        }
    }
}

// DEBUG WALKING !
// NOTE : READABILITY IS THE ABSOLUTE HALLMARK OF WRITING GOOD CODE !!


document.addEventListener('keydown', function(event){

    if(digClkCnt == 1 && event.keyCode == 32){
        // dialogue2();
        digBox.style.display = "none";
        dig1.innerHTML = '';
        dig2.innerHTML = '';
    }

    if(left_margin>557 && left_margin<653 && top_margin>472 && event.keyCode == 13){
        screen.style.display = "block";
        sellInv.style.display = "block";
    }

    if(event.keyCode == 37){ //LEFT
    //console.log('left was pressed'); 
    if((left_margin<0) || (top_margin<180 && left_margin<150) || (top_margin<180 && left_margin<590) || (top_margin>123 && top_margin<467 && left_margin<555 && left_margin>545) || (left_margin<820 && left_margin>810 && top_margin>300 && top_margin<455) || (left_margin>567 && left_margin<663 && top_margin>482)) return;
        left_margin -= 3;
        player.style.marginLeft = left_margin+"px";
        current_key = 37;
        updateClick(current_key);           
    }
    else if(event.keyCode == 39){ //RIGHT
        if((left_margin>1160 && (top_margin<257 || top_margin>272))|| (top_margin>330 && left_margin>860) || (top_margin<135 && left_margin>666) || (top_margin<165 && left_margin>900) || (top_margin<170 && top_margin>180 && left_margin>340 && left_margin<350) || (top_margin>280 && top_margin<290 && top_margin<467 && left_margin>123 && left_margin<133) || (top_margin>300 && left_margin>660 && left_margin<670 && top_margin<455) || (left_margin>567 && left_margin<663 && top_margin>482)) return;
        else if(left_margin > 1260) window.location.href='next.html';
        left_margin += 3;
        player.style.marginLeft = left_margin+"px";
        current_key = 39;
        updateClick(current_key);
    }
    else if(event.keyCode == 38){ //TOP
        if((top_margin<180 && left_margin<150) || top_margin<10 || (top_margin<135 && left_margin>666 && left_margin<910) || (top_margin<165 && left_margin>900) || (top_margin<180 && left_margin<590 && left_margin>340) || (top_margin<467 && top_margin>457 && left_margin>123 && left_margin<555) || (top_margin<455 && top_margin>445 && left_margin>660 && left_margin<820) || (top_margin<275 && top_margin>251 && left_margin>1194)) return;
        top_margin -= 3;
        player.style.marginTop = top_margin+"px";
        current_key = 38;
        updateClick(current_key);
    }
    else if(event.keyCode == 40){ //DOWN
        if(top_margin>524 || (top_margin>330 && left_margin>860) || (top_margin>280 && top_margin<290 && left_margin>123 && left_margin<555) || (top_margin>300 && top_margin<310 && left_margin>660 && left_margin<820) || (top_margin<275 && top_margin>251 && left_margin>1194) || (left_margin>567 && left_margin<663 && top_margin>482)) return;
        top_margin += 3;
        player.style.marginTop = top_margin+"px";
        current_key = 40;
        updateClick(current_key);
    }
});

function updateClick(current_key){
    if(current_key == 39 && player.src.indexOf("walk_right.gif") == -1){
        // console.log('key 39', player.src.indexOf("walk_right.gif"));
        player.src="./images/walk_right.gif";
    }
    else if(current_key == 37 && player.src.indexOf("walk_left.gif") == -1){
        // console.log('key 37', player.src.indexOf("walk_left.gif"));
        player.src="./images/walk_left.gif";
    }
    else if(current_key == 0 && player.src.indexOf("stop_walk_left.gif") == -1){
        // console.log('key 0', player.src.indexOf("stop_walk_left.gif"));
        player.src="./images/stop_walk_left.gif";
    }
    else if(current_key == 0 && player.src.indexOf("stop_walk_right.gif") == -1){
        // console.log('key 0', player.src.indexOf("stop_walk_right.gif"));
        player.src="./images/stop_walk_right.gif";
    }
    else if((current_key == 40 || current_key == 38) && player.src.indexOf("/walk_right.gif") == -1){
        // console.log('key 40', player.src.indexOf("walk_right.gif"));
        player.src="./images/walk_right.gif";
    }
    else if((current_key == 40 || current_key == 38) && player.src.indexOf("walk_left.gif") !== -1){
        // console.log('key 40', player.src.indexOf("walk_right.gif"));
        player.src="./images/walk_left.gif";
    }
}




//ADD MONEY SYSTEM -done-


//inventory canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
}

const mouse = {
    x: undefined,
    y: undefined,
}

var lift = 0, topX = 826, topY = 50, identify_click = 0, identify_click_previous = 0, cursor_drawn_before = 0, cursor_drawn_after = 0;
var xi = 0, yi = 0, xi_sell = 0, yi_sell = 0;
//CAN UNIFY CURSOR AND CLICKING OPTIONS FOR SELLER AND MY INVENTORY ? -done-
var money = 10000, prev_money = money, clicked = 0;

var board = new Array(4);

for (var i = 0; i < 5; i++) 
    board[i] = new Array(4);

//2d array 4X5
for(let i=0; i<4; i++)
    for(let j=0; j<5; j++)
        board[i][j]=0;

//code for empty = 0, redPotion = 1, bluePotion = 2, 
board[0][0] = 1;
board[1][0] = 2;
board[0][1] = 3;
board[3][0] = 4;


//THE LAST ROW OF SELLER INV IS NOT WORKING !
var sell = [[21, 22, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
// console.table(sell);



//IF CLOSE X THEN CURSOR == NONE 
//AND ITEM IS KEPT BACK IN IT'S PLACE -done-
//CORRECT THE CLEARING SECTIONS PART -done-
//ADD CONDITION WHEN SWITCHING ITEMS IN INVENTORY -done-

//clear half canvas when only inventory is clicked -done-

canvas.addEventListener('mousemove', function(move){
    mouse.x = move.x;
    mouse.y = move.y;
    // console.log(mouse.x, mouse.y);
});

canvas.addEventListener('click', function(click1){
    // console.table(board);
    
    if(click1.x > topX &&  click1.x < 1215 && click1.y > topY &&  click1.y < 520 && blockBGclick == 0){
        xi = Math.floor((click1.x - topX)/100);
        yi = Math.floor((click1.y - topY)/100);
        // console.log(xi, yi);

        if(board[xi][yi] > 0){
            identify_click = board[xi][yi];
            last_click = 0;
            disable_inventory_click = 1;
        }
        else{
            identify_click = 0;
            last_click = 1
            disable_inventory_click = 0;
        };


        drawCursor_potionRed(); 
        drawCursor_potionBlue(); 
        drawCursor_camera();
        drawCursor_bottle();

        
        // console.log('identify_click', identify_click);
        // console.log('identify_click_previous', identify_click_previous);
        // console.log('cursor_drawn(before)', cursor_drawn_before);
        // console.log('cursor_drawn(after)', cursor_drawn_after);
        // console.log(current_cursor);

        //when cicking on an empty block
        if(board[xi][yi] == 0 && cursor_drawn_before == 1){
            board[xi][yi] = identify_click_previous;
            cursor_drawn_after = 0;
        }
        
        // console.log('cursor_drawn(before)', cursor_drawn_before);
        // console.log('identify_click', identify_click);
        // console.log('identify_click_previous', identify_click_previous);
        // console.log('cursor_drawn(after)', cursor_drawn_after);
        // console.log('previous', prev_xi, prev_yi);
        // console.log('current', xi, yi);
        if(board[xi][yi] > 0 && cursor_drawn_after == 1){
            // console.log(identify_click, identify_click_previous);
            if(identify_click != identify_click_previous){
                // console.log('i enter...');
                board[xi][yi] =  identify_click_previous;
            }
            else{
                // console.log('not working');
                board[xi][yi] = 0;
            }
        }

        cursor_drawn_before = cursor_drawn_after;
        identify_click_previous = identify_click;
        

        // console.table(board);
        // console.log('xi = ', xi);
        // console.log('yi = ',yi);
    }

    else if(click1.x > 77 &&  click1.x < 461 && click1.y > 51 && click1.y < 521 && blockBGclick == 0){
        if(disable_inventory_click == 0){
        xi_sell = Math.floor((click1.x - 77)/100);
        yi_sell = Math.floor((click1.y - 51)/100);
        // console.log(xi_sell, yi_sell);


        if(sell[xi_sell][yi_sell] > 0){
            identify_click = sell[xi_sell][yi_sell];
            last_click = 1;
        }
        else{
            identify_click = 0;
            last_click = 0;
        }

        drawCursor_cake2(); 
        drawCursor_cake3(); 


        if(sell[xi_sell][yi_sell] == 0 && cursor_drawn_before == 1){
            sell[xi_sell][yi_sell] = identify_click_previous;
            cursor_drawn_after = 0;
        }

        if(sell[xi_sell][yi_sell] > 0 && cursor_drawn_after == 1){
            // console.log(identify_click, identify_click_previous);
            if(identify_click != identify_click_previous){
                sell[xi_sell][yi_sell] = identify_click_previous;
            }
            else{
                sell[xi_sell][yi_sell] = 0;
            }
        }

        cursor_drawn_before = cursor_drawn_after;
        identify_click_previous = identify_click;
        
        //using the same logic agaian, put it in a function
    }

    }
});


//MAKE NEW FUNCTIONS FOR REPEATED CODE

function potionRed(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(board[i][j] == 1){
                ctx.beginPath();
                var img = document.getElementById('potionRed');
                ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 55, 50);
                ctx.closePath();
            }
        }
    }
}
potionRed();


function potionBlue(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(board[i][j] == 2){
                ctx.beginPath();
                var img = document.getElementById('potionBlue');
                ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 45, 50);
                ctx.closePath();
            }
        }
    }
}
potionBlue();

function bottle(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(board[i][j] == 4){
                ctx.beginPath();
                var img = document.getElementById('bottle');
                ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 60, 50);
                ctx.closePath();
            }
        }
    }
}
bottle();


//CHECK IF ELSE IF IS REQUIRED
function camera(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            if(board[i][j] == 3){
                ctx.beginPath();
                var img = document.getElementById('camera');
                ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 60, 40);
                ctx.closePath();
            }
            else if(board[i][j] == 0){
                drawCursor_potionRed();
                drawCursor_potionBlue();
                drawCursor_camera();
                drawCursor_bottle();
            } 
        }
    }
}
camera();


//SELLING OPTION COMMING SOON !
function cake2(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
           
            if(sell[i][j] == 21 && clearHalf == 0){
                ctx.beginPath();
                var img = document.getElementById('cake2');
                ctx.drawImage(img, 15 + i*100 + 77, 15 + j*100 + 51, 60, 60);
                ctx.closePath();
            }
            //print a pop up "purchase this item yes/no" -done-
            else if(board[i][j] == 21){
                
                // ADD PURCHASE WARNING -done-

                //price stops decreasing if we pick it up in between
                confirmPurchase();
                if(confirm1 == 1){
                    break_barrier = 1;

                if(prev_money-200 == money){
                    prev_money = money;
                    purchaseCake2 = 1;
                    confirm1 = -1;
                }

                //STOPS DECREASING IF ITEMS PICKED BACK AGAIN.
                if(purchaseCake2 == 0){
                    money -= 1;
                }
            }
            if(break_barrier == 1){
                cursor_drawn_after = 1;
                ctx.beginPath();
                var img = document.getElementById('cake2');
                ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 60, 60);
                ctx.closePath();
            }
        // }
    }
            else if(sell[i][j] == 0){
                drawCursor_cake2(); 
                drawCursor_cake3(); 
            } 
        }
    }
}
cake2();

function cake3(){
    for(let i=0; i<4; i++){
        for(let j=0; j<5; j++){
            
            if(sell[i][j] == 22 && clearHalf == 0){
                ctx.beginPath();
                var img = document.getElementById('cake3');
                ctx.drawImage(img, 15 + i*100 + 77, 15 + j*100 + 51, 60, 60);
                ctx.closePath();
            }
            //ANY WAY TO OPTIMIZE THIS ??
            else if(board[i][j] == 22){
                confirmPurchase2();
               
                if(confirm1 == 1){
                    break_barrier2 = 1;

                if(prev_money-250 == money){
                    prev_money = money;
                    purchaseCake3 = 1;
                    confirm1 = -1;
                }
                if(purchaseCake3 == 0){
                    money -= 1;
                    // display2++;
                }
                
            }
        if(break_barrier2 == 1){
            cursor_drawn_after = 1;
            ctx.beginPath();
            var img = document.getElementById('cake3');
            ctx.drawImage(img, 20 + i*100 + topX, 20 + j*100 + topY, 60, 60);
            ctx.closePath();
        }
    }
        }
    }
}
cake3();

function drawCursor_potionRed(){
    // console.log('identify_click = ', identify_click);
    // console.log('i run', board[xi][yi]);
        if(identify_click == 1){
        // console.log('i enter');
        cursor_drawn_after = 1;
        cursor_drawn_before = cursor_drawn_after;
        ctx.beginPath();
        var img3 = document.getElementById('potionRed');
        ctx.drawImage(img3, mouse.x-25, mouse.y-20, 55, 50);
        ctx.closePath();
       }
}

function drawCursor_potionBlue(){
    
    if(identify_click == 2){
        // console.log('i enter');
    cursor_drawn_after = 1;
    cursor_drawn_before = cursor_drawn_after;
    ctx.beginPath();
    var img4 = document.getElementById('potionBlue');
    ctx.drawImage(img4, mouse.x-25, mouse.y-20, 45, 50);
    ctx.closePath();
    }
}

function drawCursor_bottle(){
    if(identify_click == 4){
        cursor_drawn_after = 1;
        cursor_drawn_before = cursor_drawn_after;
        ctx.beginPath();
        var img = document.getElementById('bottle');
        ctx.drawImage(img, mouse.x-25, mouse.y-20, 60, 50);
        ctx.closePath();
    }
}

function drawCursor_camera(){
    if(identify_click == 3){
        cursor_drawn_after = 1;
        cursor_drawn_before = cursor_drawn_after;
        ctx.beginPath();
        var img = document.getElementById('camera');
        ctx.drawImage(img, mouse.x-25, mouse.y-20, 60, 40);
        ctx.closePath();
    }
}

function drawCursor_cake2(){
    if(identify_click == 21){
        cursor_drawn_after = 1;
        cursor_drawn_before = cursor_drawn_after;
        ctx.beginPath();
        var img = document.getElementById('cake2');
        ctx.drawImage(img, mouse.x-25, mouse.y-20, 60, 60);
        ctx.closePath();
    }
}

function drawCursor_cake3(){
    if(identify_click == 22){
        cursor_drawn_after = 1;
        cursor_drawn_before = cursor_drawn_after;
        ctx.beginPath();
        var img = document.getElementById('cake3');
        ctx.drawImage(img, mouse.x-25, mouse.y-20, 60, 60);
        ctx.closePath();
    }
}

function writeStuff(){
    ctx.beginPath();
    ctx.fillStyle='#291a12';
    ctx.font = 'bold 25px Silkscreen';
    ctx.fillText("Don't forget to pack", 850, 600);
    ctx.fillText(" your inventory! :D", 850, 640);
    ctx.closePath();
}
//DON"T WRITE STUFF WHEN OPENING SELLER'S INVENTORY -done-

function writeMoney(){
    ctx.beginPath();
    ctx.fillStyle='red';
    ctx.font = 'bold 30px Silkscreen';
    ctx.fillText(`Money: ${money}`, 50, 620);
    ctx.closePath();
}

var continuee = 0, i = 0;
var txt1 = "Hello there. I'm Thallus The Merchant.";
var txt1_1 = 'Pree space to continue.';
var txt2 = 'Press Up, Down, Left and Right arrow';
var txt2_1 = 'keys to move';
var speed = 100;

// if dialogue initiated and clicking

// clicking several times speeds it up
function typeWriter(){
    if(continuee == 0){
        if(i < txt1.length){
            dig1.innerHTML += txt1.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    if(i == txt1.length){
        continuee += 1;
        i = 0;
    }
    if(continuee == 1){
        if(i < txt1_1.length){
            dig2.innerHTML += txt1_1.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }  
    }
}

// function typeWriter2(){
//     if(continuee == 1){
//         if(k < txt2.length){
//             dig3.innerHTML += txt2.charAt(i);
//             k++;
//             setTimeout(typeWriter, speed);
//         }
//     }
//     if(k == txt2.length){
//         continuee += 1;
//         k = 0;
//     }
//     if(continuee == 2){
//         if(k < txt2_1.length){
//             dig4.innerHTML += txt2_1.charAt(i);
//             k++;
//             setTimeout(typeWriter, speed);
//         }  
//     }
// }

var digBox = document.getElementById('digBox');
var dig1 = document.getElementById("part1");
var dig2 = document.getElementById("part2");
// var dig3 = document.getElementById("part3");
// var dig4 = document.getElementById("part4");

function dialogue(){
    if(digClkCnt == 0){
    digBox.style.display = "block";
    typeWriter();
    digClkCnt = 1;
    }
}

// add hovering on seller effect like that in fate

function animate(){

    // console.log(display);
    // console.log(last_click);
    // console.log(clearHalf);
    // console.log(disable_inventory_click);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log('cursor_drawn(after)', cursor_drawn_after);
    // console.log('cursor_drawn(before)', cursor_drawn_before);
    potionBlue();
    potionRed();
    camera();
    bottle();

    //clearHalf is used to distinct b/w your vs. your + seller's inventory displays
    if(clearHalf == 1){
        writeStuff();
    }
        cake2();
        cake3();
    if(clearHalf == 0)
        writeMoney();
        //instead of writeStuff(); display something else like buying options. 
        // console.log('cursor_drawn : ', cursor_drawn);
        
    requestAnimationFrame(animate);
}
animate();



















//REPLACE DETAILS BOX WITH ROCKET ANIMATION FOR "OUTER SPACE" -done-





//ROCKET ANIMATION
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const center2 = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
}

const allParticles2 = [];

// var run = 0;

class particles2{
    constructor(){
        this.x = cord.x + 50;
        this.y = cord.y + 100;
        this.size = Math.random()*7 + 1;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5;
    }
    update2(){
        this.speedX -= 0.01;
        this.speedY += 0.01;
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.01;
    }
    //circle
    // draw2(){
    //     ctx2.beginPath();
    //     ctx2.fillStyle = '#ea6d00';
    //     ctx2.arc(this.x, this.y, this.size, 0, Math.PI*2);
    //     ctx2.fill();
    //     ctx2.closePath();
    // }

    //square pixels
    draw2(){
        ctx2.beginPath();
        ctx2.fillStyle = '#ea6d00';
        ctx2.fillRect(this.x, this.y, this.size, this.size);
        ctx2.closePath();
    }
}

//IMPROVE THE ROCKET-ARRAY CODE -done...?-
//the array is useless now. IMPORTANT -done-
var oneRocket;

const cord = {
    x : undefined,
    y : undefined,
}

class Rocket{
    constructor(){
        this.x = center2.x - 500;
        this.y = center2.y + 200;
        cord.x = this.x;
        cord.y = this.y;
        this.speedX = -1.0;
        this.speedY = 1.0;
    }
    updateR(){
        this.speedX += 0.02;
        this.speedY -= 0.02;
        this.x += this.speedX;
        this.y += this.speedY;
        cord.x = this.x;
        cord.y = this.y;
    }
    drawR(){
        var img = document.getElementById('rocket');
        ctx2.beginPath();
        ctx2.drawImage(img, this.x, this.y, 150, 150 * img.height / img.width);
        ctx2.closePath();
    }
}

//why does rocket move fast on clicking it continuously ? -done-
function generateRocket(){
    oneRocket = new Rocket();
}
generateRocket();

function drawRocket(){
    oneRocket.updateR();
    oneRocket.drawR();
}
//drawRocket();
   

function generate2(){
    for(let i=0; i<5; i++){
        allParticles2.push(new particles2());
    }
}
//generate2();

function drawParticles2(){
    for(let i=0; i<allParticles2.length; i++){
        allParticles2[i].update2();
        allParticles2[i].draw2();
        if(allParticles2[i].size <= 0.3){
            allParticles2.splice(i, 1);
            i--;
        }
    }
}
//drawParticles2();


function run_rocket(){
    // console.log('i center...');
    if(clicked == 0){
    animate2();
    animate3();
    clicked = 1;
    }
}

function animate2(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    generate2();
    drawParticles2();
    requestAnimationFrame(animate2);
}
// animate2();

function animate3(){
    drawRocket();
    requestAnimationFrame(animate3);
}
// animate3();






var close2 = document.getElementsByClassName('close2')[0];
close2.onclick = function() { 
    windowPop.style.display = 'none';
    pyramid_window.style.display = 'none';
    computer_window.style.display = 'none';
    alien_window.style.display = 'none';
    space_window.style.display = 'none';
}
var enter = document.getElementsByClassName('enter')[0];
enter.onclick = function() { 
    // console.log('i enter...');
    window.alert("Comming Soon !");
}

var windowPop = document.getElementById('window');

var image = document.getElementById('pyramid');
var orImage = document.getElementById('pyramidWind');
var pyramid_window = document.getElementById('pyramid_window');
image.onclick = function(e) {
    windowPop.style.display = 'block';
    pyramid_window.style.display = 'block';
}
orImage.onclick = function(e) {
    windowPop.style.display = 'block';
    pyramid_window.style.display = 'block';
}




var computer_window = document.getElementById('computer_window');
var alien = document.getElementById('alien');
alien.onclick = function(e) {
    windowPop.style.display = 'block';
    computer_window.style.display = 'block';
}

var alien_window = document.getElementById('alien_window');
var computer_on = document.getElementById('computer_on');
computer_on.onclick = function(e) {
    windowPop.style.display = 'block';
    alien_window.style.display = 'block';
}



