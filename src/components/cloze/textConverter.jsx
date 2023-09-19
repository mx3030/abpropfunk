export const getSentence = text => {
    return text.split(" ").map((w, id) => {
        if (w.startsWith("<")) {
            //const m = w.match(/[a-z-A-Z]+/);
            //const m = w.match(/\p{L}+/u); // Matches any Unicode letter
            const m = w.match(/<[^>]+>/);
            const temp = m[0].slice(1, -1)
            return { id, text: temp, type: "answer", placed: false, displayed: "" };
        }
        return { id, text: w, type: "word" };
    });
};

export const getAnswers = text => {
    const wordList = Array.from(new Set(text.split(" ")));
    return wordList.reduce((acc, cur) => {
        if (cur.startsWith("<")) {
            const m = cur.match(/<[^>]+>/); // Match content between angle brackets
            if (m) {
                const content = m[0].slice(1, -1); // Remove angle brackets
                return acc.concat(content);
            }
        }
        return acc;
    }, []);
};
