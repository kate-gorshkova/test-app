const sass = require('node-sass');
const fs = require('fs');

const dir = './dist';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

sass.render({
    file: 'scss/main.scss'
}, function(error, result) {
    console.log(result);
    if(!error){
        fs.writeFile('dist/app.css', result.css, function(err){
            if(!err){
                return console.log(err);
            }
        });
    } else {
        console.log(error);
    }
});
