"use strict";

/////////////////////////
// unit tests
/////////////////////////


function assert(condition, message)
{
    if(condition==false)
    {
        alert('condition failed:' + message);
        throw 'Assert failed';
    }
}

function runUnitTests()
{
    // clear everything and start fresh
    onClickButton('CE');

    // basic data entry
    onClickButton(1);
    onClickButton(2);
    onClickButton(3);
    assert(strDisplayText=='123', 'test1');
    onClickButton('.');
    onClickButton(4);
    assert(strDisplayText=='123.4', 'test1A');
    onClickButton('<-');
    onClickButton('<-');
    assert(strDisplayText=='123', 'test1B');

    // add some numbers
    onClickButton('+');
    onClickButton(2);
    onClickButton(4);
    onClickButton(6);
    onClickButton('=');
    assert(strDisplayText=='369', 'test2A');
    onClickButton('+');
    onClickButton(3);
    onClickButton(3);
    onClickButton('+');
    onClickButton(1);
    onClickButton(2);
    onClickButton('.');
    onClickButton(8);
    onClickButton('=');
    assert(strDisplayText=='414.8', 'test2B');
    onClickButton('CE');
    onClickButton(1);
    onClickButton(2);
    onClickButton('.');
    onClickButton(3);
    onClickButton('+'); 
    onClickButton('.');
    onClickButton(4);
    onClickButton('=');
    assert((strDisplayText=='12.7'), 'test2C'); // use startswith() not == due to floating point issue, fix later


    // subtraction tests
    onClickButton('CE');
    onClickButton(4);
    onClickButton(4);
    onClickButton('-');
    onClickButton(3);
    onClickButton(0);
    onClickButton('=');
    assert(strDisplayText=='14', 'test3A');
    onClickButton('-');
    onClickButton(1);
    onClickButton(2);
    onClickButton(2);
    onClickButton('=');
    assert(strDisplayText=='-108', 'test3B');
    onClickButton('+');
    onClickButton(8);
    onClickButton(7);
    onClickButton('=');
    assert(strDisplayText=='-21', 'test3C');
    onClickButton('+/-');
    assert(strDisplayText=='21', 'test3D');


    // unit tests for multiplication and division
    onClickButton('CE');
    onClickButton(3);
    onClickButton('*');
    onClickButton(9);
    onClickButton('=');
    assert(strDisplayText=='27', 'test4A');
    onClickButton('/');
    onClickButton(3);
    onClickButton('=');
    assert(strDisplayText=='9', 'test4B');
    onClickButton('/');
    onClickButton(0);
    onClickButton('=');
    assert(strDisplayText=='Error', 'test4C');


    // unit tests for memory buttons
    onClickButton('CE');
    onClickButton(6);
    onClickButton(4);
    onClickButton('MS');
    assert(strMemory=='64', 'test5A');
    onClickButton('C');
    onClickButton('MR');
    assert(strDisplayText=='64', 'test5B');
    onClickButton(1);
    onClickButton(0);
    onClickButton('M-');
    assert(strMemory=='54', 'test5C');
    onClickButton(8);
    onClickButton(5);
    onClickButton('M+');
    onClickButton('MR');
    assert(strDisplayText=='139', 'test5D');
    onClickButton('CE');
    assert(strDisplayText=='', 'test5E');
    assert(Number(strMemory)==0, 'test5F');

    // unit tests for power functions
    onClickButton('CE');
    onClickButton(2);
    onClickButton('x^2');
    assert(strDisplayText=='4', 'test6A');
    onClickButton('x^y');
    onClickButton(3);
    onClickButton('=');
    assert(strDisplayText=='64', 'test6B');
 
    // unit tests for invert function
    onClickButton('CE');
    onClickButton(1);
    onClickButton(0);
    onClickButton('1/x');
    assert(strDisplayText=='0.1', 'test7A');
    // try adding something to it
    onClickButton('+');
    onClickButton(5);
    onClickButton('=');
    assert(strDisplayText=='5.1', 'test7B');
    // another invert test...invert 6, check result, invert again, check result
    onClickButton('CE');
    onClickButton(6);
    onClickButton('1/x');
    assert(strDisplayText.startsWith('0.166666'), 'test7C');
    onClickButton('1/x');
    assert(strDisplayText=='6', 'test7D');

    onClickButton('CE');
    onClickButton(1);
    onClickButton(0);
    onClickButton(0);
    onClickButton('%');
    assert(strDisplayText=='1', 'test8A');
    onClickButton(7);
    onClickButton(7);
    onClickButton('%');
    assert(strDisplayText=='0.77', 'test8B');

    

    // clear everything when done
    onClickButton('CE');
}

