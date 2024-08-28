let images = ["/images/apple.jpg", "/images/amazon.jpg", "/images/facebook.jpg", "/images/google.png", "/images/microsoft.png", "/images/samsung.png", "/images/apple.jpg", "/images/amazon.jpg", "/images/facebook.jpg", "/images/google.png", "/images/microsoft.png", "/images/samsung.png"];

let numCard = 12;
let matched = 0;
let opened = 0;
let openedCards = [];
let moves = 0;

startTheGame();

let result = document.querySelector(".result");

function startTheGame() {

    for (let i = 0; i < numCard; i++) {

        let front = document.createElement("div");
        let back = document.createElement("div");
        let card = document.createElement("div");
        card.classList.add("card");
        front.classList.add("front");
        back.classList.add("back");
        card.append(front);
        card.append(back);
        document.querySelector(".cards").append(card);

    }


    let cards = document.querySelectorAll(".cards .card");
    let back = document.querySelectorAll(".cards .card .back");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        randomImages();
    }

    function randomImages() {
        for (let i = 0; i < back.length; i++) {

            back[i].style.backgroundImage = `url(${images[i]})`;
            back[i].setAttribute("image-type", images[i].slice(8, images[i].indexOf(".")));
            back[i].style.backgroundPosition = "center";
            back[i].style.backgroundSize = "cover";
            back[i].style.transform = "rotateY(180deg)";
        }
    }

    shuffleArray(images);

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (card.classList.contains("opened")) {
                return false;
            } else {

                opened += 1;
                if (opened > 2) {
                    return false;
                } else {

                    card.style.transform = "rotateY(180deg)";
                    card.style.transition = "all 1s";
                    card.classList.add("opened");
                    openedCards.push(card);
                }
                if (opened === 2) {
                    setTimeout(() => {
                        checkMatch(openedCards);
                    }, 2000);
                    moves += 1;
                }
            }
        });
    });
}

function checkMatch(openedCards) {



    function isEven(number) {
        return number % 2 === 0;
    }

    let newCards = [];
    if (isEven(openedCards.length)) {
        newCards = openedCards.slice(openedCards.length - 2, openedCards.length);
    }

    let children = [];

    if (newCards[0] !== undefined && newCards[1] !== undefined) {

        for (let i = 0; i < newCards.length; i++) {

            if (children.length < 2) {
                children.push(newCards[i].querySelector(".back"));
            }
        }
    }


    for (let i = 0; i < children.length; i++) {

        if (children[0].getAttribute("image-type") === children[1].getAttribute("image-type")) {

            newCards[i].textContent = "";
            matched += 1;
            openedCards = [];
            if (matched === 12) {
                showResult(moves);
            }
            opened = 0;
        }
        else {
            newCards[i].style.transform = "rotateY(0deg)";
            newCards[i].classList.remove("opened");
            opened = 0;
        }
    }
}



function showResult(moves) {
    let createElement = document.createElement("h3");
    createElement.textContent = `Congratulation You Got it 6/${moves}`;
    let input = document.createElement("input");
    input.type = "submit";
    input.value = "Start Again";
    result.appendChild(createElement);
    result.appendChild(input);
    input.onclick = restart;
}

function restart() {
    matched = 0;
    moves = 0;
    document.querySelector(".cards").textContent = "";
    result.textContent = "";
    startTheGame();
}
