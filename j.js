class Transaction {
    constructor(tn, amount, name, receiver_number) {
        this.tn = tn;
        this.amount = amount;
        this.name = name;
        this.receiver_number = receiver_number;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addTransaction(tn, amount, name, receiver_number) {
        const newNode = new Transaction(tn, amount, name, receiver_number);
        if (!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    sortByTN() {
        let swapped;
        do {
            swapped = false;
            let curr = this.head;
            let prev = null;
            while (curr && curr.next) {
                if (curr.tn > curr.next.tn) {
                    let temp = curr.next;
                    curr.next = temp.next;
                    temp.next = curr;
                    if (prev === null) {
                        this.head = temp;
                    } else {
                        prev.next = temp;
                    }
                    prev = temp;
                    swapped = true;
                } else {
                    prev = curr;
                    curr = curr.next;
                }
            }
        } while (swapped);
    }

    sortByAmount() {
        let swapped;
        do {
            swapped = false;
            let curr = this.head;
            let prev = null;
            while (curr && curr.next) {
                if (curr.amount > curr.next.amount) {
                    let temp = curr.next;
                    curr.next = temp.next;
                    temp.next = curr;
                    if (prev === null) {
                        this.head = temp;
                    } else {
                        prev.next = temp;
                    }
                    prev = temp;
                    swapped = true;
                } else {
                    prev = curr;
                    curr = curr.next;
                }
            }
        } while (swapped);
    }

    search(type, value) {
        let current = this.head;
        const result = [];
        while (current) {
            if (
                (type === "tn" && current.tn == value) ||
                (type === "amount" && current.amount == value) ||
                (type === "name" && current.name.toLowerCase() === value.toLowerCase()) ||
                (type === "receiver_number" && current.receiver_number == value)
            ) {
                result.push(current);
            }
            current = current.next;
        }
        return result;
    }

    toArray() {
        let current = this.head;
        const arr = [];
        while (current) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }
}

const list = new LinkedList();

function addTransaction() {
    const tnInput = document.getElementById("tn").value;
    const amountInput = document.getElementById("amount").value;
    const name = document.getElementById("name").value.trim();
    const receiverInput = document.getElementById("receiver_number").value;

 
    if (!tnInput || !amountInput || !name || !receiverInput) {
        alert("Please enter all fields.");
        return;
    }

    const tn = parseInt(tnInput);
    const amount = parseInt(amountInput);
    const receiver_number = parseInt(receiverInput);

   
    if (isNaN(tn)) {
        alert("Transaction Number must be a valid number.");
        return;
    }
    if (isNaN(amount)) {
        alert("Amount must be a valid number.");
        return;
    }
    if (isNaN(receiver_number)) {
        alert("Receiver Number must be a valid number.");
        return;
    }

    
    if (tn < 0 || tn > 9999) {
        alert("Transaction Number must be between 0 and 9999.");
        return;
    }

    let current = list.head;
    while (current) {
        if (current.tn === tn) {
            alert("Transaction Number already exists. Please use a different TN.");
            return;
        }
        current = current.next;
    }

    
    list.addTransaction(tn, amount, name, receiver_number);
    render();
    
  
    document.getElementById("tn").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("name").value = '';
    document.getElementById("receiver_number").value = '';
}

function render(data = list.toArray()) {
    const container = document.getElementById("transactionContainer");
    container.innerHTML = '';
    data.forEach(t => {
        container.innerHTML += `
            <div class="card" 
                 data-tn="${t.tn}" 
                 data-amount="${t.amount}" 
                 data-name="${t.name}" 
                 data-receiver_number="${t.receiver_number}">
                <p><strong>TN:</strong> ${t.tn}</p>
                <p><strong>Amount:</strong> $${t.amount}</p>
                <p><strong>Name:</strong> ${t.name}</p>
                <p><strong>Receiver Number:</strong> ${t.receiver_number}</p>
            </div>
        `;
    });
}

function sortByTN() {
    list.sortByTN();
    render();
}

function sortByAmount() {
    list.sortByAmount();
    render();
}

function search() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const type = document.getElementById('searchType').value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.classList.remove('highlight');
        const rawValue = card.getAttribute('data-' + type);
        if (!input || !rawValue) return;

        if (type === 'tn' || type === 'amount' || type === 'receiver_number') {
            if (parseInt(rawValue) === parseInt(input)) {
                card.classList.add('highlight');
            }
        } else if (type === 'name') {
            if (rawValue.toLowerCase() === input) {
                card.classList.add('highlight');
            }
        }
    });
}