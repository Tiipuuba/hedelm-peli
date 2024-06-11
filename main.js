window.onload = function() {
    localStorage.setItem('bet', 1)
    localStorage.setItem('lockable', false)
}

function changeBet(bet) {
    document.getElementById('currentwager').innerHTML = bet
    localStorage.setItem('bet', bet)

    document.getElementById('potentialpearwin').innerHTML = 3*bet
    document.getElementById('potentialapplewin').innerHTML = 4*bet
    document.getElementById('potentialcherrywin').innerHTML = 5*bet
    document.getElementById('potentialmelonwin').innerHTML = 6*bet
    document.getElementById('potentialsevenwin').innerHTML = 10*bet
}

function lock(button) {

    // Catches cheaters
    if (localStorage.getItem('lockable') === 'false') {
        alert('Et voi lukita tällä kierroksella.')
        return;
    }
    // Locks and opens lockbuttons. Also changes picture.
    if (localStorage.getItem(`locklot${button}`) === 'closed') {
        document.getElementById(`locklot${button}`).src = "art/lock_open.png";
        localStorage.setItem(`locklot${button}`, 'open')
    } else {
        document.getElementById(`locklot${button}`).src = "art/lock_closed.png";
        localStorage.setItem(`locklot${button}`, 'closed')
    }
    
}

function play() {
    const bet = localStorage.getItem('bet')
    
    if (document.getElementById('moneytotal').innerHTML >= parseFloat(bet)) {
        document.getElementById('moneytotal').innerHTML -= bet
    } else {
        alert('Ei tarpeeksi rahaa!')
    }
    // Opens lock lane for use
    if (localStorage.getItem('lockable') === 'false') {
        localStorage.setItem('lockable', true)

        document.getElementById(`locklot1`).src = "art/lock_open.png";
        document.getElementById(`locklot2`).src = "art/lock_open.png";
        document.getElementById(`locklot3`).src = "art/lock_open.png";
        document.getElementById(`locklot4`).src = "art/lock_open.png";
        localStorage.setItem(`locklot1`, 'open')
        localStorage.setItem(`locklot2`, 'open')
        localStorage.setItem(`locklot3`, 'open')
        localStorage.setItem(`locklot4`, 'open')
    }

    const i = crank()
    const u = checkWin()

    if (i === true || u === true) {
        localStorage.setItem('lockable', false)

        document.getElementById(`locklot1`).src = "art/lock_unavailable.png";
        document.getElementById(`locklot2`).src = "art/lock_unavailable.png";
        document.getElementById(`locklot3`).src = "art/lock_unavailable.png";
        document.getElementById(`locklot4`).src = "art/lock_unavailable.png";
        localStorage.setItem(`locklot1`, 'closed')
        localStorage.setItem(`locklot2`, 'closed')
        localStorage.setItem(`locklot3`, 'closed')
        localStorage.setItem(`locklot4`, 'closed')
    }

}

function crank() {

    var wasClosed = false

    for (var i = 0; i< 4; i++) {
        const num = Math.floor(Math.random() * ((5 - 1) + 1) + 1)

        if (localStorage.getItem(`locklot${i+1}`) === 'closed') {
            var wasClosed = true
            continue;
        }

        switch (num) {
            case 1:
                document.getElementById(`lot${i+1}`).src = "art/pear.png";
                localStorage.setItem(`slot${i+1}`, 1)
                break;
            case 2:
                document.getElementById(`lot${i+1}`).src = "art/apple.png";
                localStorage.setItem(`slot${i+1}`, 2)
                break;
            case 3:
                document.getElementById(`lot${i+1}`).src = "art/cherry.png";
                localStorage.setItem(`slot${i+1}`, 3)
                break;
            case 4:
                document.getElementById(`lot${i+1}`).src = "art/melon.png";
                localStorage.setItem(`slot${i+1}`, 4)
                break;
            case 5:
                document.getElementById(`lot${i+1}`).src = "art/seven.png";
                localStorage.setItem(`slot${i+1}`, 5)
                break;
        }
    }
    return wasClosed 
}

function checkWin() {
    const one = localStorage.getItem(`slot1`)
    const two = localStorage.getItem(`slot2`)
    const three = localStorage.getItem(`slot3`)
    const four = localStorage.getItem(`slot4`)

    const wager = document.getElementById('currentwager').innerHTML
    const current = parseInt(document.getElementById('moneytotal').innerHTML)

    //If there is whole row
    if (one === two && two === three && three === four) {
        
        switch (parseInt(one)) {
            case 1:
                document.getElementById('moneytotal').innerHTML = current + parseInt((3*wager));
                document.getElementById('lastwin').innerHTML = parseInt((3*wager));
                return true;
            case 2:
                document.getElementById('moneytotal').innerHTML = current + parseInt((4*wager));
                document.getElementById('lastwin').innerHTML = parseInt((4*wager));
                return true;
            case 3:
                document.getElementById('moneytotal').innerHTML = current + parseInt((5*wager));
                document.getElementById('lastwin').innerHTML = parseInt((5*wager));
                return true;
            case 4:
                document.getElementById('moneytotal').innerHTML = current + parseInt((6*wager));
                document.getElementById('lastwin').innerHTML = parseInt((6*wager));
                return true;
            case 5:
                document.getElementById('moneytotal').innerHTML = current + parseInt((10*wager));
                document.getElementById('lastwin').innerHTML = parseInt((10*wager));
                return true;
        }
    }

    //If there is 2 or 3 sevens
    let sevens = 0

    if (one === "5") {
        sevens++
    }
    if (two === "5") {
        sevens++
    }
    if (three === "5") {
        sevens++
    }
    if (four === "5") {
        sevens++
    }

    if (sevens === 3) {
        document.getElementById('moneytotal').innerHTML = current + parseInt(5*wager);
        document.getElementById('lastwin').innerHTML = parseInt(5*wager);
        return true;
    } else if (sevens === 2) {
        document.getElementById('moneytotal').innerHTML = current + parseInt(2*wager);
        document.getElementById('lastwin').innerHTML = parseInt(2*wager);
        return true;
    }

    // If every slot is different
    if (one !== two && two !== three && three !== four && four !== one && one !== three) {
        document.getElementById('moneytotal').innerHTML = current + parseInt(2*wager);
        document.getElementById('lastwin').innerHTML = parseInt(2*wager);
        return true;
    }
    // If first one is pear
    if (one === "1") {
        document.getElementById('moneytotal').innerHTML = current + parseInt(wager);
        document.getElementById('lastwin').innerHTML = parseInt(wager);
        return true;
    }
}