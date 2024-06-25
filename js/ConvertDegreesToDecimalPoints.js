//1. 27° 00' 00"
let deg27 = document.getElementById("deg27");
let mint27 = document.getElementById("mint27");
let sec27 = document.getElementById("sec27");
//2. 30° 00' 00"
let deg30 = document.getElementById("deg30");
let mint30 = document.getElementById("mint30");
let sec30 = document.getElementById("sec30");
//3. Button Reset, Convert
let clearAll = document.getElementById("clearAll");
let convertTo = document.getElementById("convertTo");
//4. outputs 27.0000, 30.0000
let degcon27 = document.getElementById("degcon27");
let mintcon30 = document.getElementById("mintcon30");
//5. Button Copy
let CopyAll = document.getElementById("CopyAll");
//--------------------------------------------------
clearAll.addEventListener("click", () => {
    deg27.value = null
    mint27.value = null
    sec27.value = null
    deg30.value = null
    mint30.value = null
    sec30.value = null
    degcon27.value = null
    mintcon30.value = null
})
convertTo.addEventListener("click", () => {
    var mint127 = mint27.value / 60;
    var sec127 = sec27.value / 3600;
    var deg127 = deg27.value;
    var rs = Number(deg127) + parseFloat(mint127 + sec127);
    let rs1 = parseFloat(rs).toFixed(5);
    degcon27.value = rs1;
    var mint230 = mint30.value / 60;
    var sec230 = sec30.value / 3600;
    var deg230 = deg30.value;
    var rs2 = Number(deg230) + parseFloat(mint230 + sec230);
    let rs3 = parseFloat(rs2).toFixed(5);
    mintcon30.value = rs3;
})
CopyAll.addEventListener("click", () => {
    navigator.clipboard.writeText(mintcon30.value + ", " + degcon27.value);
})