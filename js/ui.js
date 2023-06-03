function UI() {
    this.btn_start = document.querySelector(".btn_start"),  
    this.btn_next = document.querySelector(".next_btn"),
    this.btn_replay = document.querySelector(".btn_replay"),
    this.btn_quit = document.querySelector(".btn_quit"),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.score_box = document.querySelector(".score_box"),
    this.option_list = document.querySelector(".option_list"),
    this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>',
    this.incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>',
    this.time_text = document.querySelector(".time_text"),
    this.time_second = document.querySelector(".time_second"),
    this.time_line = document.querySelector(".time_line")
}




UI.prototype.soruGoster = function(soru) {
    let question = `<span>${soru.soruMetni}</span>`;  //soru(option) kısmı
    let options = '';

    for(let cevap in soru.cevapSecenekleri) {   //her cevap bilgisi a,b,c ye karşılık gelir
        options += 
            `
                <div class="option"> 
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
                </div>
            `;
    }
    document.querySelector(".question_text").innerHTML = question;
    this.option_list.innerHTML = options;

    const option = this.option_list.querySelectorAll(".option");  //bütün seçenekleri yani optionları option-liste attık , bu liste elemanları üzerinde dolaşabiliriz

    for(let opt of option) {   //her bir optionu tek tek ele geçirip event ekler
        opt.setAttribute("onclick", "optionSelected(this)")
          //event sonucunda metod çağrılır. O da optionSelected(this); burdaki seçeneğin seçilme durumunu verir. seçiliyse olduğu divi gönderir
    }
}





UI.prototype.soruSayisiniGoster = function(soruSirasi, toplamSoru) {
    let tag = `<span class="badge">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
    //içeriğin gösterilmesi için selector oluşturulup ilgili konuma yerleştiririz. quiz_box altındaki question_index içerisine oluşturduğumuz tag bilgisini yapıştırırız
}







UI.prototype.skoruGoster = function(toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}