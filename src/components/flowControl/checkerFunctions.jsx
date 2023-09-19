export function isArray(obj){
    return Array.isArray(obj);
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
}


export function compareNumbers(num1, num2, diff=0){ 
    try {
        // handle first number
        if(typeof num1 === "string") var number1 = parseFloat(num1.replace(/,/g, '.'))
        else if(typeof num1 === "number") var number1 = num1
        else return {res: false, sol: null}
        // handle second number
        if(typeof num2 === "string") var number2 = parseFloat(num2.replace(/,/g, '.'))
        else if(typeof num2 === "number") var number2 = num2
        else return {res: false, sol: null}
        // handle diff entry
        if(typeof diff === "string") var difference = parseFloat(diff.replace(/,/g, '.'))
        else if(typeof diff === "number") var difference = diff
        else var difference=0
        // compare and return
        if(Math.abs(number1-number2)<=difference){
            return {res: true, sol: num1}
        } else{
            return {res: false, sol: null}
        }
    } catch (e) {
        return {res: false, sol:null}
    }
}


export function compareTables(table1, table2, diff=true ){
    // table = [{'col0': value, 'col1': value, ...}]
    // diff = true --> table2 = [{'col0':[val,diff], 'col1': [val,diff], ...}]
    try{
        for(var row = 0; row < table2.length; row++){
            var cols1 = Object.keys(table1[row])
            var cols2 = Object.keys(table2[row])
            for( var i= 0; i < cols2.length; i++) {
                if(diff) {
                    if(!compareNumbers(table1[row][cols1[i]],table2[row][cols2[i]].val,table2[row][cols2[i]].diff).res) {
                        return {res: false, sol: null}
                    }
                } else if(!compareNumbers(table1[row][cols1[i]],table2[row][cols2[i]]).res){
                    return {res: false, sol: null}
                } 
            }
        }
        return {res: true, sol: table1}
    } catch (e){
        return {res: false, sol: null}
    }
}

export function comparePointLists(list1, list2, diffX=0, diffY=0){
    try{
        const temp = JSON.parse(JSON.stringify(list2)); // copy of list2
        var matchingPoints = []
        var cols1 = Object.keys(list1[Object.keys(list1)[0]])   // ggbData is object of objects
        var cols2 = Object.keys(list2[0])                       // tableData is array of objects
        var visiblePointsCounter=0
        for (var row1 in list1 ) {
            if(list1[row1].visible==false) continue // ignore not visible points
            visiblePointsCounter+=1
            for (var row2  in temp) {
                var deltaX = Math.abs(parseFloat(list1[row1][cols1[0]])-parseFloat(list2[row2][cols2[0]]))
                var deltaY = Math.abs(parseFloat(list1[row1][cols1[1]])-parseFloat(list2[row2][cols2[1]]))
                if(deltaX <= diffX && deltaY <= diffY) {
                    matchingPoints.push(row1)
                    delete temp[row2]
                }
            }
        }
        if(visiblePointsCounter==matchingPoints.length && Object.keys(list2).length==matchingPoints.length) return {res: true, sol: list1}
        //if(Object.keys(list1).length==matchingPoints.length && Object.keys(list2).length==matchingPoints.length) return {res: true, sol: list1}
        else return {res: false, sol: null}
    } catch (e) {
        return {res: false, sol: null}
    }
}

export function compareLines(line1, line2, diff=true){
    // line1 = {m: value, c: value, eq: equation} <-- ggb line
    // line2 = {m: value, c: value}
    // diff=true --> line2 = {m: [value, diff], c: [value, diff]}
    try{
        if(diff){
            if(compareNumbers(line1.m, line2.m[0], line2.m[1]).res && compareNumbers(line1.c,line2.c[0],line2.c[1]).res){
                return {res: true, sol: line1}
            } 
        } else {
            if(compareNumbers(line1.m, line2.m).res && compareNumbers(line1.c,line2.c).res){
                return {res: true, sol: line1}
            }
        } 
        return {res: false, sol: null}
    } catch (e) {
        return {res: false, sol: null}
    }    
}

export function compareTablesLength(table1, table2, arg = '=') {
    try {
        if(isObject(table1)){
            var temp1 = Object.keys(table1) // ggbData is Object
        } else {
            var temp1 = table1
        }
        if(isObject(table2)){
            var temp2 = Object.keys(table2)
        } else {
            var temp2 = table2
        }
        switch (arg) {
            case '=':
            return { res: temp1.length === temp2.length, sol: table1 };
            case '>':
            return { res: temp1.length > temp2.length, sol: table1 };
            case '>=':
            return { res: temp1.length >= temp2.length, sol: table1 };
            case '<':
            return { res: temp1.length < temp2.length, sol: table1 };
            case '<=':
            return { res: temp1.length <= temp2.length, sol: table1 };
            default:
            return { res: false, data: null };
        }
    } catch (e) {
        return { res: false, data: null };
    }
}

