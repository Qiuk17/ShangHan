const fs = require('fs');
fs.readFile("./imp.csv", (err, data)=> {
    var a = [];
    var index = [];
    var allLines = data.toString().split('\r\n');
    allLines.forEach(line => {
        var elements = line.split(',');
        let med = elements[2];
        if (med === '暂缺') return;
        if (med !== '见上' && !index.includes(med)) {
            index.push(med);
        }
        a.push({
            x: parseInt(elements[0]) - 1,
            y: parseInt(elements[1]) - 1,
            z: med === '见上' ? a[a.length - 1].z : index.indexOf(med),
        });
    });
    fs.writeFile("./3.js", "export default " + JSON.stringify({
        medicineInfo: index,
        //stems: [...'甲乙丙丁戊己庚辛壬癸'],
        //branches: [...'子丑寅卯辰巳午未申酉戌亥'],
        data: a,
    }), (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('done');
    })
});
