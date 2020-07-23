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

    onClickButton('CE');
}

