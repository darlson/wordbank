const fs = require('fs')
const words = require('./v1-5-letter-words.json')
const fewwords = require('./v1.1-short-list.json')
const original = require('./v1.2-isograms-orig.json')
const isograms = require('./v1.3-just-isograms.json')
const freq = require('./v2-20000-words-frequency.json')
const freqshort = require('./v2.1-test-freq.json')
const freqiso = require('./v2.2-freq-isograms.json')

// Language expansion
const deutsch = require('./langs/deutsch.json')
const espanol = require('./langs/espanol.json')
const francais = require('./langs/francais.json')
const italiano = require('./langs/italiano.json')
const norsk = require('./langs/norsk.json')
const dansk = require('./langs/dansk.json')

const deutschOrtho =    ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Ä','Ö','Ü']
const englishOrtho =    ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const espanolOrtho =    ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const francaisOrtho =   ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const italianoOrtho =   ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const norskOrtho =      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Æ','Ø','Å']
const danskOrtho =      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Æ','Ø','Å']

// * Keep:
// Norsk/Dansk: å, ø, æ
// German: ä, ö, ü
// Spanish: ñ

// * Replace:
// German: ß - ss
// French: æ - ae; œ - oe
// Italian: î - ii

// * Normalize:
// French: é, à, è, ù, â, ê, î, ô, û, ë, ï, ü, ÿ, ç
// Spanish: á, é, í, ó, ú, ý, ü
// Italian: é, í, ó, ú, à, è, ì, ò, ù

// test if a given string is an isogram (all unique letters)
function isIsogram(str){
    if (!str) {
        return false
    } else {
        for (i=0; i< str.length; i++){
            // console.log(`from front: letter ${str[i]}`)
            for (j=str.length-1; j>i; j--){
            // console.log(`now checking from back: letter ${str[j]}`)
                if (str[i].toLowerCase() === str[j].toLowerCase()){
                    return false
                }
            }
        } return true
    }
}

function onlyIsograms (json, newFileName) {
    let dif1 = []
    let dif2 = []
    let dif3 = []
    
    for (k=json.length-1; k>=0; k--){
        // console.log(k)
        !(isIsogram(json[k].word)) ? json.splice(k, 1) : (null)
        // (json[k].rank > 1000 && json[k].rank <= 2800 ) ? json[k]["difficulty"] = "1" : (null)
        // (json[k].word.includes(',')) ? json.splice(k, 1) : (null)
        // (json[k].word !== json[k].word.toLowerCase()) ? json.splice(k, 1) : (null)
        // (json[k].word[4] === 'd') ? console.log(json[k].word) : (null)
        // json[k].count =(Math.round(json[k].count))
        // json[k].difficulty === '1' ? dif1.push(json[k]) :
        // json[k].difficulty === '2' ? dif2.push(json[k]) :
        // dif3.push(json[k]) 

    }
        // console.log(dif3)
        console.log(`Diff 1 length is ${dif1.length}`)
        console.log(`Diff 2 length is ${dif2.length}`)
        console.log(`Diff 3 length is ${dif3.length}`)

        const jsonString = JSON.stringify(json)
        fs.writeFile(`./${newFileName}.json`, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    console.log(`JSON length is ${json.length}`)

}

function fiveletters (json, newFileName) {
    console.log(`JSON's original length was ${json.length}`)
    for (x=json.length-1; x>=0; x--){
        (json[x].word.length === 5) ? null : json.splice(x, 1)
    }
    const jsonString = JSON.stringify(json)
    fs.writeFile(`./${newFileName}.json`, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    console.log(`Five-letter JSON length is ${json.length}`)
}


fiveletters(norsk, 'norsk5')

// onlyIsograms(freqiso)

// freqiso[0]["difficulty"] = "1"
// console.log(freqiso[0])

// console.log(`isograms original list length is ${original.length}`)
// console.log(`words length is ${words.length}`)
// console.log()
