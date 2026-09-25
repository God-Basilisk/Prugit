
let wallet;
let black = [2,4,6,8,10,11,13,17,20,22,24,26,28,29,31,33,35];

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
    }
    wallet -= pay;
    return wallet;
}

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
            win = num===RNG||num===RNG+1||num===RNG+3||num===RNG+5;
            break;
        case "Line":
            win = num===RNG||num===RNG+1||num===RNG+2||num===RNG+3||num===RNG+4||num===RNG+5;
            break;
        case "Dozen":
            if(subtype=="1st"){
                win = 0<RNG && RNG<=12;
            }else if(subtype=="2nd"){
                win = 12<RNG && RNG<=24
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
                win = 0<RNG<=18;
            }
            break;
        default:
            break;
    }
    return win;
}
