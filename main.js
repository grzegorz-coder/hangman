const game = {
    currentHiddenWord: null,
    currentLetters: null,
    blankShotNumbers: 6,
    hiddenwords: [
        "Gdzie kucharek sześć tam nie ma co jeść", 
        "Baba z wozu koniom lżej", 
        "Bez pracy nie ma kołaczy", 
        "Nie oceniaj ksiązki po okładce",
        "Słowo jest srebrem a milczenie złotem",
        "Kto rano wstaje temu Pan Bóg daje",
        "Darowanemu koniowi w zęby się nie zagląda",
        "Fortuna kołem się toczy",
        "Nie chwal dnia przed zachodem słońca",
        "Lepszy wróbel w garści niż gołąb na dachu",
     ],
    hangmanBox: document.querySelector(".hangman"),
    lettersBox: document.querySelector(".game-letters"),
    hiddenwordBox: document.querySelector(".hiddenword"),
    


    createLetters() {
        const letters = ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k","l","ł","m","n","ń","o","ó","p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"];
        letters.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("game-letter");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.lettersBox.appendChild(button);
            
        });
    },

    ShowShotNumbers() {
        this.hangmanBox.innerText = this.blankShotNumbers;
    },

    enableLetters() {
        const letters = this.lettersBox.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = false);
    },

    disableLetters() {
        const letters = this.lettersBox.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = true);
    },

    gameOver() {
        alert("Game over! The password you are looking for is: \n\n" + this.currentHiddenWord);
        this.disableLetters();  
      },
  
    endGame() {
        alert("Good Job! It's correct password!");
        this.disableLetters();
    },

    checkLettersInHiddenWord(letter) {
        if (this.currentHiddenWord.includes(letter)) {
            const lettersBox = this.hiddenwordBox.querySelectorAll(".game-hiddenword-box");

            for (let i=0; i<this.currentHiddenWord.length; i++) {
                if (this.currentHiddenWord[i] === letter) {
                    lettersBox[i].innerText = letter;
                }
            }

            this.currentHiddenWordLetters = this.currentHiddenWordLetters.replace(new RegExp(letter, "g"), "");

            if(!this.isLetterExists()) {
                this.endGame();
            }
        } else {
            this.blankShotNumbers--;
            this.ShowShotNumbers();

            if (this.blankShotNumbers <=0) {
                this.gameOver();
            }
        }
    },

    isLetterExists() {
        return this.currentHiddenWordLetters.length;
    },

    randomHiddenWord() {
        const max = this.hiddenwords.length-1;
        const min = 0;
        const rand = Math.floor(Math.random()*(max-min+1)+min);

        this.currentHiddenWord = this.hiddenwords[rand].toUpperCase();
        this.currentHiddenWordLetters = this.currentHiddenWord.replace(/ /g, "");
        this.hiddenwordBox.innerText ='';
        const letters = this.currentHiddenWord.split('');
        letters.forEach(letter => {
            const div = document.createElement("div");
            div.classList.add("game-hiddenword-box");
            if (letter === " ") {
                div.classList.add("game-hiddenword-box-space");
        }
        this.hiddenwordBox.appendChild(div);
        })
    },
    bindEvents() {
        this.lettersBox.addEventListener("click", e=> {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("game-letter")) {
                const letter = e.target.dataset.letter;
                this.checkLettersInHiddenWord(letter.toUpperCase());
                e.target.disabled = true;
            }
        });
    },
    startGame(){
        this.blankShotNumbers = 6;
        this.randomHiddenWord();
        this.ShowShotNumbers();
        this.enableLetters();
    },
    createBoard() {
        this.createLetters();
        this.bindEvents();
        this.disableLetters();
    }
    };
    game.createBoard();

    document.querySelector(".game-start").addEventListener("click", () => game.startGame());


    //Metoda istletterexists();
