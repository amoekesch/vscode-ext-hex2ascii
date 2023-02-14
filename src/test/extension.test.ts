import * as assert from 'assert';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {

    const ascii = 'test text';
    const hex = '74 65 73 74 20 74 65 78 74';
    const hex0x = '0x74 0x65 0x73 0x74 0x20 0x74 0x65 0x78 0x74';
    const hexCommaSeparated = '74, 65, 73, 74, 20, 74, 65, 78, 74';
    const hex0xCommaSeparated = '0x74, 0x65, 0x73, 0x74, 0x20, 0x74, 0x65, 0x78, 0x74';

    before(() => {
        vscode.window.showInformationMessage('Start all tests.');
    });

    test('hex to ascii', () => {
        assert.strictEqual(myExtension.hexToAscii(hex), ascii);
        assert.strictEqual(myExtension.hexToAscii(hex0x), ascii);
        assert.strictEqual(myExtension.hexToAscii(hexCommaSeparated), ascii);
        assert.strictEqual(myExtension.hexToAscii(hex0xCommaSeparated), ascii);
    });

    test('ascii to hex', () => {
        assert.strictEqual(myExtension.asciiToHex(ascii, myExtension.A2H_STD, false), hex);
        assert.strictEqual(myExtension.asciiToHex(ascii, myExtension.A2H_0X0, false), hex0x);
        assert.strictEqual(myExtension.asciiToHex(ascii, myExtension.A2H_STD, true), hexCommaSeparated);
        assert.strictEqual(myExtension.asciiToHex(ascii, myExtension.A2H_0X0, true), hex0xCommaSeparated);
    })
});
