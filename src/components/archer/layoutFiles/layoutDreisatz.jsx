// layout Dreisatz

const main = [
    [null, `<span style="text-decoration:underline">Zeit</span><div>in [min]</div>`, null, `<span style="text-decoration:underline">Volumen</span><div>in [ml]</div>`, null],
    [null, 1, `<div style="font-size:24px">&#8793;`, true, null],
    [true, null, null, null, true],
    [null, true, `<div style="font-size:24px">&#8793;`, 1, null],
    [true, null, null, null, true],
    [null, true, `<div style="font-size:24px">&#8793;`, 1000, null],
]

// arrow to [[col,row,sourceStart, targetEnd, headStart, headEnd],[...]]
const connections = [
    [ null, null, null, null, null, null ],
    [ null, [[2,0,'left','top',false,false]], null, [[2,4,'right','top',false,false]], null],
    [ [[3,1,'bottom','left',false,true]], null, null, null, [[3,3,'bottom','right',false,true]]],
    [ null, [[4,0,'left','top',false,false]], null, [[4,4,'right','top',false,false]], null],
    [ [[5,1,'bottom','left',false,true]], null, null, null, [[5,3,'bottom','right',false,true]]],
    [ null, null, null, null, null],
]

export const layoutData = {
    rows: 6,
    cols: 5,
    main: main,
    connections: connections,
}


