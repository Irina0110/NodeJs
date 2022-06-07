const fs = require("fs");
let numbers = [];
let out = [];
let out2 = [];
let str1, str2;
fs.readFile("data.txt", "utf8",
    function(error,data){
        numbers = data.split(' ');
        for (let elem of numbers){
            if (elem % 2 === 0){
                out.push(elem);
            }
            out2.push(Math.pow(elem, 3));

        }
        str1 = out.join(' ');
        str2 = out2.join(' ');
        fs.writeFile("out-1.txt", str1, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            }
        )
        fs.writeFile("out-2.txt", str2, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            }
        )
    });

// fs.writeFileSync("out-1.txt", out);