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

