const Deck = {
    suits: ['s', 'r', 'k', 'h'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'],
};

const shuffle = (list) => {
    let cIndex = list.length;

    while (cIndex !== 0) {
        const rIndex = Math.floor(Math.random() * cIndex);
        cIndex--;

        [list[cIndex], list[rIndex]] = [list[rIndex], list[cIndex]];
    }

    return list;
};

const getDeck = () => {
    const deck = [];

    for (const s of Deck.suits) {
        for (const v of Deck.values) {
            deck.push(`${v}${s}`);
        }
    }

    return shuffle(deck);
};

const getResult = (cards) => {
    // Sort values by order of Deck.values
    const values = cards.map((a) => a[0]).sort((a, b) => Deck.values.indexOf(a) - Deck.values.indexOf(b));
    const suits = cards.map((a) => a[1]).sort();

    // Map of duplicate values { "5": 3, "t": 1, "a": 1 }
    const duplicateValues = values.reduce((obj, v) => ({ ...obj, [v]: (obj[v] || 0) + 1 }), {});
    // List of values [3, 1, 1]
    const duplicateSums = Object.values(duplicateValues);

    // Checks if n exists in list of values
    const checkDuplicates = (n) => duplicateSums.some((v) => v === n);
    // Checks if every value in array, sequentially increments by one, from index of Deck.values
    const checkSequence = (arr) => arr.map((n) => Deck.values.indexOf(n)).every((n, i, a) => !i || n - 1 === a[i - 1]);

    // Slice of values, where last element is popped (special case for low/high straights)
    const slicedCards = values.slice(0, values.length - 1);
    // If '2' and 'a' exists in values, check if there is a straight starting with 'a' as lowest value
    const lowStraight = ['a', '2'].every((v) => values.includes(v)) && checkSequence(slicedCards);
    const highStraight = checkSequence(values);
    const straight = lowStraight || highStraight;
    // Set removes duplicates - if list of suits results in a set of 1 value then we know all suits are of one type
    const flush = new Set(suits).size === 1;

    const pair = checkDuplicates(2);
    const threeOfAKind = checkDuplicates(3);
    const fourOfAKind = checkDuplicates(4);
    const twoPair = duplicateSums.filter((n) => n === 2).length === 2;

    if (values[0] === 't' && flush && straight) return 'royal flush';
    else if (flush && straight) return 'straight flush';
    else if (fourOfAKind) return 'four of a kind';
    else if (pair && threeOfAKind) return 'full house';
    else if (flush) return 'flush';
    else if (straight) return 'straight';
    else if (threeOfAKind) return 'three of a kind';
    else if (twoPair) return 'two pair';
    else if (pair) return 'pair';
    else return 'nothing';
};

module.exports = { getResult, getDeck };
