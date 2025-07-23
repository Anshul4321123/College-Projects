console.log("welcome to the world of javascript");

let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');
let songs=[
    {songName:"Singham",filePath:"song/1.mp3",coverPath:"covers/1.png"},
    {songName:"Pokemon",filePath:"song/2.mp3",coverPath:"covers/2.png"},
    {songName:"Doremon",filePath:"song/3.mp3",coverPath:"covers/3.png"},
    {songName:"Shinchan",filePath:"song/4.mp3",coverPath:"covers/4.png"},
    {songName:"Oggy",filePath:"song/5.mp3",coverPath:"covers/5.png"},
    {songName:"Jack",filePath:"song/6.mp3",coverPath:"covers/6.png"},
    {songName:"Dedee",filePath:"song/7.mp3",coverPath:"covers/7.png"}
]

songItems.forEach((elements,i)=>{
    elements.getElementsByTagName('img')[0].src=songs[i].coverPath;
    elements.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
audioElement.play();
masterPlay.classList.remove('fa-circle-play');
 masterPlay.classList.add('fa-circle-pause');
 gif.style.opacity=1;
    }
    else{
        audioElement.pause();   
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
     }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const id = parseInt(e.target.id); // Get the ID
        songIndex = id; // Update the current song index

        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath; // Set song source
        audioElement.currentTime = 0; // Reset playtime
        audioElement.play(); // Play the selected song
        gif.style.opacity = 1; 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // Show the playing animation
    });
});

document.getElementById('next').addEventListener(('click'),()=>{
    songIndex = (songIndex + 1) % songs.length;
    masterSongName.innerText = songs[songIndex].songName;   
    audioElement.src = songs[songIndex].filePath; 
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});
document.getElementById('previous').addEventListener(('click'),()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filePath; 
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})