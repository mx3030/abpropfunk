import { rationalize } from 'mathjs';

export function extractPointsFromCommandString(commandString){ 
    try{
        var re = /\(([A-Za-z]+),\s*([A-Za-z]+)\)/;
        var matches = re.exec(commandString) 
        return [matches[1],matches[2]]
    } catch (e){
        return [null, null]
    } 
}

export async function extractCoefficientsFromLine(ref,name, functionString) {
    // name: object name or valueString (y=2x+1 not working for some reason)
    // a*x+b*y+c*z=0
    // b*y = -a*x - c*z
    // y = (-a/b)*x + (-c/b)*z
    try{
        const a = eval(await ref.current.evalCommandCAS(`x(${name})`))
        const b = eval(await ref.current.evalCommandCAS(`y(${name})`))
        const c = eval(await ref.current.evalCommandCAS(`z(${name})`))
        const slope = -a / b 
        const yIntersection = -c / b
        return [slope, yIntersection]
    } catch (e) { // this step is probably not needed anymore, because of sol!=null condition in Updater
        // on reload ggb functions not working --> use mathjs lib
        const split = functionString.split(/:|=/);
        if(split.length==2){ // y = mx+c
            const coefficients = rationalize(split[1],{},true).coefficients[0]
            const slope = coefficients[1]
            const yIntersection = coefficients[0]
            return [slope, yIntersection]
        } else if(split.length==3){ // f: ax+by=c
            var vars = rationalize(split[1],{},true).variables
            if(vars.length==2){ // a!=0 b!=0
                const a = rationalize(split[1],{y:0}, true).coefficients[1]
                const b = rationalize(split[2],{x:0}, true).coefficients[1]
                const slope = -a/b
            } else if(vars.length==1 && vars.includes('x')){ // b=0
                return [null, null] // vertical 
            } else if(vars.length==1 && vars.includes('y')){ // a=0
                const b = rationalize(split[2],{x:0}, true).coefficients[1]
                const slope = 0
            }
            const c = parseFloat(split[2])
            const yIntersection = -c/b
            return [slope, yIntersection]
        } else return [null, null]
    }
}

export async function ggbLinearRegression(ref, points) {
    const pointArray = Object.values(points).map(point => `(${point.x}, ${point.y})`);
    const pointString = pointArray.join(', ');
    const functionString = await ref.current.evalCommandCAS(`FitLine({${pointString}})`);
    const tempObject = await ref.current.evalCommandGetLabels(functionString) // create tempObject for evalCommandCAS to work
    var result = await extractCoefficientsFromLine(ref,tempObject, functionString)
    await ref.current.deleteObject(tempObject) // delete tempObject
    return result
}

export async function ggbSolveEquation(ref, equation, conditions, variables, target){
    try{
        //const temp = await ref.current.evalCommandCAS(`Solve({${equation},${conditions}},{${variables}})`) 
        const temp = await ref.current.evalCommandCAS(`NSolve({${equation},${conditions}},{${variables}})`)
        const pattern = new RegExp(`${target}\\s*=\\s*([^,}]+)(?=[,}])`);
        const matches = temp.match(pattern);
        const result = eval(matches[1]) 
        return result
    } catch (e) {
        return null
    }
}

export function createCoordStart(customCommand){
    var maxValue = customCommand[0]; // defines max value on axes that is visible
    var originPositionFactor = customCommand[1]; // changes origin position in applet
    return {
        xMin: -maxValue.x / originPositionFactor.x,
        xMax: maxValue.x,
        yMin: -maxValue.y / originPositionFactor.y,
        yMax: maxValue.y,
    };
};
