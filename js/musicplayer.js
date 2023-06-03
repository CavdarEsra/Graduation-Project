//müziği işlevsel hale getirecek kısımlar

class MusicPlayer {
    constructor(musicList) {   //musiclistesini dışardan alır
        this.musicList = musicList;
        this.index = 1;  //sonraki önceki şarkı dediğimizde bu index nosu ile oynarız
    }

    getMusic() {
        return this.musicList[this.index];  //o anki index nosundaki müziği getirir
    }

    next() {
        if(this.index + 1 < this.musicList.length) {   //bir sonraki müzik bilgisini getirir
            this.index++;
        }
        else {
             this.index = 0;  //liste bitince başa dönsün
        }
    }

    prev() {           //bir önceki müzik bilgisini getirir
        if(this.index != 0) {
            this.index--;
        } else {
            this.index = this.musicList.length - 1;  //en baştaki müziğe gelince önceki olarak en son müziğe dönsün
        }
    }
}