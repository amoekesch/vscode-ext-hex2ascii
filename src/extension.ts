import * as vscode from 'vscode';

const A2H_STD = 0;
const A2H_0X0 = 1;
const A2H_0XA = 2;

export function activate(context: vscode.ExtensionContext) {
    /**
     * Handle HEX to ASCII Conversion
     * Auto-detect the type of HEX and convert to human-readable ASCII text
     */
    let disposable1 = vscode.commands.registerCommand('extension.h2a', () => {
        let editor = vscode.window.activeTextEditor;

        // check if an editor is active
        if (editor) {
            // get selected text
            let document = editor.document;
            let selection = editor.selection;

            // select all if none is selected
            if (selection.isEmpty) {
                var firstLine = editor.document.lineAt(0);
                var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                editor.selection = new vscode.Selection(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
                selection = editor.selection;
            }

            // convert
            let hex = document.getText(selection);
            let ascii = hexToAscii(hex);

            // replace text
            editor.edit(editBuilder => {
                editBuilder.replace(selection, ascii);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Standard Conversion 00
     */
    let disposable2 = vscode.commands.registerCommand('extension.a2h', () => {
        let editor = vscode.window.activeTextEditor;

        // check if an editor is active
        if (editor) {
            // get selected text
            let document = editor.document;
            let selection = editor.selection;

            // select all if none is selected
            if (selection.isEmpty) {
                var firstLine = editor.document.lineAt(0);
                var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                editor.selection = new vscode.Selection(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
                selection = editor.selection;
            }

            // convert
            let ascii = document.getText(selection);
            let hex = asciiToHex(ascii, A2H_STD);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Prefixed Version 0x00
     */
    let disposable3 = vscode.commands.registerCommand('extension.a2h0x0', () => {
        let editor = vscode.window.activeTextEditor;

        // check if an editor is active
        if (editor) {
            // get selected text
            let document = editor.document;
            let selection = editor.selection;

            // select all if none is selected
            if (selection.isEmpty) {
                var firstLine = editor.document.lineAt(0);
                var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                editor.selection = new vscode.Selection(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
                selection = editor.selection;
            }

            // convert
            let ascii = document.getText(selection);
            let hex = asciiToHex(ascii, A2H_0X0);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Prefixed/Shortened Version 0xA
     */
    let disposable4 = vscode.commands.registerCommand('extension.a2h0xA', () => {
        let editor = vscode.window.activeTextEditor;

        // check if an editor is active
        if (editor) {
            // get selected text
            let document = editor.document;
            let selection = editor.selection;

            // select all if none is selected
            if (selection.isEmpty) {
                var firstLine = editor.document.lineAt(0);
                var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                editor.selection = new vscode.Selection(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
                selection = editor.selection;
            }

            // convert
            let ascii = document.getText(selection);
            let hex = asciiToHex(ascii, A2H_0XA);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    // register conversion handlers
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
}

export function deactivate() {
    // nothing happening in here
}

// Convert input ascii string to hex string
function asciiToHex(ascii: string, type:Number): string {
    var hex = '';

    // convert character by character
    for (var i = 0; i < ascii.length; i++) {
        var converted = ascii.charCodeAt(i).toString(16).toUpperCase();
        if (type === A2H_0X0 || (type === A2H_0XA && !converted.startsWith('0')) ) {
            converted = '0x' + converted;
        }
        else if (type === A2H_0XA && converted.startsWith('0')) {
            converted = '0x' + converted.substr(1, 1);
        }
        else if (type === A2H_STD && converted.length === 1) {
            converted = '0' + converted;
        }

        // prepend SPACE if not first
        if (i !== 0) {
            converted = ' ' + converted;
        }

        // combine into result
        hex += converted;
    }

    return hex;
}

/**
 * Convert input HEX to ASCII
 * Return original in case of an error
 */
function hexToAscii(hex: string): string {
    var ascii = '';

    // clean string
    let convert = hex.trim();

    // convert all the new lines and tabs
    convert = convert.replace(/(\r)/gm, ' 0D ');
    convert = convert.replace(/(\n)/gm, ' 0A ');
    convert = convert.replace(/(\t)/gm, ' 09 ');

    // detect and convert HEX type
    if (convert.indexOf(' ') > -1) {
        let normalized = '';
        let items = convert.split(' ');
        for (let item of items) {
            if (item.length === 2 && item.match(/[0-9a-fA-F]+/ig)) {
                normalized += item;
            }
            else if (item.length === 3 && item.match(/0[xX][0-9a-fA-F]+/ig)) {
                normalized += '0' + item.substr(2, 1);
            }
            else if (item.length === 4 && item.match(/0[xX][0-9a-fA-F]+/ig)) {
                normalized += item.substr(2, 2);
            }
            else if (item.length !== 0) {
                vscode.window.showErrorMessage('Illegal HEX Format! String will not be converted.');
                return hex;
            }
        }
        convert = normalized;
    }

    // convert
    for (var i = 0; i < convert.length; i += 2) {
        var subStr = convert.substr(i, 2).trim();
        var parsed = parseInt(subStr, 16);
        ascii += String.fromCharCode(parsed);
    }
    return ascii;
}
