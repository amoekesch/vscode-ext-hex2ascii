# Convert HEX Arrays to ASCII and back

![Plugin Usage](https://github.com/amoekesch/vscode-ext-hex2ascii/raw/main/demo.gif)

This extension converts HEX Arrays as shown below into ASCII characters and back. Simply select the text to convert and trigger the conversion command.

## Features

### Convert HEX Array to ASCII

The plugin detects the type of HEX used and converts each item to its ASCII presentation as can be seen in the examples below.

* HEX to ASCII
  * Original: `50 6C 61 6E 74 20 54 72 65 65 73`
  * Converted: `Plant Trees`
* 0x-prefixed HEX to ASCII Trees`
  * Original: `0x45 0x61 0x74 0x20 0x42 0x61 0x6E 0x61 0x6E 0x61 0x73`
  * Converted: `Eat Bananas`
* Shortened 0x-prefixed HEX to ASCII
  * Original:  `0x53 0x74 0x61 0x79 0x9 0x48 0x65 0x61 0x6C 0x74 0x68 0x79`
  * Converted: `Stay Healthy`
* Comma-separated HEX to ASCII
  * Original: `50, 6C, 61, 6E, 74, 20, 54, 72, 65, 65, 73`
  * Converted: `Plant Trees`
* 0x-prefixed and comma-separated HEX to ASCII Trees`
  * Original: `0x45, 0x61, 0x74, 0x20, 0x42, 0x61, 0x6E, 0x61, 0x6E, 0x61, 0x73`
  * Converted: `Eat Bananas`
* Shortened, 0x-prefixed, and comma-separated HEX to ASCII
  * Original:  `0x53, 0x74, 0x61, 0x79, 0x9, 0x48, 0x65, 0x61, 0x6C, 0x74, 0x68, 0x79`
  * Converted: `Stay Healthy`

### Convert ASCII to HEX Array

The extension converts selected ASCII text to HEX. You can define the desired output type as shown in the example below.

* Original ASCII: `Plant Trees`
* Converted to HEX: `50 6C 61 6E 74 20 54 72 65 65 73`
* Converted to 0x-prefixed HEX `0x50 0x6C 0x61 0x6E 0x74 0x20 0x54 0x72 0x65 0x65 0x73`
* Converted to shortened 0x-prefixed HEX `0x50 0x6C 0x61 0x6E 0x74 0x20 0x54 0x72 0x65 0x65 0x73`
* Converted to comma-separated HEX: `50, 6C, 61, 6E, 74, 20, 54, 72, 65, 65, 73`
* Converted to 0x-prefixed and comma-separated HEX `0x50, 0x6C, 0x61, 0x6E, 0x74, 0x20, 0x54, 0x72, 0x65, 0x65, 0x73`
* Converted to shortened, 0x-prefixed, and comma-separated HEX `0x50, 0x6C, 0x61, 0x6E, 0x74, 0x20, 0x54, 0x72, 0x65, 0x65, 0x73`

## How to use this extension?

Install the extension, select text inside your document (or none to convert the full document) then trigger any of these conversion commands:

* `h2a`: Convert HEX Array to ASCII
* `a2h`: Convert ASCII to HEX Array [00 0F ...]
* `a2h0x0`: Convert ASCII to 0x-prefixed HEX Array [0x00 0x0F ...]
* `h2a0xA`: Convert ASCII to shortened 0x-prefixed HEX Array [0x0 0xF ...]
* `a2hComma`: Convert ASCII to comma-separated HEX Array [00, 0F, ...]
* `a2h0x0Comma`: Convert ASCII to 0x-prefixed and comma-separated HEX Array [0x00, 0x0F, ...]
* `a2h0xAComma`: Convert ASCII to shortened, 0x-prefixed, and comma-separated HEX Array [0x0, 0xF, ...]

## Contributing

* This project welcomes contributions and suggestions. If you are willing to contribute, visit the github repository.
* [Project github Repository](https://github.com/amoekesch/vscode-ext-hex2ascii)

## Known Issues

* [See changelog](https://github.com/amoekesch/vscode-ext-hex2ascii/blob/main/CHANGELOG.md)

## Release Notes

* [See changelog](https://github.com/amoekesch/vscode-ext-hex2ascii/blob/main/CHANGELOG.md)

## Attribution

* Icon made by [iconixar]([https://www.flaticon.com/authors/iconixar]) from [Flaticon](https://www.flaticon.com/)
* Extension inspired by [Youngrok](https://github.com/yrpark99/hex-ascii-converter)
