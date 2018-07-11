rem @echo off

rmdir "./out/parser" /s /q

call ./node_modules/.bin/antlr4ts -visitor -no-listener -o ./src/parser ./src/JapeLexer.g4
call ./node_modules/.bin/antlr4ts -visitor -no-listener -o ./src/parser ./src/JapeParser.g4

rem call antlr4 -Dlanguage=JavaScript -visitor -o ./out/parser ./src/JapeLexer.g4
rem call antlr4 -Dlanguage=JavaScript -visitor -o ./out/parser ./src/JapeParser.g4
