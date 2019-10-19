/*!
 * Inword v1.0.0 (https://bibachona.com/inword)
 * Release: 18th Oct, 2019
 * Author : Khondoker Khalid Jahangir
 *  */

(function ($) {

    $.fn.inword = function (options = null) {

        var options = $.extend({
            // These are the defaults.
            type: "helper",                         //default#helper, tooltip, placer
            value: null,                            //if value is given, it will be override origina value
            position: "right",                      //applicable for 'tooltip/helper' only; values : right, left, top, bottom; default: right
            color: "#ffffff",
            backgroundColor: "#47a3da",
            prefix: null,
            suffix: null,
            placerId: null,                         //DOM id where you want to show the placer, applicable for placer only
            hover: false,                           //applicable for non-element input only
            case: 'ucfirst',                        //ucfirst, upper, lower
            wordJoiner: '-',                        //twenty-five, forty-five, if revoked twenty five, forty five
            thousandSeperator: '',                  //nine thousand four hundred sixty, if ',' given, nine thousand, four hundred sixty
            ignoreDecimal: false,                   //decimal value will not be shown
        }, options);

        /************************** Data Validation  :: START **************************************/

        if ($.inArray(options.type, ['helper', 'tooltip', 'placer']) === -1) { throw new TypeError('Invalid type ' + options.type) };
        if (options.value !== null && typeof options.value !== 'number') throw new TypeError('Value must be number, ' + options.value + ' given');
        if ($.inArray(options.position, ['right', 'left', 'top', 'bottom']) === -1) { throw new TypeError('Invalid position ' + options.position) };
        if (!options.color.match(/^#[0-9a-f]{3,6}$/i)) { throw new TypeError('Invalid color hex code ' + options.color) };
        if (!options.backgroundColor.match(/^#[0-9a-f]{3,6}$/i)) { throw new TypeError('Invalid backgroundColor hex code ' + options.backgroundColor) };
        if (options.prefix !== null && typeof options.prefix !== 'string') throw new TypeError('Prefix must be string, ' + typeof options.prefix + ' given');
        if (options.suffix !== null && typeof options.suffix !== 'string') throw new TypeError('Suffix must be string, ' + typeof options.suffix + ' given');
        if (options.placerId !== null && options.type !== 'placer') throw new TypeError('placerId only works with type:placer, ' + options.type + ' given');
        if (options.placerId !== null && typeof options.placerId !== 'string') throw new TypeError('placerId must be string, ' + typeof options.suffix + ' given');
        if ($.inArray(options.case, ['ucfirst', 'upper', 'lower']) === -1) { throw new TypeError('Invalid case ' + options.case) };
        if (options.wordJoiner !== null && typeof options.wordJoiner !== 'string') throw new TypeError('wordJoiner must be string, ' + typeof options.wordJoiner + ' given');
        if (options.thousandSeperator !== null && typeof options.thousandSeperator !== 'string') throw new TypeError('thousandSeperator must be string, ' + typeof options.thousandSeperator + ' given');

        /************************** Data Validation  :: END **************************************/

        /****************** Converts Number to Word  :: START **************************************/

        var isFinite = function (value) {
            return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
        }

        var TEN = 10;
        var ONE_HUNDRED = 100;
        var ONE_THOUSAND = 1000;
        var ONE_MILLION = 1000000;
        var ONE_BILLION = 1000000000;               //          1.000.000.000 (9)
        var ONE_TRILLION = 1000000000000;           //     1.000.000.000.000 (12)
        var ONE_QUADRILLION = 1000000000000000;     // 1.000.000.000.000.000 (15)
        var MAX = 9007199254740992;                 // 9.007.199.254.740.992 (15)

        var LESS_THAN_TWENTY = [
            'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];

        var TENTHS_LESS_THAN_HUNDRED = [
            'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];

        /**
         * Converts an integer into words.
         * If number is decimal, the decimals will be removed.
         * @example toWords(12) => 'twelve'
         * @param {number|string} number
         * @returns {string}
         */
        var toWords = function (number) {

            //before decimal part
            var words;
            var num = parseInt(number, 10);
            if (!isFinite(num)) throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
            words = generateWords(num);
            var target = (options.prefix != null ? options.prefix : '') + ' ' + words +
                ' ' + (options.suffix != null ? options.suffix : '');

            //after decimal part
            if (!options.ignoreDecimal) {
                var numArr = number.split(".");
                if (typeof numArr[1] != 'undefined') {
                    var decimals = numArr[1];
                    var str = ' point ';
                    var i;
                    for (i = 0; i < decimals.length; i++) {
                        str += (LESS_THAN_TWENTY[decimals[i]] + ' ');
                    }
                    target += str;
                }
            }

            return target;
        }

        var toTitleCase = function (str) {
            return str.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }

        var generateWords = function (number) {
            var remainder, word,
                words = arguments[1];

            // We’re done
            if (number === 0) {
                return !words ? 'zero' : words.join(' ').replace(/,$/, '');
            }
            // First run
            if (!words) {
                words = [];
            }
            // If negative, prepend “minus”
            if (number < 0) {
                words.push('minus');
                number = Math.abs(number);
            }

            if (number < 20) {
                remainder = 0;
                word = LESS_THAN_TWENTY[number];

            } else if (number < ONE_HUNDRED) {
                remainder = number % TEN;
                word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
                // In case of remainder, we need to handle it here to be able to add the “-”
                if (remainder) {
                    word += options.wordJoiner + LESS_THAN_TWENTY[remainder];
                    remainder = 0;
                }

            } else if (number < ONE_THOUSAND) {
                remainder = number % ONE_HUNDRED;
                word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

            } else if (number < ONE_MILLION) {
                remainder = number % ONE_THOUSAND;
                word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand' + options.thousandSeperator;

            } else if (number < ONE_BILLION) {
                remainder = number % ONE_MILLION;
                word = generateWords(Math.floor(number / ONE_MILLION)) + ' million' + options.thousandSeperator;

            } else if (number < ONE_TRILLION) {
                remainder = number % ONE_BILLION;
                word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion' + options.thousandSeperator;

            } else if (number < ONE_QUADRILLION) {
                remainder = number % ONE_TRILLION;
                word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion' + options.thousandSeperator;

            } else if (number <= MAX) {
                remainder = number % ONE_QUADRILLION;
                word = generateWords(Math.floor(number / ONE_QUADRILLION)) +
                    ' quadrillion' + options.thousandSeperator;
            }

            words.push(word);
            return generateWords(remainder, words);
        }

        /****************** Converts Number to Word  :: END **************************************/

        var helperDiv = 'helper' + options.position.replace(/^./, options.position[0].toUpperCase());

        var setValue = function (e) {
            var value;

            if (options.value !== null) {
                value = options.value.toString();
            } else if ($(e).is('input')) {
                value = filterValue(e.value);
            } else {
                value = filterValue($(e).html());
            }
            return value
        }

        var showInWords = function (e) {

            var identifier = $(e).attr('data-in-word');
            var holder = (options.placerId == null) ? 'inWord-' + identifier : options.placerId;
            var value = setValue(e);

            if (value != '') {
                var amountInWord = toWords(value);

                if (options.case === 'ucfirst') {
                    amountInWord = toTitleCase(amountInWord);
                } else if (options.case === 'upper') {
                    amountInWord = amountInWord.toUpperCase();
                } else if (options.case === 'lower') {
                    amountInWord = amountInWord.toLowerCase();
                }

                switch (options.type) {
                    case 'placer':
                        $('#' + holder).html(amountInWord).show();
                        break;
                    case 'tooltip':
                        $('[data-in-word=' + identifier + ']').attr('data-original-title', amountInWord).tooltip('show');
                        break;
                    default:
                        console.log(options.color);
                        $('.helper').css({ 'background-color': options.backgroundColor, 'color': options.color });
                        //$('.helper').css({'font-size': Math.random()});
                        $('#' + helperDiv).html(amountInWord);
                        $('#' + helperDiv).addClass('helper-open');
                }
            } else {
                switch (options.type) {
                    case 'placer':
                        $('#' + holder).html('');
                        break;
                    case 'tooltip':
                        $('[data-in-word=' + identifier + ']').attr('data-original-title', '').tooltip('hide');
                        break;
                    default:
                        $('#' + helperDiv + ' span').html('');
                        $('#' + helperDiv).removeClass('helper-open');
                }
            }
        }

        var filterValue = function (val) {
            return val.replace(',', '');
        }

        var uuid = function () {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }

        var clearInWords = function (obj = null) {
            if (options.type == 'placer') {
                var identifier = $(obj).attr('data-in-word');
                if (options.placerId == null) {
                    $('#inWord-' + identifier).html('').hide();
                }
            } else if (options.type == 'helper') {
                $('#helperRight').removeClass('helper-open');
                $('#helperLeft').removeClass('helper-open');
                $('#helperTop').removeClass('helper-open');
                $('#helperBottom').removeClass('helper-open');
            }
        }

        //Prepare
        $(this).each(function (i) {

            switch (options.type) {

                case 'placer':

                    var uniqueId = uuid();
                    $(this).attr('data-in-word', uniqueId);
                    //$(this).addClass('data-in-word-' + uniqueId);
                    if (options.placerId == null) {
                        if ($(this).is('input')) {
                            $(this).after('<span class="help-block" id="inWord-' + uniqueId + '"></span>');
                        } else {
                            $(this).append('<span class="help-block" id="inWord-' + uniqueId + '"></span>');
                        }
                    }

                    break;

                case 'tooltip':

                    var uniqueId = uuid();
                    $(this).attr('data-in-word', uniqueId);
                    var value = setValue(this);
                    if (value != '') {
                        var amountInWord = toWords(value);
                        $(this).attr('data-original-title', amountInWord);
                    }
                    $(this).attr('data-placement', options.position);
                    var backGroundCss = arrowCss = '';

                    if (options.backgroundColor != '#47a3da') {
                        backGroundCss += 'background-color: ' + options.backgroundColor + '; ';
                        arrowCss = '[data-in-word="' + uniqueId + '"] + .tooltip > .tooltip-arrow {border-' + options.position + '-color: ' + options.backgroundColor + '}';
                    }

                    if (options.color != '#ffffff') {
                        backGroundCss += 'color: ' + options.color + ';';
                    }

                    if (backGroundCss !== '') {
                        $('body').append('<style type="text/css" data-ref="' + uniqueId + '">[data-in-word="' + uniqueId + '"] + .tooltip > .tooltip-inner {' + backGroundCss + '} ' + arrowCss + '</style>');
                    }

                    $(this).tooltip();

                    break;

                default:

                    var helperAlignment = {
                        'right': 'vertical',
                        'left': 'vertical',
                        'top': 'horizontal',
                        'bottom': 'horizontal'
                    };

                    if ($('#' + helperDiv).length == 0) {
                        $('body').append('<nav class="helper helper-' + helperAlignment[options.position] + ' helper-' + options.position + '" id="' + helperDiv + '"></nav>');
                    }
            }

        });

        if ($(this).is('input')) {

            //On Focus
            $(this).focus(function () {
                showInWords(this);
            });

        } else {
            if (options.hover) {

                if (options.type == 'helper' || options.type == 'placer') {
                    //On Mouse Enter
                    $(this).mouseenter(function () {
                        showInWords(this);
                    });
                }

            } else {
                //On Click
                $(this).click(function () {
                    showInWords(this);
                });
            }

            //On Mouse Leave
            $(this).mouseleave(function () {
                clearInWords(this);
            });
        }

        //On Blur
        $(this).blur(function () {
            clearInWords(this);
        });

        //Change
        $(this).bind("change keyup input", function () {
            showInWords(this);
        });

    };

}(jQuery));