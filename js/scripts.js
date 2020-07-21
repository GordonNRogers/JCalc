 
let accumlator = 0;
let memory = 0;

let displayText = '';
let currentDisplayValue = 0;

let operand1 = 0;
let operand2 = 0;
let pendingCommand = '';

// {operand1} --> {command} --> {operand2) --> {equals} --> {operand1 cmd operand2} --> {display}

 function onClickButton(val)
 {
    // can we use isDigit or regex to pick off the numbers and just have to process commands???
    if(typeof(val)=='number')
    {
        processNumber(val);
    }
    else
    {
        processCommand(val);
    }
 }

 function processNumber(num)
 {
    alert("Process Number: " + num);
 }

function updateDisplay()
{

}

function processCommand(cmd)
{
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

function processEquals()
{
    alert("processEquals");
}

function processPlus()
{
    alert("processPlus");
}

function processMinus()
{
    alert("processMinus");
}

function processTimes()
{
    alert("processTimes");
}

function processDivide()
{
    alert("processDivide");
}

function processDecimal()
{
    alert("processDecimal");
}

function processSign()
{
    alert("processSign");
}

function processMemoryRecall()
{
    alert("processMemoryRecall");
}

function processMemoryAdd()
{
    alert("processMemoryAdd");
}

function processMemorySubtract()
{
    alert("processMemorySubtract");
}

function processClear()
{
    alert("processClear");
}

function processClearEverything()
{
    alert("processClearEverything");
}

function processSquared()
{
    alert("processSquared");
}

function processPower()
{
    alert("processPower");
}

