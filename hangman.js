const fs = require('fs');
var Word = require('./word');
var getWord = require('./getWord');
var inquirer = require('inquirer');
var clear = require("clear");

var hangmanimg = [

`      
       _|_
 _____|   |_
|           |
|___________|`,
` 
        |
       _|_
 _____|   |_
|           |
|___________|`,
`
        |
        |
       _|_
 _____|   |_
|           |
|___________|`,
`
        |
        |
        |
       _|_
 _____|   |_
|           |
|___________|`,
` 
        |
        |
        |
        |
       _|_
 _____|   |_
|           |
|___________|`,

` 
    +---+
        |
        |
        |
        |
       _|_
 _____|   |_
|           |
|___________|`,


  ` 
    +---+
    |   |
        |
        |
        |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
        |
        |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
    |   |
        |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
   /|   |
        |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
        |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
   /    |
       _|_
 _____|   |_
|           |
|___________|`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
       _|_
 _____|   |_
|           |
|___________|`

]





  clear();
  console.log(`
                                WELCOME TO

  ██╗  ██╗  █████╗  ███╗   ██╗  ██████╗  ███╗   ███╗  █████╗  ███╗   ██╗
  ██║  ██║ ██╔══██╗ ████╗  ██║ ██╔════╝  ████╗ ████║ ██╔══██╗ ████╗  ██║
  ███████║ ███████║ ██╔██╗ ██║ ██║  ███╗ ██╔████╔██║ ███████║ ██╔██╗ ██║
  ██╔══██║ ██╔══██║ ██║╚██╗██║ ██║   ██║ ██║╚██╔╝██║ ██╔══██║ ██║╚██╗██║
  ██║  ██║ ██║  ██║ ██║ ╚████║ ╚██████╔╝ ██║ ╚═╝ ██║ ██║  ██║ ██║ ╚████║
  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝  ╚═════╝  ╚═╝     ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝

                                                \n
  Type lifeline for using lifelines                                    `);
  // Call choose category function
var filesData = getWord();
if (!Array.isArray(filesData)) {
  console.log(filesData);
  return;
}
var username = {
  type: 'input',
  name: 'username',
  message: 'Enter Your Name',
  default: true
};

var beginning = {
  type: 'confirm',
  name: 'start',
  message: 'Ready to start?',
  default: true
};

var question = {
  type: 'input',
  name: 'letter',
  message: 'Guess a letter!',
  validate: function validateSingleString(name) {
    return  name.toUpperCase().charCodeAt(0) >= 65 && name.toUpperCase().charCodeAt(0) <= 90;
  }
}

var usedLifeLine = [];
var numOfLevels = 10;
var currentLevel = 0;
var categoryHints;
var randomIndex;
var randomIndexList = [];
var strUsername;
var currentWords;
var currentWord;
var currentWordObject;
var guessesRemaining;
var wordsRemaining;
var lettersGuessed;
var lettersRemaining;
var currentCategory;
var avalaibleCharacter = [];
var score = 0;

// Possible words split into categories
var wordsGuardians = filesData[0];
var wordsMatrix = filesData[2];
var wordsBlade = filesData[4];

var wordsGuardiansHint = filesData[1];
var wordsMatrixHint = filesData[3];
var wordsBladeHint = filesData[5];

class Hangman {
  constructor(count) {
    this.word = '';
    this.wordToGuess = {};
    this.guessRemain = count;
    this.numOfGuessed = 0;
    this.current = '';
  }
  start() {
      inquirer.prompt(beginning).then(answers => {
      if(answers.start){
        this.askName();
      } else {
        console.log('Run "Node hangman.js" again when you are ready!')
      }
    })
  }
  askName(){
    inquirer.prompt(username).then(answers => {
      if (answers.username.length > 0) {
        strUsername = answers.username;
        // this.ask();
        this.chooseCategory();
      }else{
        this.askName();
      }
    })
  }
   chooseCategory() {
    // Initialize global variables
    currentWords = [];
    currentCategory = "";

    // Prompt user to choose category
    inquirer.prompt([
      {
        type: "list",
        name: "category",
        message: "Please choose a category: ",
        choices: ["Countries", "Sports", "Human body"]
      }
    ]).then(function(response) {
      // Logic for calling chooseWord function depending on user choice
      switch (response.category) {
        case "Countries":
          currentCategory = "Countries";
          game.chooseWord(wordsGuardians,wordsGuardiansHint);
          break;
        case "Sports":
          currentCategory = "Sports";
          game.chooseWord(wordsMatrix,wordsMatrixHint);
          break;
        case "Human body":
          currentCategory = "Human body";
          game.chooseWord(wordsBlade,wordsBladeHint);
          break;
      }
    });
  }
  ask() {
    // clear();
    inquirer.prompt(question).then(answers => {
      var guessedLetter = answers.letter.toLowerCase();
      // console.log(guessedLetter)
      if(guessedLetter == "lifeline"){
          this.lifeline();
      }else{        
        this.judge(guessedLetter);
      }
    })
  }

  chooseWord(category,categoryHint){
    currentWord = "";
    currentWords = category.slice();
    categoryHints = categoryHint.slice();
    // for (let nol of numOfLevels) {
    for (var i = numOfLevels - 1; i >= 0; i--) {
      var temRan = Math.floor(Math.random() * currentWords.length);
      if (randomIndexList.indexOf(temRan) > -1) {
        i++;
        continue;
      }
      randomIndexList.push(temRan);
    }
    avalaibleCharacter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    // console.log(randomIndexList);
    currentWord = currentWords[randomIndexList[currentLevel]];
    currentWord = currentWord.toLowerCase();
    // console.log(currentWord);
    this.word = currentWord
    this.wordToGuess = new Word(this.word);
    this.wordToGuess.initialize();
    this.ask();
  }
  switchWord(){
   var ptnlvl = currentLevel+1;
   if (ptnlvl > numOfLevels) {
    console.log("You win! Start Over.\n user:"+strUsername+"\n lifelines Used: "+usedLifeLine.join(',')+"\n Score: "+currentLevel);
    // fs.appendFileSync('message.txt', 'user:'+strUsername+', lifelines Used: '+usedLifeLine.join(',')+'\n');
    fs.appendFileSync('message.txt', 'user:'+strUsername+', lifelines Used: '+usedLifeLine.join(',')+', Score: '+(currentLevel)+', Win \n');
    return true;
   }
   avalaibleCharacter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
   console.log("Level "+ptnlvl);
   currentWord = currentWords[randomIndexList[currentLevel]];
   currentWord = currentWord.toLowerCase();
   // console.log(currentWord);
   game.word = currentWord
   game.wordToGuess = new Word(game.word);
   game.wordToGuess.initialize();
   game.ask(); 
  }

  judge(guessedLetter) {
    this.current = this.wordToGuess.wordProcess(guessedLetter);
    if (this.wordToGuess.isThisGuessRight === false && this.numOfGuessed !== this.wordToGuess.guessedList.length) {
      this.guessRemain -= 1;;
    }
    

    const indexRm = avalaibleCharacter.indexOf(guessedLetter);
    if (indexRm > -1) {
      avalaibleCharacter[indexRm]='_';
    }
    this.numOfGuessed = this.wordToGuess.guessedList.length;
    clear();
    var ptnlvl = currentLevel+1;
    console.log("Level "+ptnlvl);
    console.log("Remaining Characters: "+avalaibleCharacter.join(', '));
    console.log(this.current);
    console.log("Remaining guesses: " + this.guessRemain);
    // for (var i = 0; i <= 10-this.guessRemain - 1; i++) {
            console.log(hangmanimg[12-this.guessRemain]);
    // }
    if (this.wordToGuess.allGuessed === true) {
      if (currentLevel+1 == numOfLevels) {
        console.log("You win! Start Over.\nuser:"+strUsername+"\nlifelines Used: "+usedLifeLine.join(',')+"\nScore: "+currentLevel);
        fs.appendFileSync('message.txt', 'user:'+strUsername+', lifelines Used: '+usedLifeLine.join(',')+', Score: '+currentLevel+', Win \n');
        // var game = new Hangman(10);
        // return game.start();
        return 1;
      }else{
        currentLevel+=1;
        this.switchWord();
        return 1;
      }
    } 
    if (this.guessRemain > 0) {
      this.ask();
    } else {
      var aptxt = currentLevel-1;
      console.log("user:"+strUsername+"\nlifelines Used: "+usedLifeLine.join(',')+"\nScore: "+currentLevel);
      fs.appendFileSync('message.txt', 'user:'+strUsername+', lifelines Used: '+usedLifeLine.join(',')+', Score: '+currentLevel+', Lose \n');
      // fs.appendFileSync('message.txt', 'user:'+strUsername+' Game Over \n');
      console.log("No guess remains. Start Over.");
      console.log("Correct Answer: " + this.word);
      console.log(strUsername);
      // var game = new Hangman(10);
      // game.start();
      console.log('Run "Node hangman.js" again when you are ready!')
    }
  }

  lifeline(){
    // Prompt user to choose category
    inquirer.prompt([
      {
        type: "list",
        name: "lifelines",
        message: "Please choose a lifeline: ",
        choices: ["Hint", "Next Word", "reveal vowels"]
      }
    ]).then(function(response) {
      if (usedLifeLine.indexOf(response.lifelines) > -1) {
          console.log(response.lifelines+" lifeline already used");
          game.ask();
      }else{
        usedLifeLine.push(response.lifelines)
      switch (response.lifelines) {
        case "Hint":
          console.log(categoryHints[randomIndexList[currentLevel]]);
          game.ask();
          break;
        case "Next Word":
          // game.chooseCategory();
          currentLevel+=1;
          game.switchWord();
          break;
        case "reveal vowels":
          game.revealVowels();
          game.ask();
          break;
      }
    }
    });
  }

  revealVowels(){
      let vowels = ['a','e','i','o','u'];
      for (let vowelletter of vowels) {
        game.current = game.wordToGuess.wordProcess(vowelletter);
      }
      console.log(this.current);
  }
}

var game = new Hangman(12);
game.start();
