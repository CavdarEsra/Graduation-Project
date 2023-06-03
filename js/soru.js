function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap
}

let sorular = [
    new Soru("1-Hangi hayvanların burun izleri, insanların parmak izleri gibi eşsizdir?", { a: "Kedi", b: "Kaplumbağa", c: "Köpek" , d: "Tavşan" }, "c"),
    new Soru("2-Hangi hayvanın tat alma duyuları ayaklarındadır?", { a: "Arı", b: "Uğur Böceği", c: "Sincap", d: "Kelebek" }, "d"),
    new Soru("3-Uyurken birbirlerinden ayrı düşmemek için el ele tutuşan hayvan hangisidir?", { a: "Su Samuru", b: "Penguen", c: "Panda", d: "Koala" }, "a"),
    new Soru("4-Sivrisineklerin kaç dişi vardır?", { a: "0", b: "16", c: "55", d: "47" }, "d")
];