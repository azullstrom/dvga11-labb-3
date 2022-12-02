'use strict';

window.addEventListener('load', () => {
    document.querySelector('#add').addEventListener('click', () => {
        document.querySelector('#home-page').classList.add('d-none');
        document.querySelector('#add-page').classList.remove('d-none');
    });

    document.querySelector('#receipt').addEventListener('click', () => {
        document.querySelector('#home-page').classList.add('d-none');
        document.querySelector('#receipt-page').classList.remove('d-none');
    });

    document.querySelector('#receipt-return').addEventListener('click', () => {
        document.querySelector('#receipt-page').classList.add('d-none');
        document.querySelector('#home-page').classList.remove('d-none');
    });

    document.querySelector('#return').addEventListener('click', () => {
        document.querySelector('#add-page').classList.add('d-none');
        document.querySelector('#home-page').classList.remove('d-none');
    });
    
    let rindex = 0;
    document.querySelector('#send-button').addEventListener('click', () => {
        let selection = document.querySelector('#table-select');
        let tempSelect = document.querySelector('#modal-title');
        let receiptItems = document.querySelector('#receipt-items');
        let items = document.querySelector('#cart-modal>div>div>.modal-body>ol');
        if(!items.hasChildNodes()) {
            alert('Lägg till varor innan du kan skicka till restaurangen.');
            return;
        }
        let totalPrice = document.querySelector('#total-cost>p>strong').innerHTML;

        selection.value = "Välj bord";
        receiptItems.appendChild(document.createElement('div'));

        for(let i = 0; i < items.childNodes.length; i++) {
            let lastChildItems = items.children[i];
            let lastGrandChildItems = lastChildItems.lastChild;
            if(lastGrandChildItems.getAttribute('id', 'p')) {
                let middleGrandChild = lastChildItems.children[1];
                middleGrandChild.remove();
            } else {
                lastGrandChildItems.remove();
            }
        }

        rindex++;
        $(receiptItems.lastChild).append('<p>' 
            + '<a class="btn btn-primary mt-2" data-toggle="collapse" href="#rcollapse-' + rindex + '" role="button" aria-expanded="false" aria-controls="rcollapse-' + rindex + '">' 
            + tempSelect.innerHTML
            + '</a></p>'
        );
        $(receiptItems.lastChild).append('<div class="collapse" id="rcollapse-' + rindex + '">' 
            + '<div class="card card-body">' 
            + items.outerHTML
            + '<strong id=receipt-strong-' + rindex + '>Totalt: ' + totalPrice + ' kronor</strong>'
            + '<button id="receipt-send-' + rindex + '" class="btn btn-primary">Skriv ut kvitto</button>'
            + '</div></div></div>'
        );

        document.querySelector('#receipt-send-' + rindex).addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            let grandParent = parent.parentNode;
            let grandGrandParent = grandParent.parentNode;
            grandGrandParent.remove();
            document.querySelector('#home-page').classList.remove('d-none');
            document.querySelector('#receipt-page').classList.add('d-none');
        });

        let badge = document.querySelector('#cart-badge');
        badge.innerText = 0;
        $(items).html("");
        total = 0;
        let totalText = document.querySelector('#cart-modal>div>div>.modal-body>div>p');
        totalText.innerHTML = "Totalt:";

        document.querySelector('#add-page').classList.add('d-none');
        document.querySelector('#home-page').classList.remove('d-none');
    });

    let index = 0;
    let liIndex = 0;
    for(let section in menu) {
        index++;
        $('#section-' + index).append('<li class="list-group-item list-group-item-dark">' 
            + '<h3>' 
            + section + ' <i class="bi bi-caret-down-square-fill float-end" data-toggle="collapse" role="button" aria-expanded="false"></i>' 
            + '</h3>' 
            + '</li>'
        );
        for(var itemindex in menu[section]) {
            liIndex++;
            var item = menu[section][itemindex];
            $('#collapse-' + index + '>div').append('<li id="li-' + liIndex + '" class="list-group-item list-group-item-dark">' 
            + '<strong class="item-title">' 
            + item['name'] + ' ' + item['price'] + ':-</strong>' 
            + '<br>'
            + '</li>'
            );
            for(var cindex in item['contents']) {
                if(item['contents'][cindex].includes("a:")) {
                    let strongItem = item['contents'][cindex].replace('a:', '');
                    $('#collapse-' + index + '>div>#li-' + liIndex).append('<strong>' + strongItem + ' </strong>');
                } else {
                    $('#collapse-' + index + '>div>#li-' + liIndex).append(item['contents'][cindex] + ' ');
                }
            }
            $('#collapse-' + index + '>div').append('<br>');
        } 
    } 

    let allDropDown = document.querySelectorAll('li>h3>.bi');
    for(let i = 0; i < allDropDown.length; i++) {
        allDropDown[i].setAttribute('id', 'drop-down-' + (i+1));
        allDropDown[i].setAttribute('href', '#collapse-' + (i+1));
        allDropDown[i].setAttribute('aria-controls', 'collapse-' + (i+1));
    }

    let allItems = document.querySelectorAll('ol>div>div>li');
    for(let i = 0; i < allItems.length; i++) {
        allItems[i].addEventListener('click', (e) => {
            toggleItem(e);
        });
        $(allItems[i]).append('<li class="list-group-item list-group-item-secondary d-none">'
            + '<button class="btn btn-secondary w-25">' 
            + '<i class="bi bi-plus"></i>' 
            + '</button>'
            + '<input class="text-black w-75" type="text" placeholder="Särskilda önskemål">' 
            + '</li>'
        );
    }

    let allItemsBtn = document.querySelectorAll('ol>div>div>li>li>button');
    for(let i = 0; i < allItemsBtn.length; i++) {
        allItemsBtn[i].addEventListener('click', (e) => {
            let tableSelect = document.querySelector('#table-select');
            if(tableSelect.value != 'Välj bord') {
                let modalTitle = document.querySelector('#modal-title');
                modalTitle.innerText = tableSelect.options[tableSelect.selectedIndex].text;
                let badge = document.querySelector('#cart-badge');
                let badgeNumber = parseInt(badge.innerText);
                badgeNumber++;
                badge.innerText = badgeNumber;
                addItem(e);
            }
            else {
                alert('Du måste välja bord innan varor kan läggas till.');
            }
        });
        allItemsBtn[i].setAttribute('id', 'item-button-' + (i+1));
    }
});

function toggleItem(e) {
    if(e.target.getAttribute('class') != "list-group-item list-group-item-secondary" 
    && e.target.getAttribute('class') != 'bi bi-plus' 
    && e.target.getAttribute('class') != null
    && e.target.getAttribute('class') != 'btn btn-secondary w-25'
    && e.target.getAttribute('class') != 'text-black w-75') {
        if(e.target.getAttribute('class') != 'item-title') {
            e.target.classList.toggle('list-group-item-dark');
            e.target.classList.toggle('list-group-item-primary');
        }
        else if(e.target.getAttribute('class') == 'item-title') {
            let parent = e.target.parentNode;
            parent.classList.toggle('list-group-item-dark');
            parent.classList.toggle('list-group-item-primary');
        }
    }

    if(e.target.getAttribute('class') == 'list-group-item list-group-item-dark') {
        e.target.lastChild.classList.add('class', 'd-none');
    }
    else if(e.target.getAttribute('class') == 'list-group-item list-group-item-primary') {
        e.target.lastChild.classList.remove('class', 'd-none');
    } 
    else if(e.target.parentNode.getAttribute('class') == 'list-group-item list-group-item-dark') {
        let parent = e.target.parentNode;
        let lastChild = parent.lastChild;
        lastChild.classList.add('class', 'd-none');
    } 
    else if(e.target.parentNode.getAttribute('class') == 'list-group-item list-group-item-primary') {
        let parent = e.target.parentNode;
        let lastChild = parent.lastChild;
        lastChild.classList.remove('class', 'd-none');
    } 

}

let removeIndex = 0;
function addItem(e) {
    if(e.target.getAttribute('class') == 'btn btn-secondary w-25') {
        let cartItems = document.querySelector('#cart-modal>div>div>.modal-body>ol');
        let parent = e.target.parentNode;
        let grandParent = parent.parentNode;
        parent.classList.add('class', 'd-none');
        grandParent.classList.toggle('list-group-item-dark');
        grandParent.classList.toggle('list-group-item-primary');
        let item = grandParent.firstChild.innerText;
        let wishes = parent.lastChild;
        removeIndex++;

        if(wishes.value != "") {
            $(cartItems).append('<li><strong>' + item + '</strong><i id="minus-' + removeIndex + '" class="bi bi-dash-circle float-end" role="button"></i><p id="p">Särskilda önskemål: <strong>' + wishes.value + '</strong></p></li>');
            wishes.value = "";
        }
        else if(wishes.value == "") {
            $(cartItems).append('<li><strong>' + item + '</strong><i id="minus-' + removeIndex + '" class="bi bi-dash-circle float-end" role="button"></i></li>');
        }

        let totalP;
        let string = item.split(" ");
        if(string.length == 2) {
            let price = string[1].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        } else if(string.length == 4) {
            let price = string[3].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        } else if(string.length == 5) {
            let price = string[4].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        }

        document.querySelector('#minus-' + removeIndex).addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            let firstChild = parent.firstChild.innerHTML;
            let str = firstChild.split(" ");

            let sum;
            if(str.length == 2) {
                sum = str[1].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            } else if(str.length == 4) {
                sum = str[3].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            } else if(str.length == 5) {
                sum = str[4].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            }
        });

    } else if(e.target.getAttribute('class') == 'bi bi-plus') {
        let cartItems = document.querySelector('#cart-modal>div>div>.modal-body>ol');
        let parent = e.target.parentNode;
        let grandParent = parent.parentNode;
        let grandGrandParent = grandParent.parentNode;
        grandParent.classList.add('class', 'd-none');
        grandGrandParent.classList.toggle('list-group-item-dark');
        grandGrandParent.classList.toggle('list-group-item-primary');
        let item = grandGrandParent.firstChild.innerText;
        let wishes = grandParent.lastChild;
        removeIndex++;

        if(wishes.value != "") {
            $(cartItems).append('<li><strong>' + item + '</strong><i id="minus-' + removeIndex + '" class="bi bi-dash-circle float-end" role="button"></i><p id="p">Särskilda önskemål: <strong>' + wishes.value + '</strong></p></li>');
            wishes.value = "";
        }
        else if(wishes.value == "") {
            $(cartItems).append('<li><strong>' + item + '</strong><i id="minus-' + removeIndex + '" class="bi bi-dash-circle float-end" role="button"></i></li>');
        }

        let totalP;
        let string = item.split(" ");
        if(string.length == 2) {
            let price = string[1].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        } else if(string.length == 4) {
            let price = string[3].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        } else if(string.length == 5) {
            let price = string[4].replaceAll(':-', '');
            total += parseInt(price); // Variabel i labb3.js
            totalP = document.querySelector('#total-cost>p');
            totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
        }

        document.querySelector('#minus-' + removeIndex).addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            let firstChild = parent.firstChild.innerHTML;
            let str = firstChild.split(" ");

            let sum;
            if(str.length == 2) {
                sum = str[1].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            } else if(str.length == 4) {
                sum = str[3].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            } else if(str.length == 5) {
                sum = str[4].replaceAll(':-', '');
                total -= sum;
                parent.remove();
                totalP.innerHTML = 'Totalt: <strong>' + total + '</strong> kronor';
                let badge = document.querySelector('#cart-badge');
                let val = parseInt(badge.innerText);
                val--;
                badge.innerHTML = val;
                if(parent.lastChild.getAttribute('id', 'p')) {
                    parent.lastChild.remove();
                }
            }
        });
    }
}