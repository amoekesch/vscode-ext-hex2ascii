# Convert HEX Arrays to ASCII and back

![](https://github.com/amoekesch/vscode-ext-hex2ascii/raw/main/demo.gif)

This extension converts HEX Arrays as shown below into ASCII characters and back. Simply select the text to convert and trigger the conversion command.

## Features
Convert any type of HEX Array to ASCII:
```
HEX:
50 6C 61 6E 74 20 74 72 65 65 73

ASCII:
Plant trees
```
Or if prefixed with 0x:
```
HEX:
0x50 0x6C 0x61 0x6E 0x74 0x20 0x74 0x72 0x65 0x65 0x73

ASCII:
Plant trees
```
The plugin can also auto-detect and handle the shortened 0x prefixed version (see 0xa in this example):
```
HEX:
0x50 0x6c 0x61 0x6e 0x74 0x20 0x74 0x72 0x65 0x65 0x73 0xa 0x45 0x61 0x74 0x20 0x42 0x61 0x6e 0x61 0x6e 0x61 0x73

Result:
Plant trees
Eat Bananas
```

Furthermore, the extension converts selected ASCII text to HEX. You can define the desired output type:
* HEX
* 0x-prefixed HEX
* Shortened 0-x prefixed HEX
```
ASCII:
Plant trees

HEX:
0x50 0x6C 0x61 0x6E 0x74 0x20 0x74 0x72 0x65 0x65 0x73
```

## How to use this extension?
Install the extension, select text inside your document (or none to convert the full document) then trigger any of these conversion commands:
* `h2a`: Convert HEX Array to ASCII
* `a2h`: Convert ASCII to HEX Array [00 0F ...]
* `a2h0x0`: Convert ASCII to 0x-prefixed HEX Array [0x00 0x0F ...]
* `h2a0xA`: Convert ASCII to shortened 0x-prefixed HEX Array [0x0 0xF ...]

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
