//Julian McCarthy Slover
export default function solver(string) {
    var array = toOperationsArray(string);
    return pedmas(array);
};

//Turn string into array symobol and numbers
function toOperationsArray(string) {
    var numArray = [];
    var offset = 0;
    for (var char = 0; char < string.length; char++) {
        if(string.charAt(char) == '*' || string.charAt(char) == '/' || string.charAt(char) == '-' || string.charAt(char) == '+' || string.charAt(char) == '^'){
            if(string.charAt(char-1) != ')'){
                numArray.push(parseFloat(string.substring(offset, char)));
            }
            numArray.push(string.charAt(char));
            offset = char + 1;
        } else if(string.charAt(char) == '('){
            if(char != 0 && string.charAt(char - 1) != '*' && string.charAt(char - 1) != '/' && string.charAt(char - 1) != '-' && string.charAt(char - 1) != '+' && string.charAt(char - 1) != '^' && string.charAt(char - 1) != '(' && string.charAt(char - 1) != ')'){
                numArray.push(parseFloat(string.substring(offset, char)));
            }
            numArray.push(string.charAt(char));
            offset = char + 1;
        } else if(string.charAt(char) == ')'){
            if(string.charAt(char-1) != ')')
                numArray.push(parseFloat(string.substring(offset, char)));
            numArray.push(string.charAt(char));
            offset = char;
        } else if(char == string.length - 1){
            numArray.push(parseFloat(string.substring(offset , char + 1)));
        }
    }
    return numArray;
}

//Pedmas factory: parens -> paren multipication -> exponents -> division -> multiply -> add -> subtract
function pedmas(array){
    if(array.includes('(') || array.includes(')')){
        while(array.indexOf('(') != -1){
            var index = array.indexOf('(');
            var end = array.indexOf(')');
            var offset = index;
            while(array.indexOf('(', offset + 1) != -1 && end > array.indexOf('(', offset + 1)){
                offset = array.indexOf('(', offset + 1);
                if(end == -1 || offset == -1){
                    throw 'NAN';
                }
            }
            var chunk = end - offset + 1;
            array.splice(offset, chunk, pedmas(array.slice(offset + 1, end)));
        }
    }
    if(hasParenMultipication(array) != -1){
        while(hasParenMultipication(array) != -1){
            var index = hasParenMultipication(array);
            array.splice(index, 2, array[index] * array[index+1]);
        }
    }
    if(array.includes('^')){
        while(array.indexOf('^') != -1) {
            var index = array.indexOf('^');
            array.splice(index-1, 3, Math.pow(array[index-1], array[index+1]));
        }
    }
    if(array.includes('/')){
        while(array.indexOf('/', offset) != -1) {
            var index = array.indexOf('/');
            array.splice(index-1, 3, array[index-1] / array[index+1]);
        }
    }
    if(array.includes('*')){
        while(array.indexOf('*') != -1) {
            var index = array.indexOf('*');
            array.splice(index-1, 3, array[index-1] * array[index+1]);
        }
    }
    if(array.includes('+')){
        var offset = 0;
        while(array.indexOf('+') != -1) {
            var index = array.indexOf('+');
            array.splice(index-1, 3, array[index-1] + array[index+1]);
        }
    }
    if(array.includes('-')){
        var offset = 0;
        while(array.indexOf('-') != -1) {
            var index = array.indexOf('-');
            array.splice(index-1, 3, array[index-1] - array[index+1]);
        }
    }
    if(array.length != 1){
        //missmatch of parenthisis
        throw 'NaN'
    }
    return array[0];
}

function hasParenMultipication(arr){
    var array = arr;
    if(array.length == 1)
        return -1;
    for (var i = 0; i < array.length - 1; i++) {
        var isNumber = array[i] != '*' && array[i] != '/' && array[i] != '+' && array[i] != '-' && array[i] != '^';
        var nextIsNumber = array[i + 1] != '*' && array[i + 1] != '/' && array[i + 1] != '+' && array[i + 1] != '^';
        if(isNumber && nextIsNumber){
            return i;
        }
    }
	return -1;
}
