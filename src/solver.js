//Julian McCarthy Solver
export default function solver(string) {
    let array = pedmas(string.split(' ').filter((element)=> element != ''));
    //weirdness happend
    if(array.length != 1 || isNaN(array[0])){
        throw 'NaN'
    } else if(Array.isArray(array[0])) {
        //this happens when doing paren stuff
        return array[0][0];
    }
    return array[0];
};

//Pedmas factory: parens -> paren multipication -> exponents -> division -> multiply -> add -> subtract
function pedmas(array){
    //If we have several parens inside first block find the cIosesed begining paren to end
    //Recursively do the math for parens
    if(array.includes('(') || array.includes(')')){
        while(array.indexOf('(') != -1){
            let offset = array.indexOf('(');
            let end = array.indexOf(')');
            while(array.indexOf('(', offset + 1) != -1 && end > array.indexOf('(', offset + 1)){
                offset = array.indexOf('(', offset + 1);
                if(end == -1 || offset == -1){
                    throw 'NAN';
                }
            }
            chunk = end + 1 - offset;
            array.splice(offset, chunk, pedmas(array.slice(offset + 1, end)));
        }
    }

    //If no operator is seperating the numbers
    if(indexOfParenMultipication(array) != -1){
        while(indexOfParenMultipication(array) != -1){
            let index = indexOfParenMultipication(array);
            array.splice(index, 2, parseFloat(array[index]) * parseFloat(array[index+1]));
        }
    }

    //All these operators have the same patterns
    ['^', '/', '*', '+', '-'].forEach((element) => {
        if(array.includes(element)){
            while(array.indexOf(element) != -1) {
                let index = array.indexOf(element);
                array.splice(index-1, 3, stringToOperator(array, index, element));
            }
        }
    });
    return array;
}

function stringToOperator(array, index, operator){
    let firstNumber = parseFloat(array[index - 1]);
    let secondNumber = parseFloat(array[index + 1]);
    if(operator == '^')
        return Math.pow(firstNumber, secondNumber);
    if(operator == '/')
        return firstNumber / secondNumber;
    if(operator == '*')
        return firstNumber * secondNumber;
    if(operator == '+')
        return firstNumber + secondNumber;
    if(operator == '-')
        return firstNumber - secondNumber;
}

function indexOfParenMultipication(array){
    if(array.length == 1)
        return -1;
    for (let i = 0; i < array.length - 1; i++) {
        let isNumber = array[i] != '*' && array[i] != '/' && array[i] != '+' && array[i] != '-' && array[i] != '^' && array[i] != '(' && array[i] != ')';
        let nextIsNumber = array[i + 1] != '*' && array[i + 1] != '/' && array[i + 1] != '+' && array[i + 1] != '^' && array[i + 1] != '(' && array[i + 1] != ')';
        if(isNumber && nextIsNumber)
            return i;
    }
	return -1;
}
