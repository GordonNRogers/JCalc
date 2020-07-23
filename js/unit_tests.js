"use strict";

/////////////////////////
// unit tests
/////////////////////////


function assert(condition, message)
{
    if(condition==false)
    {
        alert('condition failed:' + message);
        // TODO: stop executing scripts
        throw 'Assert failed';
    }
}

function runUnitTests()
{
    onClickButton('CE');

    // basic data entry
    onClickButton(1);
    onClickButton(2);
    onClickButton(3);
    assert(displayText=='123', 'test1');
    onClickButton('.');
    onClickButton(4);
    assert(displayText=='123.4', 'test1A');
    onClickButton('<-');
    onClickButton('<-');
    assert(displayText=='123', 'test1B');

    // add some sumbers
    onClickButton('+');
    onClickButton(2);
    onClickButton(4);
    onClickButton(6);
    onClickButton('=');
    assert(displayText=='369', 'test2A');
    onClickButton('+');
    onClickButton(3);
    onClickButton(3);
    onClickButton('+');
    onClickButton(1);
    onClickButton(2);
    onClickButton('.');
    onClickButton(8);
    onClickButton('=');
    assert(displayText=='414.8', 'test2B');

    // clear everything and start fresh
    onClickButton('CE');

    // subtraction tests
    onClickButton(4);
    onClickButton(4);
    onClickButton('-');
    onClickButton(3);
    onClickButton(0);
    onClickButton('=');
    assert(displayText=='14', 'test3A');
    onClickButton('-');
    onClickButton(1);
    onClickButton(2);
    onClickButton(2);
    onClickButton('=');
    assert(displayText=='-108', 'test3B');
    onClickButton('+');
    onClickButton(8);
    onClickButton(7);
    onClickButton('=');
    assert(displayText=='-21', 'test3C');
    onClickButton('+/-');
    assert(displayText=='21', 'test3D');


    // unit tests for multiplication and division
    onClickButton('CE');
    onClickButton(3);
    onClickButton('*');
    onClickButton(9);
    onClickButton('=');
    assert(displayText=='27', 'test4A');
    onClickButton('/');
    onClickButton(3);
    onClickButton('=');
    assert(displayText=='9', 'test4B');
    onClickButton('/');
    onClickButton(0);
    onClickButton('=');
    assert(displayText=='Error', 'test4C');


    // unit tests for memory buttons
    onClickButton('CE');
    onClickButton(6);
    onClickButton(4);
    onClickButton('MS');
    assert(memory==64, 'test5A');
    onClickButton('C');
    onClickButton('MR');
    assert(displayText=='64', 'test5B');
    onClickButton(1);
    onClickButton(0);
    onClickButton('M-');
    assert(memory=='54', 'test5C');
    onClickButton(8);
    onClickButton(5);
    onClickButton('M+');
    onClickButton('MR');
    assert(displayText=='139', 'test5D');
    onClickButton('CE');
    assert(displayText=='', 'test5E');
    assert(memory==0, 'test5F');

    // unit tests for power functions
    onClickButton('CE');
    onClickButton(2);
    onClickButton('x^2');
    assert(displayText=='4', 'test6A');
    onClickButton('x^y');
    onClickButton(3);
    onClickButton('=');
    assert(displayText=='64', 'test6B');
 
    // unit tests for invert function
    onClickButton('CE');
    onClickButton(1);
    onClickButton(0);
    onClickButton('1/x');
    assert(displayText=='0.1', 'test7A');
    // try adding something to it
    onClickButton('+');
    onClickButton(5);
    onClickButton('=');
    assert(displayText=='5.1', 'test7B');

    onClickButton('CE');
    onClickButton(1);
    onClickButton(0);
    onClickButton(0);
    onClickButton('%');
    assert(displayText=='1', 'test8A');
    onClickButton(7);
    onClickButton(7);
    onClickButton('%');
    assert(displayText=='0.77', 'test8B');


    // clear everything when done
    onClickButton('CE');
}

