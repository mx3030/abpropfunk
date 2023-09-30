import { ggbLinearRegression, ggbSolveEquation } from '/src/components/geogebra/ggbUtils.jsx'

export function moveData(data){
    return data
}

function findDeltaM(m,offset){
    // return deltaM, such that y=(m+deltaM)*x stays inside degree offset
    try{
        var slopeAngle = Math.atan(m);
        var degToRad = Math.PI / 180;
        var angleOffset = offset * degToRad;
        var newSlopeAngle = slopeAngle + angleOffset;
        var newLineM = Math.tan(newSlopeAngle);
        return Math.abs(newLineM-m)
    } catch (e){
        return null
    }
}

export async function createRegression(ggbRef, points, offset=0) {
    // create Regression from points structured in ggbData
    try{
        var [m,c] = await ggbLinearRegression(ggbRef,points)
        if(m==null || c==null) return null
        var diff = findDeltaM(m,offset)
        if(diff==null) return null
        var sol = {
            'm':[m, diff],
            'c': [0,0],
        }
        return sol 
    } catch(e) {
        console.log(e)
        return null
    }
}

function tableData2ggbPoints(original_data){
    const transformed_data = {};
    for (let index = 0; index < original_data.length; index++) {
        const key = index.toString(); // Use index as a string key
        transformed_data[key] = {
            "x": parseInt(original_data[index][Object.keys(original_data[index])[0]], 10),
            "y": parseInt(original_data[index][Object.keys(original_data[index])[1]], 10)
        };
    }
    return transformed_data;
}

export async function createRegressionFromTable(ggbRef, tableData, offset=0 ){
    var points = tableData2ggbPoints(tableData)
    var reg = await createRegression(ggbRef, points, 0)
    var eq = `-${reg.m[0]}x+y=0`
    return eq
}

export async function createValuePair(ggbRef,equation, conditions, variables, target ){
    try{
        const sol = await ggbSolveEquation(ggbRef, equation, conditions, variables, target )
        return sol
    } catch(e){
        return null
    }
    
}

export function calc(input, calculationString) {
    const replacedCalculation = calculationString.replace(/x/g, input);
    try {
        const sol = eval(replacedCalculation); 
        return sol;
    } catch (e) {
        return null
    }
}

export function trimTable(originalTable, columnNames ) {
    try{
        const newTable = originalTable.map(row => {
            const newRow = {};
            columnNames.forEach(colName => {
                newRow[colName] = row[colName];
            });
            return newRow;
        });
        return newTable;
    } catch (e) {
        return null
    }   
}
