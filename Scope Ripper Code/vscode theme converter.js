var fs = require('fs');
var XMLWriter = require('xml-writer');

xw = new XMLWriter(true);

function defineScope(name, color, fontStyle) {
    xw.startElement('dict');
    xw.startElement('key');
    xw.text('scope');
    xw.endElement( /*key*/ );
    xw.startElement('string');
    xw.text(name);
    xw.endElement( /*string*/ );
    xw.startElement('key');
    xw.text('settings');
    xw.endElement( /*key*/ );
    xw.startElement('dict');
    
    if (color) {
        xw.startElement('key');
        xw.text('foreground');
        xw.endElement( /*key*/ );
        xw.startElement('string');
        xw.text(color);
        xw.endElement( /*string*/ );
    }
    if (fontStyle) {
        xw.startElement('key');
        xw.text('fontStyle');
        xw.endElement( /*key*/ );
        xw.startElement('string');
        xw.text(fontStyle);
        xw.endElement( /*string*/ );
    }
    
    xw.endElement( /*dict*/ );
    xw.endElement( /*dict*/ );
}

fs.readFile("C:\\Program Files (x86)\\Microsoft VS Code\\resources\\app\\extensions\\theme-defaults\\themes\\light_vs.json", 'utf8', function(err, data) {
    if (err) return console.log(err);

    JSON.parse(data).tokenColors.forEach(function(element) {
        var color = element.settings.foreground;
        var fontStyle = element.settings.fontStyle;
        if (Array.isArray(element.scope)) {
            element.scope.forEach(function(scopeElement) {
                defineScope(scopeElement, color, fontStyle);
            });
        } else {
            defineScope(element.scope, color, fontStyle);
        }

    });
    fs.writeFile("output.xml", xw.toString(), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});