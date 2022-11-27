
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
    const SINGLE_SPACE = 1;
    this.maxWidth = maxWidth;
    this.lineData = new LineData(0, words);
    const fullyJustifiedText = [];

    for (let i = 1; i < words.length; ++i) {

        if (this.lineData.textLength + this.lineData.singleSapcesBetweenWordsLength + SINGLE_SPACE + words[i].length < maxWidth) {
            this.lineData.textLength += words[i].length;
            ++this.lineData.singleSapcesBetweenWordsLength;
            ++this.lineData.endIndexWords;
            continue;
        }
        if (this.lineData.textLength + this.lineData.singleSapcesBetweenWordsLength + SINGLE_SPACE + words[i].length === maxWidth) {
            lineData.textLength += words[i].length;
            ++this.lineData.singleSapcesBetweenWordsLength;
            ++this.lineData.endIndexWords;

            createLine(fullyJustifiedText, words, false);
            this.lineData = new LineData(++i, words);
            continue;
        }
        createLine(fullyJustifiedText, words, false);
        this.lineData = new LineData(i, words);
    }

    if (this.lineData.textLength > 0) {
        createLine(fullyJustifiedText, words, true);
    }
    return fullyJustifiedText;
};

class LineData {

    startIndexWords = 0;
    endIndexWords = 0;
    textLength = 0;
    singleSapcesBetweenWordsLength = 0;

    /**
     * @param {number} index
     * @param {string[]} words
     */
    constructor(index, words) {
        if (index < words.length) {
            this.startIndexWords = index;
            this.endIndexWords = index;
            this.textLength = words[index].length;
            this.singleSapcesBetweenWordsLength = 0;
        }
    }
}

/**
 * @param {string[]} fullyJustifiedText
 * @param {string[]} words 
 * @param {boolean} isLastLine
 * @return {void}
 */
function createLine(fullyJustifiedText, words, isLastLine) {

    let totalSpaceInLine = this.maxWidth - this.lineData.textLength;
    let spaceBetweenWordsWithoutRemainder = 0;
    let totalSpaceRemainder = 0;
    let spaceAfterLastWordInLastLine = 0;
    let numberOfWords = this.lineData.endIndexWords - this.lineData.startIndexWords + 1;

    if (!isLastLine) {
        spaceBetweenWordsWithoutRemainder = (numberOfWords > 1) ? Math.floor(totalSpaceInLine / (numberOfWords - 1)) : totalSpaceInLine;
        totalSpaceRemainder = (numberOfWords > 1) ? totalSpaceInLine % (numberOfWords - 1) : 0;
    } else {
        spaceBetweenWordsWithoutRemainder = 1;
        spaceAfterLastWordInLastLine = totalSpaceInLine - (numberOfWords - 1);
    }

    let line = [];

    if (numberOfWords === 1 && !isLastLine) {
        line.push(words[this.lineData.startIndexWords]);
        appendSpaceToLine(spaceBetweenWordsWithoutRemainder, line);
        fullyJustifiedText.push(line.join(''));
        return;
    }

    while (this.lineData.startIndexWords < this.lineData.endIndexWords) {
        line.push(words[this.lineData.startIndexWords]);
        let spaceBetweenWords = (totalSpaceRemainder-- > 0) ? 1 + spaceBetweenWordsWithoutRemainder : spaceBetweenWordsWithoutRemainder;
        appendSpaceToLine(spaceBetweenWords, line);
        ++this.lineData.startIndexWords;
    }
    line.push(words[this.lineData.endIndexWords]);
    appendSpaceToLine(spaceAfterLastWordInLastLine, line);
    fullyJustifiedText.push(line.join(''));
}

/**
 * @param {number} spacesToAppend
 * @param {string[]} line 
 * @return {void}
 */
function appendSpaceToLine(spacesToAppend, line) {
    while (spacesToAppend-- > 0) {
        line.push(" ");
    }
}
