let songIndex = 0;
let audioElement = new Audio('/static/songs/1.mp3');

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongPlay = document.getElementById("masterSongName");

let songs = [
    { songName: "Agar tu hota", filePath: "/static/songs/1.mp3", coverPath: "/static/covers/1.jpg" },
    { songName: "Beliya", filePath: "/static/songs/2.mp3", coverPath: "/static/covers/2.jpg" },
    { songName: "Dhundala", filePath: "/static/songs/3.mp3", coverPath: "/static/covers/3.jpg" },
    { songName: "Dil nu", filePath: "/static/songs/4.mp3", coverPath: "/static/covers/4.jpg" },
    { songName: "Ohh mahi", filePath: "/static/songs/5.mp3", coverPath: "/static/covers/5.jpg" },
    { songName: "Tune ho na kaha", filePath: "/static/songs/6.mp3", coverPath: "/static/covers/6.jpg" },
    { songName: "Itni se baat hai", filePath: "/static/songs/7.mp3", coverPath: "/static/covers/7.jpg" },
    { songName: "Kaise hua", filePath: "/static/songs/8.mp3", coverPath: "/static/covers/8.jpg" },
    { songName: "Bas itna hai tumse", filePath: "/static/songs/9.mp3", coverPath: "/static/covers/9.jpg" },
    { songName: "Ishq mubarak", filePath: "/static/songs/10.mp3", coverPath: "/static/covers/10.jpg" }
];

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace("fa-play", "fa-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-pause", "fa-play");
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
        el.classList.remove("fa-pause");
        el.classList.add("fa-play");
    });
};


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {

        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.replace("fa-play", "fa-pause");

        audioElement.src = songs[songIndex].filePath;
        masterSongPlay.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.replace("fa-play", "fa-pause");
        gif.style.opacity = 1;
    });
});


document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;

    audioElement.src = songs[songIndex].filePath;
    masterSongPlay.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
});


document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;

    audioElement.src = songs[songIndex].filePath;
    masterSongPlay.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
});
