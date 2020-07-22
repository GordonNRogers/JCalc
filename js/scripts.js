"use strict";

// vars for memory function
let memmory = 0;
let isMemoryShown = false;

// vars for the display
let displayText = '';
let currentDisplayNagative = false;
let lastButtonPushWasCommand = false;

// vars used to complete an operation
let operand1 = 0;
let operand2 = 0;
let pendingCommand = '';


// {operand1} --> {command} --> {operand2) --> {equals} --> {do operation, display}
// TODO:  add a backspace button???

// NOTE:  By convention, the values that are passed in from the HTML elements are numbers
// for number keys and strings for commands.
 function onClickButton(val)
 {
    if(typeof(val)=='number')
    {
        processNumber(val);
        lastButtonPushWasCommand = false;
    }
    else
    {
        processCommand(val);
        lastButtonPushWasCommand = true;
    }
    updateDisplay();
 }

 function processNumber(num)
 {
    // console.log("Process Number: " + num);

    // If the last button pushed was a command and now we have a number being pushed, 
    // clear the display and start adding numbers.
    if(lastButtonPushWasCommand || isMemoryShown)
    {
        processClear();            
    }

    displayText = displayText + num;
 }

function updateDisplay()
{
    //console.log("Update Display:" + displayText);
    let labelText = displayText;

    if(isMemoryShown)
    {
        labelText = labelText + '[M]'
    }

    // use jquery to get the display label by ID and set the text
    $("#lblValue").text(labelText);
}

function processCommand(cmd)
{
    // TODO:  define what happens if you press two commands consecutively (ie. "+*")
    // it's not a valid operation, so maybe treat is a a clear or show "Error"

    switch(cmd)
    {
        case '=':
            processEquals();
            break;
        case '+':
            processPlus();
            break;
        case '-':
            processMinus();
            break;
        case '*':
            processTimes();
            break;
        case '/':
            processDivide();
            break;
        case '.':
            processDecimal();
            break;
        case '+/-':
            processSign();
            break;
        case 'M':
            processMemoryRecall();
            break;
        case 'M+':
            processMemoryAdd();
            break;
        case 'M-':
            processMemorySubtract();
            break;
        case 'C':
            processClear();
            break;
        case 'CE':
            processClearEverything();
            break;
        case 'x^2':
            processSquared();
            break;
        case 'x^y':
            processPower();
            break;
        default:
            alert("Unknown command: " + cmd);
            break;
    }
 }

function processPendingCommand()
{
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


    let operationCompleted = false;
    operand2 = Number(displayText);

    switch(pendingCommand)
    {
        case '':  // no command, just set up for the next one
            operand1 = operand2;
            displayText = '';
            pendingCommand = '';
            operand2 = 0;
            break;
        case '+':
            // BUG:  12.3 + .4 -->  12.700000000000001
            // floating point error  --> maybe numbers should be handled in BCD?
            operand1 = operand1 + operand2;
            operationCompleted = true;
            break;
        case '-':
            operand1 = operand1 - operand2;
            operationCompleted = true;
            break;
        case '*':
            operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case '/':
            if( operand2==0 )
            {
                displayText = 'Error';
                pendingCommand = '';
                operand2 = 0;
                break;
            }
            else
            {
                operand1 = operand1 / operand2;
                operationCompleted = true;
            }
            break;
        default:
            alert('unknown pendingCommand: ' + pendingCommand);
            break;
    }

    // get ready for the next command
    pendingCommand = '';
    operand2 = 0;

    // if we did something, show the result
    if(operationCompleted)
    {
        displayText = operand1.toString();
    }
}

function processEquals()
{
    //console.log("processEquals");

    // process the pending operation and show the result
    // pressing number keys should result in a new value appearing in the display with no pending command,
    // which the default handling already does.  Just call it.
    processPendingCommand();
}

function processPlus()
{
    //console.log("processPlus");
    processPendingCommand();
    pendingCommand = '+';
}

function processMinus()
{
    //console.log("processMinus");
    processPendingCommand();
    pendingCommand = '+';
}

function processTimes()
{
    //console.log("processTimes");
    processPendingCommand();
    pendingCommand = '*';
}

function processDivide()
{
    //console.log("processDivide");
    processPendingCommand();
    pendingCommand = '/';
}

function processDecimal()
{
    //console.log("processDecimal");
    // add a decimal point at the end, but only if we don't already have one
    if( !displayText.includes('.') )
    {
        displayText = displayText + '.';
    }
}

function processSign()
{
    //console.log("processSign");
    displayText = (Number(displayText) * -1).toString();
}

function processMemoryRecall()
{
    console.log("processMemoryRecall");
    //isMemoryShown = true;
}

function processMemoryAdd()
{
    console.log("processMemoryAdd");
}

function processMemorySubtract()
{
    console.log("processMemorySubtract");
}

function processClear()
{
    //console.log("processClear");
    displayText = '';
    isMemoryShown = false;
}

function processClearEverything()
{
    //console.log("processClearEverything");
    memmory = 0;
    displayText = '';
    isMemoryShown = false;
    operand1 = 0;
    operand2 = 0;
    pendingCommand = '';
}

function processSquared()
{
    console.log("processSquared");
}

function processPower()
{
    console.log("processPower");
}

