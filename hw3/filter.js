const fs = require("fs");
let numbers = [];
let out = '';
let out2 = '';
fs.readFile("data.txt", "utf8",
    function(error,data){
        numbers = data.split(' ');
        for (let elem of numbers){
            if (elem % 2 === 0){
                out += ' ' + elem;
            }
            out2 += ' ' + Math.pow(elem, 3);

        }
        fs.writeFile("out-1.txt", out, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            }
        )
        fs.writeFile("out-2.txt", out2, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            }
        )
    });

// fs.writeFileSync("out-1.txt", out);