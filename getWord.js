const fs = require('fs');

var getWord = function selectRandomWordFromDataBase () {
 	var data = fs.readFileSync('./words.txt', 'utf8');

var catH1 = fs.readFileSync('category_files/categoryOneHints.txt', 'utf8');
var  catH1Data =  catH1.split("\n");
  var catH1Datalen = catH1Data.length;

var cat1 = fs.readFileSync('category_files/categoryOneWords.txt', 'utf8');
var cat1Data  = cat1.split("\n");
  var cat1Datalen = cat1Data.length;

var catH2 = fs.readFileSync('category_files/categoryTwoHints.txt', 'utf8');
var  catH2Data =  catH2.split("\n");
  var catH2Datalen = catH2Data.length;

var cat2 = fs.readFileSync('category_files/categoryTwowords.txt', 'utf8');
var cat2Data  = cat2.split("\n");
  var cat2Datalen = cat2Data.length;

var catH3 = fs.readFileSync('category_files/categoryThreeHints.txt', 'utf8');
var  catH3Data =  catH3.split("\n");
  var catH3Datalen = catH3Data.length;

var cat3 = fs.readFileSync('category_files/categoryThreeWords.txt', 'utf8');
var cat3Data  = cat3.split("\n");
  var cat3Datalen = cat3Data.length;

var warnMsg = "";
if (catH1Datalen != cat1Datalen) {
	warnMsg = "length of category 1 and hint does not match";
}

if (catH2Datalen != cat2Datalen) {
	warnMsg = "length of category 2 and hint does not match";
}

if (catH3Datalen != cat3Datalen) {
	warnMsg = "length of category 3 and hint does not match";
}
if (warnMsg != "") {
	return warnMsg;
}else{
	var allData = [cat1Data, catH1Data, cat2Data, catH2Data,  cat3Data, catH3Data];
	return allData;
}

  // var data = fs.readFileSync('./words.txt', 'utf8');
  // var wordList = data.split("\n");
  // var len = wordList.length;
  // var randomNum = randomSelect(len);
  // return wordList[randomNum];

}

function randomSelect(len) {
  return Math.floor(Math.random() * (len - 1));
}

module.exports = getWord;
