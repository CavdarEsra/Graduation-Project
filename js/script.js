const quiz = new Quiz(sorular);
const ui = new UI();


//start butonuna tıklayınca soru kutusu gelir
ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    startTimer(10);
    startTimerLine();
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");  //sonraki soru butonu görünmesin
});





//sonraki soru butonuna tıklayınca yeni sorular gelir
ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {   //soru var mı diye bakar varsa 1 arttırır
        quiz.soruIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);    //yeni soruda süre temizlenip yeniden başlatılır
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btn_next.classList.remove("show");    //sonraki soru butonu görünmesin
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});






ui.btn_quit.addEventListener("click", function() {
    window.location.reload();   //testi bitir butonuna tıklandığında sayfa tekrar yüklenir
});







ui.btn_replay.addEventListener("click", function() {  //testi tekrar çalıştırdığında
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();        //'tekrar' butonuna tıklayınca quiz tekrar çalıştırılır,bilgiler sıfırlanır da başlar
    ui.score_box.classList.remove("active"); //aktif olan score kutusu kapatılır ki 1.soruya geri dönüp göstersin
});







//tıklanan elemanı alır
function optionSelected(option) {  
    clearInterval(counter);    //seçim yaptığımız anda süre durdurulur
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {    //seçilen cevap doğru ise correct classı(yeşil) özellikleri eklenir
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    //kullanıcıya tek şık seçmesini sağlattı. seçilen haricindekileri disabled yaparak
    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }
    // bi seçeenek seçildiğinde sonraki soru butonu görünsün
    ui.btn_next.classList.add("show");
}







let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);  //timer metodunu 1 sn de bir çağırır

    function timer() {
        ui.time_second.textContent = time;   //kaç saniye yazdıysak ordan başlar
        time--;

        if(time < 0) {
            clearInterval(counter);   //setInterval metodu temizlenmiş olur,saniye 0 ın altına indiği zaman. 0 a gelince süre biter

            ui.time_text.textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children) {  //şıkları dolaşır. 

                if(option.querySelector("span b").textContent == cevap) {   //şıkların olduğu b tagı içindeki cevap ile doğru cevabı karşılaştırır 
                    option.classList.add("correct");   //cevap doğruysa yeşil olur ve tik işareti çıkar
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                }

                option.classList.add("disabled");   //diğer şıkları tıklayamaz
            }

            ui.btn_next.classList.add("show");   //sonraki soru butonu gelir
        }
    }
}








let counterLine;
function startTimerLine() {   //süre çubuğu
    let line_width = 0;       //başlangıçta 0 

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;
        ui.time_line.style.width = line_width + "px";

        if(line_width > 549) {   //genişliği kutu kadar olunca durur
            clearInterval(counterLine);
        }
    }
}


