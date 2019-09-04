const fs = require('fs');
fs.readFile("./3.csv", (err, data)=> {
    var a = [];
    var index = [];
    var allLines = data.toString().split('\n');
    allLines.forEach(line => {
        var elements = line.split(',');
        if (!index.includes(elements[2])) {
            index.push(elements[2]);
        }
        a.push({
            x: parseInt(elements[0]) - 1,
            y: parseInt(elements[1]) - 1,
            z: index.indexOf(elements[2]),
        });
    });
    fs.writeFile("./3.js", JSON.stringify({
        medicineInfo: index,
        stems: [...'甲乙丙丁戊己庚辛壬癸'],
        branches: [...'子丑寅卯辰巳午未申酉戌亥'],
        data: a,
    }), (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('done');
    })
});
