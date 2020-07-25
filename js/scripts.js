"use strict";

// vars for memory function
let strMemory = '';

// vars for the display
let strDisplayText = '';
let bCurrentDisplayNagative = false;
let bLastButtonPushWasCommand = false;  // there are some cases when we need to know this, so keep track

// vars used to complete an operation
let strOperand1 = '';
let strOperand2 = '';
let strPendingCommand = '';


// NOTE:  By convention, the values that are passed in from the HTML elements are numbers
// for number keys and strings for commands.
 function onClickButton(val)
 {
    if(typeof(val)=='number')
    {
        processNumber(val);
    }
    else
    {
        processCommand(val);
    }
    updateDisplay();
 }

 function processNumber(num)
 {
    // console.log("Process Number: " + num);

    // If the last button pushed was a command and now we have a number being pushed, 
    // clear the display and start adding numbers.
    if(bLastButtonPushWasCommand)
    {
        doClear();            
    }

    strDisplayText = strDisplayText + num;

    bLastButtonPushWasCommand = false;
}

function doClear()
{
    //console.log("processClear");
    strDisplayText = '';
}

function doClearEverything()
{
    //console.log("processClearEverything");
    strMemory = '';
    strDisplayText = '';
    strOperand1 = '';
    strOperand2 = '';
    strPendingCommand = '';
}

function updateDisplay()
{
    //console.log("Update Display:" + displayText);

    // use jquery to get the display label by ID and set the text
    $("#lblValue").text(strDisplayText);
}

function processCommand(cmd)
{
    switch(cmd)
    {
        case '=':
            // process the pending operation and show the result
            // pressing number keys should result in a new value appearing in the display with no pending command,
            // which the default handling already does.  Just call it.
            processPendingCommand();
            bLastButtonPushWasCommand = true;
            break;
        case '+':
            processPendingCommand();
            strPendingCommand = cmd;
            bLastButtonPushWasCommand = true;
            break;
        case '-':
            processPendingCommand();
            strPendingCommand = cmd;
            bLastButtonPushWasCommand = true;
            break;
        case '*':
            processPendingCommand();
            strPendingCommand = cmd;
            bLastButtonPushWasCommand = true;
            break;
        case '/':
            processPendingCommand();
            strPendingCommand = cmd;
            bLastButtonPushWasCommand = true;
            break;
        case '.':
            if(bLastButtonPushWasCommand)
            {
                doClear();            
            }
            if( !strDisplayText.includes('.') )
            {
                strDisplayText = strDisplayText + '.';
            }
            bLastButtonPushWasCommand = false;  // this one if different...it's a command that modifies a number
            break;
        case '+/-':
            strDisplayText =  (Number(strDisplayText) * -1).toString();
            bLastButtonPushWasCommand = false;  // this one is different...it's a command that modifies a number
            break;
        case 'C':
            doClear();
            bLastButtonPushWasCommand = true;
            break;
        case 'CE':
            doClearEverything();
            bLastButtonPushWasCommand = true;
            break;
        case 'MS':
            processPendingCommand();
            strMemory = strDisplayText;
            bLastButtonPushWasCommand = true;
            break;
        case 'MR':
            strDisplayText = strMemory;
            bLastButtonPushWasCommand = true;
            break;
        case 'M+':
            processPendingCommand();
            strMemory = doAdjustedMath(strMemory, '+', strDisplayText);
            bLastButtonPushWasCommand = true;
            break;
        case 'M-':
            processPendingCommand();
            strMemory = doAdjustedMath(strMemory, '-', strDisplayText);
            bLastButtonPushWasCommand = true;
            break;
        case '<-':
            strDisplayText = strDisplayText.slice(0, strDisplayText.length-1);
            bLastButtonPushWasCommand = false;
            break;
        case 'x^2':
            processPendingCommand();
            strOperand1 = strDisplayText;
            strPendingCommand = 'x^y';
            strOperand2 = '2';
            processPendingCommand();
            bLastButtonPushWasCommand = true;
            break;
        case 'x^y':
            processPendingCommand();
            strPendingCommand = cmd;
            bLastButtonPushWasCommand = true;
            break;
        case '1/x':
            processPendingCommand();
            strOperand1 = '1';
            strPendingCommand = '/';
            strOperand2 = strDisplayText;
            processPendingCommand();
            bLastButtonPushWasCommand = true;
            break;
        case '%':
            processPendingCommand();
            strDisplayText =  (Number(strDisplayText) / 100).toString();
            bLastButtonPushWasCommand = true;
            break;
        default:
            alert("Unknown command: " + cmd);
            bLastButtonPushWasCommand = true;
            break;
    }
 }

function processPendingCommand()
{
    // This method handles commands that take two operands, like +-*/, x^y, etc.
    // Enter operand1, press the command button to set the pending command,
    // enter operand2, then press another command.  The first thing done is to evaluate
    // the pending operation before either performing the next operation or making pending.

    // sinple case:
    // 2 + 6 =  --> 8, pressing a number key clears the result
    // hit 2, displays 2 on the screen
    // hit +, 2 gets stored as operand 1 and the screen is cleared, pending operation is +
    // hit 6 and it appears on the screen
    // hit = and 6 becomes operand 2 and the pending operation is performed
    // result becomes operand1
    // pressing a number will clear the display and enter data normally

    // complex case:
    // 2 + 6 + 4 =  --> 12, pressing a number key clears the result
    // hit 2, displays 2 on the screen
    // hit +, 2 gets stored as operand 1 and the screen is cleared, pending operation is +
    // hit 6 and it appears on the screen
    // hit +,  acts like an equals, shows the result, clears it when another value is entered
    //   the current value becomes operand2, the pending operation is complete


    let bOperationCompleted = false;
    strOperand2 = strDisplayText;

    switch(strPendingCommand)
    {
        case '':  // no command to process, so just set up for the next one
            strOperand1 = strOperand2;
            strOperand2 = '';
            strPendingCommand = '';
            break;
        case '+':
            strOperand1 = doAdjustedMath(strOperand1, '+', strOperand2);
            bOperationCompleted = true;
            break;
        case '-':
            strOperand1 = doAdjustedMath(strOperand1, '-', strOperand2);
            bOperationCompleted = true;
            break;
        case '*':
            strOperand1 = (Number(strOperand1)*Number(strOperand2)).toString();
            bOperationCompleted = true;
            break;
        case '/':
            if( Number(strOperand2)==0 )  // handle divide by zero
            {
                strDisplayText = 'Error';
                strPendingCommand = '';
                strOperand2 = 0;
            }
            else
            {
                strOperand1 = (Number(strOperand1)/Number(strOperand2)).toString();
                bOperationCompleted = true;
            }
            break;
        case 'x^y':
            // rethink:  all doAdjustedMath does is handle moving decimals around for add/subtract operations
            // maybe bring that code back up here and call something like doEncodedMath for just +- ops.
            strOperand1 = Math.pow(Number(strOperand1),Number(strOperand2)).toString();
            bOperationCompleted = true;
            break;
        default:
            alert('unknown pendingCommand: ' + strPendingCommand);
            break;
    }

    // get ready for the next command
    strPendingCommand = '';
    strOperand2 = '';

    // if we did something, show the result
    if(bOperationCompleted)
    {
        strDisplayText = strOperand1;
    }
}

function digitsAfterDecimalPoint(strValue)
{
    let nDigitsAfterDecimal = 0;
    let nDecimalIndex = indexOfDecimal(strValue);

    if(nDecimalIndex>=0)
    {
        nDigitsAfterDecimal = (strValue.length-1) - nDecimalIndex;
    }

    return nDigitsAfterDecimal;
}

function indexOfDecimal(strValue)
{
    let strLen = strValue.length;
    let result = -1;    
    let i=0;

    for(i=0;i<strLen;i++)
    {
        if(strValue[i]=='.')
        {
            result = i;
            break;
        }
    }

    return result;
}

function moveDecimalPointRight(strValue, iNumPlaces)
{
    // Find the decimal and remove it
    // Make sure the string has iNumPlaces digits to the right
    // If we run out of digts, add enough zeros to make it work.
    let result = strValue;
    let strLen = strValue.length;
    let nDecimalIndex = indexOfDecimal(strValue);
    let nDigitsAfterDecimal = (nDecimalIndex>=0) ? ((strLen-1)-nDecimalIndex) : -1;  // -1 to show there is nothing there
    let i = nDecimalIndex;
    let numPlacesMoved = 0;
    let nPlacesInResult = 0;


    // sllice out the decimal point if there s one
    if(nDigitsAfterDecimal>=0)
    {
        let tempResult1 = result.slice(0, nDecimalIndex);
        let tempResult2 = result.slice(nDecimalIndex+1);
        result = tempResult1 + tempResult2;
        nPlacesInResult = tempResult2.length;
    }

    // Figure out how many zeros we need, build an array, and concat that to result.
    let numPlacesNeeded = iNumPlaces - nPlacesInResult;

    // add zeros to the end as needed
    if(numPlacesNeeded>0)
    {
        let i=0;
        for(i=0;i<numPlacesNeeded;i++)
        {
            result = result + '0';
        }
    }

    return result;
}

function doAdjustedMath(strOp1, strOperator, strOp2)
{
    let result = 0;
    // special handling for add/subtracxt to avoid floating-point errors
    // find the max number of decimal points, then multiply everything by a conversion factor
    // to convert everything to integers.  Do the operation, then divide by the conversion fsactor to
    // convert it back.
    // https://www.w3schools.com/js/js_numbers.asp
    // var x = 0.2 + 0.1;         // x will be 0.30000000000000004
    // var x = (0.2 * 10 + 0.1 * 10) / 10;       // x will be 0.3

    // find the number of digts we have to move the decimal point to the right
    let iDigitsDecimalShifted = Math.max(digitsAfterDecimalPoint(strOp1), digitsAfterDecimalPoint(strOp2));
    // move the decimal point in both operands, adding zeros as neccessary
    let adjustedVal1 = moveDecimalPointRight(strOp1, iDigitsDecimalShifted);
    let adjustedVal2 = moveDecimalPointRight(strOp2, iDigitsDecimalShifted);

    // do the operation
    let tempResult = 0;
    switch(strOperator)
    {
        case '+':
            tempResult = Number(adjustedVal1) + Number(adjustedVal2);
            break;
        case '-':
            tempResult = Number(adjustedVal1) - Number(adjustedVal2);
            break;
        default:
            alert("Unknown doAdjustedMath operation: " + strOperator);
            throw '';
    }

    // correct the result
    if(iDigitsDecimalShifted>0)
    {
        result = tempResult / (10*iDigitsDecimalShifted);
    }
    else
    {
        result = tempResult;
    }

    // return the result as a string
    return result.toString();
}


