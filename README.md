# gate-plugin
Add [gate](https://gate.ac.uk/) development support to your favorite editor (VS Code only at this time)


## What's New

## Features

Syntax color support

![Syntax color support][logo]

## Extension Settings

There are several extension settings that control unstable features.  
You may enable them to see if they for for you. 

* **loadPipelines**: *boolean* – Control if extension should load pipeline to provide most useful features. See more about pipelines below.
* **enableSymbols**: *boolean*  – Provide symbol to vscode to enable vscode name suggestions and more.
* **enableCompletions**: *boolean*  – Enable code completion in several places like available aliases in rule rhs and known annotation features.
* **enableDefinitions**: *boolean*  – Allows "Go to definition" feature. Only lhs macro can be navigated to for now.


## Concepts

Pipeline


## Roadmap

- [ ] jape file parsing (single/multi phase, only lhs)
- [ ] vscode specific:
  - [x] syntax colorization
  - [ ] references support:
    - [ ] support for workspace jape pipeline
    - [x] symbols list
    - [x] goto macro definition
    - [ ] goto annotation definition
  - [ ] suggestions:
    - [x] alias name suggestions
  - [ ] diagnostics:
    - [ ] syntax error 
    - [ ] reference error reportings

## Release Notes

0.1.0
- basic vscode extension with jape syntax color support
- See [release notes](https://github.com/salterok/gate-plugin/releases/tag/v0.1.0) for more info





[logo]: 
./docs/syntax-color-support.png
"Jape syntax color support"
