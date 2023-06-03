//projeyi işlevsel hale getirecek kısımları kullanacak 

//Alttakiler html sayfasında tanımlı id ve classları burada kullanabilmek için çağırıyoruz
const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .titlee");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector(".ull");


//Music objesi üzerinde musicList oluşturuldu. musicPlayer içerisine musicList atıldı.
const player = new MusicPlayer(musicList);   

window.addEventListener("load", () => {   //sayfa yüklendiğinde gösterilecekler
    let music = player.getMusic();   //gelecek olan müzik
    displayMusic(music);   //resim,şarkı adı,şarkıcı vs bu fonksiyon ile getirilir gösterilir
    displayMusicList(player.musicList);  //alttaki müzik listesini set ettik
    isPlayingNow();   //o anda hangi müzik çalıyorsa onun arkası mavi olsun diye bu fonksiyon çağrılır. bir sonraki bir önceki seçildiğinde de bu etkin olması için oralarda da çağrılır
});

function displayMusic(music) {
    title.innerText = music.getName();   //music clası içindeki özellikleri yazıyoruz
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;   //mp3 clası altındakileri sırayla alır
}

play.addEventListener("click", () => {   //müziği çaldırma kısmı(play tuşuna tıklandığında)
    const isMusicPlay = container.classList.contains("playing");  //container divinde playing clası varsa true döndürür
    isMusicPlay ? pauseMusic() : playMusic();   //true ise müziği durdur, false ise müziği çal fonksiyonları çalıştırılır
});

prev.addEventListener("click", () => { prevMusic(); });  //önceki müziğe geçiş fonkiyonu çağrılır

next.addEventListener("click", () => { nextMusic(); });  //sonraki müziğe geçiş fonkiyonu çağrılır

const prevMusic = () => {  
    player.prev();   //bir önceki müziğe geçer
    let music = player.getMusic();   //müzik bilgisini tekrar alır ve gösterir
    displayMusic(music);  //aldığımız müzik bilgisini displaymusice gönderdik
    playMusic();
    isPlayingNow();
}

const nextMusic = () => { 
    player.next();   //sonraki müziğe geçiş. indexi  arttırır
    let music = player.getMusic();  //müzik ad,şarkıcı getirir
    displayMusic(music);  //müzik resmi vs getiren fonk
    playMusic();   //müziği çalıştırır
    isPlayingNow();
}

const pauseMusic = () => {   //pause a tıkladıysak
    container.classList.remove("playing");   //container divinde olan playing clasını siler
    play.querySelector("i").classList = "fa-solid fa-play";   //ikon değişir
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing");  //çalma moduna geçtiğimiz için playing clası eklenir
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}
//audiodan gelen müziğin saniye biçiminde uzunluğunu düzenler
const calculateTime = (toplamSaniye) => {   //arrow function tanımlaması
    const dakika = Math.floor(toplamSaniye / 60); 
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}
//audio kontrolü için tetiklenen event: loadedmetadata. müziğin bağlandığını kontrol ediyor
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);  
    progressBar.max = Math.floor(audio.duration);   //progres bar max uzunluğu
});

audio.addEventListener("timeupdate", () => {  //saniye geçtiği sürece yapılacaklar buraya yazılır
    progressBar.value = Math.floor(audio.currentTime);  //currentTime müzik hangi saniyede ise o saniye gelir
    currentTime.textContent = calculateTime(progressBar.value);  //saniye ile progres bar ilerler
});

progressBar.addEventListener("input", () => {   //progres üzerinde herhangi bir yere konumlandığımızda
    currentTime.textContent = calculateTime(progressBar.value);  //progres barda hangi konuma tıkladıysak saniye yazan kısım da değişir
    audio.currentTime = progressBar.value;  //müziğin zamanını da konumlandığımız yere alır ordan çalmaya devam edecek
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {  //barın durumunu alabilmek için e kullandık.
    const value = e.target.value;   //barın o anki değeri  
    audio.volume = value / 100;   //barda tıkladığımız kadar ses gelir
    
    //barda 0 a tıklarsak olacaklar(ikon sessiz olur vs)
    if(value == 0) {   
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(sesDurumu==="sesli") {  // ses açıkken kısılır, kısıkken açılır
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;  //ses kısıldığında ses barı da sıfırlanır
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {  //listenin tüm elemanlarını gez bunları li olarak göster
    for(let i=0; i < list.length; i++) {

        //li-index='${i}' : hangi müziği seçtiğimizi anlayabilmek için indis numarası alabilmek için, bununla hangi müziği çalacağını ayarlarız
        //onclick="selectedMusic(this)" : herhangi bir liste elamanına tıklama durumu

        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center" >
                <span>${list[i].getName()}</span>  
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>  
            </li>
        `;
        //üst satırda audio ile başlayan tag; indis nosuna göre mp3 dosyasını getirir. 

        ul.insertAdjacentHTML("beforeend", liTag);  //her aldığımız ul elemanını sona doğru ekler

          //audio dan duration bilgisini alıyoruz
        let liAudioDuration = ul.querySelector(`#music-${i}`);  //li içindeki src yi alıp duration içine atar
        let liAudioTag = ul.querySelector(`.music-${i}`);   // li yi spanla ilişkilendirdik


        //şarkı ismi yanında süresini gösteren kısım
        liAudioTag.addEventListener("loadeddata", () => {  //audio elementine bağlandıktan sonra bilgilerine ulaşabiliriz
            liAudioDuration.innerText = calculateTime(liAudioTag.duration); //liste elemanı içindeki süre bilgisini liAudioDuration - span bilgisini aktarıcaz
        });

    }
}

//3 çizgili butona tıkladığımızda çıkan listeden birini seçilen müzik çalar
const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");    //seçtiğimiz müziğin indis nosu ile playerdakini set ediyoruz
    displayMusic(player.getMusic());  //müzik bilgileri gösterilecek
    playMusic();  //seçilen çalar
    isPlayingNow();
}

const isPlayingNow = () => {   //müzik çalıyor mu?
    for(let li of ul.querySelectorAll("li")) {  //tüm liste elemanlarını dolaşır
        if(li.classList.contains("playing")) {   //ilgili elemanda playing clası var mı diye contains ile kontrol ediyoruz. varsa true döndürür
            li.classList.remove("playing");  //varsa playing clasını sileriz
        }

        if(li.getAttribute("li-index") == player.index) {   //ulaştığımız linin indexini getAttribute ile alıyoruz. o anda çalan şarkının indisi ile eşitse o müzik o anda çalıyordur
            li.classList.add("playing");  //çalınan müzik varsa playing clası eklenir , bu da arka zeminini mavi yapar
        }
    }
}

audio.addEventListener("ended", () => {  //müzik bittiyse yeni müziğe geçer
    nextMusic();
})