import * as vscode from 'vscode';

export const A2H_STD = 0;
export const A2H_0X0 = 1;
export const A2H_0XA = 2;

export function activate(context: vscode.ExtensionContext) {
    /**
     * Handle HEX to ASCII Conversion
     * Auto-detect the type of HEX and convert to human-readable ASCII text
     */
    let disposable1 = vscode.commands.registerCommand('extension.h2a', () => {
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const ascii = hexToAscii(document.getText(selection));

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
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_STD, false);

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
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_0X0, false);

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
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_0XA, false);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Standard Conversion 00
     * Comma separated
     */
    let disposable5 = vscode.commands.registerCommand('extension.a2hComma', () => {
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_STD, true);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Prefixed Version 0x00
     * Comma separated
     */
    let disposable6 = vscode.commands.registerCommand('extension.a2h0x0Comma', () => {
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_0X0, true);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, hex);
            });
        }
    });

    /**
     * Handle ASCII to HEX Conversion
     * Prefixed/Shortened Version 0xA
     * Comma separated
     */
    let disposable7 = vscode.commands.registerCommand('extension.a2h0xAComma', () => {
        const editor = vscode.window.activeTextEditor;
        if(editor) {
            const document = editor.document;
            const selection = getSelection(editor);
            const hex = asciiToHex(document.getText(selection), A2H_0XA, true);

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
    context.subscriptions.push(disposable5);
    context.subscriptions.push(disposable6);
    context.subscriptions.push(disposable7);
}

export function deactivate() {
    // nothing happening in here
}

// Convert input ascii string to hex string
export function asciiToHex(ascii: string, type: Number, commaSeparated: boolean): string {
    const separator = commaSeparated
        ? ', '
        : ' ';

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
            converted = separator + converted;
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
export function hexToAscii(hex: string): string {
    var ascii = '';

    // clean string
    let convert = hex.trim();

    // strip commas
    convert = convert.replace(/\,/gm, '');

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

function getSelection(editor: vscode.TextEditor): vscode.Selection {
    // get selected text
    let selection = editor.selection;

    // select all if none is selected
    if (selection.isEmpty) {
        var firstLine = editor.document.lineAt(0);
        var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        editor.selection = new vscode.Selection(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
        selection = editor.selection;
    }

    return selection;
}
