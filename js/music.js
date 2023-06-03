//müzikle ilgili bilgileri yazıcaz

class Music {   //Music objesi
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {   //getName methodu çağrıldığında şarkı başlığı ve sanatçısı gelir
        return this.title + " - " + this.singer;
    }
}

const musicList = [    //Music objesi üzerinden müzik listesi oluşturulur 
    new Music("Set Fire to the Rain", "Adele","1.jpeg","1.mp3"),    
    new Music("Hold Me Closer", "Cornelia Jakobs","2.jpeg","2.mp3"),    
    new Music("Répondez-Moi", "Gjon's Tears","3.jpeg","3.mp3")    
];
