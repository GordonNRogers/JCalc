"use strict";

// vars for memory function
let memmory = 0;
let isMemoryShown = false;

// vars for the display
let displayText = '';
let currentDisplayNagative = false;
let lastButtonPushWasCommand = false;  // there are some cases when we need to know this, so keep track

// vars used to complete an operation
let operand1 = 0;
let operand2 = 0;
let pendingCommand = '';


// {operand1} --> {command} --> {operand2) --> {equals} --> {do operation, display}

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
    if(lastButtonPushWasCommand || isMemoryShown)
    {
        doClear();            
    }

    displayText = displayText + num;

    lastButtonPushWasCommand = false;
}

function doClear()
{
    //console.log("processClear");
    displayText = '';
    isMemoryShown = false;
}

function doClearEverything()
{
    //console.log("processClearEverything");
    memmory = 0;
    displayText = '';
    isMemoryShown = false;
    operand1 = 0;
    operand2 = 0;
    pendingCommand = '';
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
    switch(cmd)
    {
        case '=':
            // process the pending operation and show the result
            // pressing number keys should result in a new value appearing in the display with no pending command,
            // which the default handling already does.  Just call it.
            processPendingCommand();
            lastButtonPushWasCommand = true;
            break;
        case '+':
            processPendingCommand();
            pendingCommand = '+';
            lastButtonPushWasCommand = true;
            break;
        case '-':
            processPendingCommand();
            pendingCommand = '-';
            lastButtonPushWasCommand = true;
            break;
        case '*':
            processPendingCommand();
            pendingCommand = '*';
            lastButtonPushWasCommand = true;
            break;
        case '/':
            processPendingCommand();
            pendingCommand = '/';
            lastButtonPushWasCommand = true;
            break;
        case '.':
            if( !displayText.includes('.') )
            {
                displayText = displayText + '.';
            }
            lastButtonPushWasCommand = false;  // this one if different...it's a command that modifies a number
            break;
        case '+/-':
            displayText = (Number(displayText) * -1).toString();
            lastButtonPushWasCommand = false;  // this one if different...it's a command that modifies a number
            break;
        case 'C':
            doClear();
            lastButtonPushWasCommand = true;
            break;
        case 'CE':
            doClearEverything();
            lastButtonPushWasCommand = true;
            break;
        case 'MS':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case 'MR':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case 'M+':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case 'M-':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case '<-':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case 'x^2':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case 'x^y':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case '1/x':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        case '%':
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
            break;
        default:
            alert("Unknown command: " + cmd);
            lastButtonPushWasCommand = true;
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
        case '':  // no command to process, so just set up for the next one
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
            if( operand2==0 )  // handle divide by zero
            {
                displayText = 'Error';
                pendingCommand = '';
                operand2 = 0;
            }
            else
            {
                operand1 = operand1 / operand2;
                operationCompleted = true;
            }
            break;
        case 'MS':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case 'MR':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case 'M+':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case 'M-':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case '<-':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case 'x^2':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case 'x^y':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case '1/x':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
            break;
        case '%':
            alert('unknown pendingCommand: ' + pendingCommand);
            //operand1 = operand1 * operand2;
            operationCompleted = true;
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


