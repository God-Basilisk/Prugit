
let wallet = 1000;
let black = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

//initialize the wallet value in the html
document.getElementById('wallet').value = wallet;
console.log("Wallet initialized with: " + wallet);

// Add event listeners to all buttons with data-name attribute
document.querySelectorAll('#tablero [data-name]').forEach(button => {
    button.addEventListener('click', Bet);
    console.log("Added event listener to button with data-name: " + button.dataset.name);
});


//function to calculate the payout based on the bet type, whether the player won, the amount paid, and the current wallet value
function Payout(bet, win, pay, wallet) {
    if(win){
        switch (bet) {
            case Solo:
                wallet += pay*35;
                break;
            case Split:
                wallet += pay*17;
                break;
            case Street:
                wallet += pay*11;
                break;
            case Corner:
                wallet += pay*8;
                break;
            case Line:
                wallet += pay*5;
                break;
            case Dozen:
                wallet += pay*2;
                break;
            case Even:
                wallet += pay;
                break;
            default:
                break;
        }
    }else{
        wallet -= pay;
    }
    return wallet;
}

//function to roll the roulette and determine if the player won based on the bet type, number, and subtype
function Roll(num,type,subtype){
    let RNG = Math.floor(Math.random()*37);
    let win = false;
    switch (type) {
        case "Solo":
            win = num===RNG;
            break;
        case "Split":
            win = num===RNG||num===RNG+1;
            break;
        case "Street":
            win = num===RNG||num===RNG+1||num===RNG+2;
            break;
        case "Corner":
            win = num===RNG||num===RNG+1||num===RNG+3||num===RNG+4;
            break;
        case "Line":
            win = num===RNG||num===RNG+1||num===RNG+2||num===RNG+3||num===RNG+4||num===RNG+5;
            break;
        case "Dozen":
            if(subtype=="1st"){
                win = 0<RNG && RNG<=12;
            }else if(subtype=="2nd"){
                win = 12<RNG && RNG<=24;
            }else if(subtype=="3rd"){
                win = 24<RNG && RNG<=36;
            }
            break;
        case "Even":
            if(subtype=="BLACK"){
                win = black.includes(RNG);
            }else if(subtype=="RED"){
                win = !black.includes(RNG)&&RNG!=0;
            }else if(subtype=="EVEN"){
                win = RNG%2===0 && RNG !== 0;
            }else if(subtype=="ODD"){
                win = RNG%2===1;
            }else if(subtype=="HIGH"){
                win = RNG>18;
            }else if(subtype=="LOW"){
                win = 0<RNG && RNG<=18;
            }
            break;
        default:
            break;
    }
    Result(RNG);
    return win;
}

//function to change the html value of the roulette result to the number rolled and the color of the number rolled
function Result(ans){
    document.getElementById("result").value = ans;
    // Determine the color of the number rolled
    let color = ans===0 ? "GREEN" : (black.includes(ans) ? "BLACK" : "RED");
    document.getElementById("color").value = color;

    let Resultado = document.getElementById("result");
    Resultado.classList.remove("fondo-RED", "fondo-BLACK", "fondo-GREEN");
    Resultado.classList.add("fondo-" + color);
}

//function to start the betting process by determining the type of bet, rolling the roulette, and updating the wallet value
function StartBet(name, pay, num){
    let subtype = name;
    // Determine the type of bet based on the name
    let type = subtype==="1st"||subtype==="2nd"||subtype==="3rd"?"Dozen":subtype==="BLACK"||subtype==="RED"||subtype==="EVEN"||subtype==="ODD"||subtype==="HIGH"||subtype==="LOW"?"Even":name;

    let win = Roll(num, type, subtype);
    wallet = Payout(type,win,pay,wallet);

    document.getElementById("wallet").value = wallet;

}

//function to handle the betting process when a button is clicked, including determining the bet type, rolling the roulette, and updating the wallet value
function Bet(e){
    let boton = e.currentTarget;
    let pay = Number(document.getElementById("pay").value);

    let name = boton.dataset.name;
    let num = Number(boton.dataset.num);
    let prebet = wallet;
    StartBet(name, pay, num);

}




