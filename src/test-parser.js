

const fs = require("fs");

const antlr4 = require("antlr4");
const antlr4ts = require("antlr4ts");

const source = fs.readFileSync("E:\\Projects\\plugins\\gate-jape-plugin\\examples\\e1.jape", { encoding: "utf-8" });

const JapeParserVisitor = require("./JapeParserVisitor").JapeParserVisitor;

function test() {
    require.cache = {};
    var cLexer = require("./parser/JapeLexer");
    var cParser = require("./parser/JapeParser");

    console.time("a");
    // var chars = new antlr4.InputStream(source);
    var chars = new antlr4ts.ANTLRInputStream(source);
    var lexer = new cLexer.JapeLexer(chars);
    var tokens = new antlr4ts.CommonTokenStream(lexer);
    var parser = new cParser.JapeParser(tokens);
    // parser.buildParseTrees = true;
    // parser.buildParseTree(true);

    // parser.addParseVisitor(new JapeParserVisitor());
    // parser.addParseListener(new li());

    const tree = parser.program();

    const visitor = new JapeParserVisitor();
    

    const result = visitor.visit(tree);
    
    console.timeEnd("a");
    console.log(result);

    return [parser, tokens, visitor];
    // var tree = parser.keyword();
}

global.test = test;

setInterval(() => {}, 1000);