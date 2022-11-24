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
    const values = cards.map((a) => a[0]).sort((a, b) => Deck.values.indexOf(a) - Deck.values.indexOf(b));
    const suits = cards.map((a) => a[1]).sort();

    const duplicateCards = values.reduce((obj, v) => ({ ...obj, [v]: (obj[v] || 0) + 1 }), {});
    const duplicateSums = Object.values(duplicateCards);

    const checkDuplicates = (n) => duplicateSums.some((v) => v === n);
    const checkSequence = (arr) => arr.map((n) => Deck.values.indexOf(n)).every((n, i, a) => !i || n - 1 === a[i - 1]);

    const slicedCards = values.slice(0, values.length - 1);
    const lowStraight = ['a', '2'].every((v) => values.includes(v)) && checkSequence(slicedCards);
    const highStraight = checkSequence(values);
    const straight = lowStraight || highStraight;
    const flush = new Set(suits).size === 1;

    const pair = checkDuplicates(2);
    const threeOfAKind = checkDuplicates(3);
    const twoPair = duplicateSums.filter((n) => n === 2).length === 2;

    if (values[0] === 't' && flush && straight) return 'royal flush';
    else if (flush && straight) return 'straight flush';
    else if (pair && threeOfAKind) return 'full house';
    else if (straight) return 'straight';
    else if (threeOfAKind) return 'three of a kind';
    else if (twoPair) return 'two pair';
    else if (pair) return 'pair';
    else return 'nothing';
};

module.exports = { getResult, getDeck };
