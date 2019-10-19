### How to Use
InWord works with it jQuery and Bootstrap. After Jquery and Bootstrap, just add the inword.js and inword.css, and see the magic!
    <!-- CSS-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="inword.css">

    <!-- SCRIPT-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="inword.js"></script>

### Basic Usage
Just add <code>$('element').inword()</code> to your DOM element, and nothing else!

### Key Features
* Three Different Styles, use which you require!
* Responsive Design/Mobile Friendly
* All Modern Browser Compatibility
* Up to Trillion support
* Negative Figure, Decimal Point detection
* Prefix/Suffix Support
* Case Utilization Support
* Full Customization is possible

### Extended Usage
```
$('elements').inwords({
    type: "helper",                     //default#helper, tooltip, placer
    value: null,                        //if value is given, it will be override origina value
    position: "right",                  //applicable for 'tooltip/helper' only; values : right, left, top, bottom; default: right
    color: "#ffffff",
    backgroundColor: "#47a3da",         
    prefix: null,
    suffix: null,
    placerId: null,                     //DOM id where you want to show the placer, applicable for placer only
    hover: false,                       //applicable for non-input element only
    case: 'ucfirst',                    //ucfirst, upper, lower
    wordJoiner: '-',                    //twenty-five, forty-five, if revoked twenty five, forty five
    thousandSeperator: '',              //nine thousand four hundred sixty, if ',' given, nine thousand, four hundred sixty
    ignoreDecimal: false,               //decimal value will not be shown
});
 ```
### Disabled Input
InWord has nothing to do with the disabled Input, in such case, take the disabled input inside any DOM element i.e. span, div etc. and define the value and other properties applied on the parent DOM element 
```
<span class="d-inline-block" id="disabledHelper">
    <input type="number" class="form-control" disabled value="546898">
</span>

$('#disabledHelper').inword({value: 546898})
```                     
### Full Documentation
<table class="table table-bordered">
    <thead>
        <tr>
            <th class="text-center">Parameter</th>
            <th class="text-center">Data Type</th>
            <th class="text-center">Values</th>
            <th class="text-center">Default</th>
            <th class="text-center">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="text-center">type</td>
            <td class="text-center">string</td>
            <td>helper&nbsp;|&nbsp;tooltip&nbsp;|&nbsp;placer</td>
            <td class="text-center">helper</td>
            <td></td>
        </tr>
        <tr>
            <td class="text-center">value</td>
            <td class="text-center">numeric</td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td>If 'value' is given, it will ignore the original value of the DOM and this value
                will be shown in words
            </td>
        </tr>
        <tr>
            <td class="text-center">position</td>
            <td class="text-center">string</td>
            <td class="text-center">right&nbsp;|&nbsp;left&nbsp;|&nbsp;top&nbsp;|&nbsp;bottom
            </td>
            <td class="text-center">right</td>
            <td>applicable for type helper & tooltip, defines which position in words will be
                shown
            </td>
        </tr>
        <tr>
            <td class="text-center">color</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center">#fff</td>
            <td>text color, any valid hex color code</td>
        </tr>
        <tr>
            <td class="text-center">backgroundColor</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center">#47a3da</td>
            <td>background color, any valid hex color code</td>
        </tr>
        <tr>
            <td class="text-center">prefix</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center"></td>
            <td>prefix will be shown at the front of in words, useful for showing data like '$
                forty five'</td>
        </tr>
        <tr>
            <td class="text-center">suffix</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center"></td>
            <td>prefix will be shown at the end of in words, useful for showing data like 'forty
                five only'</td>
        </tr>
        <tr>
            <td class="text-center">placerId</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center"></td>
            <td>
                applicable for 'placer' only, DOM ID of where to show the inwords value. If this
                value is given, in word will be shown inside this element in your page. Inword
                does not handle any event/design of this element except showing the word value
                inside this
                element, for any event/design i.e. show/hide this element, user must do it by
                himself
            </td>
        </tr>
        <tr>
            <td class="text-center">hover</td>
            <td class="text-center">boolean</td>
            <td class="text-center">true&nbsp;|&nbsp;false</td>
            <td class="text-center">false</td>
            <td>applicalble for only non-input element, decide whether to show Inword on the
                hover of the element</td>
        </tr>
        <tr>
            <td class="text-center">case</td>
            <td class="text-center">string</td>
            <td>ucfirst&nbsp;|&nbsp;upper&nbsp;|&nbsp;lower</td>
            <td class="text-center">ucfirst</td>
            <td>handle word case of Inwords</td>
        </tr>
        <tr>
            <td class="text-center">wordJoiner</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center">-</td>
            <td>
                shows Inwords like 'twenty-five', 'forty-five', if empty string '' is given for
                this value, Inwords will be shown as 'twenty five', 'forty five'
            </td>
        </tr>
        <tr>
            <td class="text-center">thousandSeperator</td>
            <td class="text-center">string</td>
            <td></td>
            <td class="text-center"></td>
            <td>
                shows Inwords like 'nine thousand four hundred sixty', if ',' given for this
                value, 'nine thousand, four hundred sixty'
            </td>
        </tr>
        <tr>
            <td class="text-center">ignoreDecimal</td>
            <td class="text-center">boolean</td>
            <td class="text-center">true&nbsp;|&nbsp;false</td>
            <td class="text-center">false</td>
            <td>
                if true, decimal value will not be shown
            </td>
        </tr>
    </tbody>
</table>
