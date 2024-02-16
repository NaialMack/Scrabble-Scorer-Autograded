// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let vowel = ["A", "E", "I", "O", "U"];


function initialPrompt() {
   console.log("Let's play some scrabble!");
   console.log();
   let word = input.question("Enter a word to score: ");
   return word
};



let simpleScorer = function(word) {
	let letterPoints = word.length;
 
	return letterPoints;
 };

let vowelBonusScorer = function(word) {
   let letterPoints = 0
   word = word.toUpperCase();
   for ( i = 0; i < word.length; i++){
      if (!vowel.includes(word[i])){
         letterPoints = letterPoints + 1 
      } else {
         letterPoints = letterPoints + 3
      }
   }return letterPoints
};

let scrabbleScorer = function (word){
   word = word.toLowerCase();
   let letterPoints = 0
   for (let i = 0; i < word.length; i++){
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
      },
  {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
      },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log("Which scoring algorithm would you like to use?");
   console.log();
   console.log("0 -", scoringAlgorithms[0].name,":"," One point per character" );
   console.log("1 -", scoringAlgorithms[1].name,":"," Vowels are worth 3 points");
   console.log("2 -", scoringAlgorithms[2].name,":"," Uses scrabble point system");
   let selectedAlgorithm = Number(input.question("Enter 0, 1 or 2:"));
   // selectedAlgorithm = Number(selectedAlgorithm);
   return scoringAlgorithms[selectedAlgorithm];
}

function transform(oldPointStructure) {
   let newPointStructure = {};

 
      for (const pointValue in oldPointStructure) {
         let letters = oldPointStructure[pointValue];
         for (let i = 0; i < letters.length; i ++){
         let lowerCaseletters = letters[i].toLowerCase();
         newPointStructure[lowerCaseletters] = Number(pointValue);
      }
      }
      return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);



function runProgram() {
         let word = initialPrompt()
         let algorithm = scorerPrompt()
console.log(`Score for '${word}': ${algorithm.scorerFunction(word)}`);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
