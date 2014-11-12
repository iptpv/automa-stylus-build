var stylus = require('stylus'),
    vow = require('vow'),
    autoprefixer = require('autoprefixer-stylus'),
    csso = require('csso-stylus');

/**
 *  компилирует строки styl -> css
 *  @returns {Promise}
 *  @param stylusString - stylus-строка
 *  @param mixin - путь к миксинам
 */
module.exports = function(stylusString, mixin) {
    var defer = vow.defer();
    stylus(stylusString)
        .import(mixin)
        .define('url', stylus.resolver())
        .define('embedurl', stylus.url({limit: false}))
        .use(autoprefixer())
        .use(csso())
        .render(function(err, css){
            if (err) {
                console.log(err);
            } else {
                defer.resolve(css);
            }
        });
    return defer.promise();
};