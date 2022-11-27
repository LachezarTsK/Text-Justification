
#include <string>
#include <memory>
#include <vector>
using namespace std;

struct LineData {
    int startIndexWords = 0;
    int endIndexWords = 0;
    int textLength = 0;
    int singleSapcesBetweenWordsLength = 0;

    LineData() = default;

    LineData(int index, const vector<string>& words) {
        if (index < words.size()) {
            startIndexWords = index;
            endIndexWords = index;
            textLength = words[index].length();
            singleSapcesBetweenWordsLength = 0;
        }
    }
};

class Solution {
    
    inline static const int SINGLE_SPACE = 1;
    unique_ptr<LineData> lineData;
    size_t maxWidth;

public:
    vector<string> fullJustify(const vector<string>& words, int maxWidth) {
        this->maxWidth = maxWidth;
        lineData = make_unique<LineData>(0, words);
        vector<string> fullyJustifiedText;

        for (int i = 1; i < words.size(); ++i) {

            if (lineData->textLength + lineData->singleSapcesBetweenWordsLength + SINGLE_SPACE + words[i].length() < maxWidth) {
                lineData->textLength += words[i].length();
                ++lineData->singleSapcesBetweenWordsLength;
                ++lineData->endIndexWords;
                continue;
            }
            if (lineData->textLength + lineData->singleSapcesBetweenWordsLength + SINGLE_SPACE + words[i].length() == maxWidth) {
                lineData->textLength += words[i].length();
                ++lineData->singleSapcesBetweenWordsLength;
                ++lineData->endIndexWords;

                createLine(fullyJustifiedText, words, false);
                lineData = make_unique<LineData>(++i, words);
                continue;
            }
            createLine(fullyJustifiedText, words, false);
            lineData = make_unique<LineData>(i, words);
        }

        if (lineData->textLength > 0) {
            createLine(fullyJustifiedText, words, true);
        }
        return fullyJustifiedText;
    }

private:
    void createLine(vector<string>& fullyJustifiedText, const vector<string>& words, bool isLastLine) const {

        int totalSpaceInLine = maxWidth - lineData->textLength;
        int spaceBetweenWordsWithoutRemainder = 0;
        int totalSpaceRemainder = 0;
        int spaceAfterLastWordInLastLine = 0;
        int numberOfWords = lineData->endIndexWords - lineData->startIndexWords + 1;

        if (!isLastLine) {
            spaceBetweenWordsWithoutRemainder = (numberOfWords > 1) ? totalSpaceInLine / (numberOfWords - 1) : totalSpaceInLine;
            totalSpaceRemainder = (numberOfWords > 1) ? totalSpaceInLine % (numberOfWords - 1) : 0;
        } else {
            spaceBetweenWordsWithoutRemainder = 1;
            spaceAfterLastWordInLastLine = totalSpaceInLine - (numberOfWords - 1);
        }

        string line;

        if (numberOfWords == 1 && !isLastLine) {
            line.append(words[lineData->startIndexWords]);
            appendSpaceToLine(spaceBetweenWordsWithoutRemainder, line);
            fullyJustifiedText.push_back(line);
            return;
        }

        while (lineData->startIndexWords < lineData->endIndexWords) {
            line.append(words[lineData->startIndexWords]);
            int spaceBetweenWords = (totalSpaceRemainder-- > 0) ? 1 + spaceBetweenWordsWithoutRemainder : spaceBetweenWordsWithoutRemainder;
            appendSpaceToLine(spaceBetweenWords, line);
            ++lineData->startIndexWords;
        }
        line.append(words[lineData->endIndexWords]);
        appendSpaceToLine(spaceAfterLastWordInLastLine, line);
        fullyJustifiedText.push_back(line);
    }

    void appendSpaceToLine(int spacesToAppend, string& line) const {
        while (spacesToAppend-- > 0) {
            line.append(" ");
        }
    }
};
