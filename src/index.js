document.addEventListener('DOMContentLoaded', () => {
	const songs = [
		{
			id: "1",
			artist: "Beyonce",
			name: "Don't Hurt Yourself",
			song: "./assets/audio/beyonce.mp3",
			img: './assets/img/lemonade.png'
		},
		{
			id: "2",
			artist: "Dua Lipa",
			name: "Don't Start Now",
			song: "./assets/audio/dontstartnow.mp3",
			img: './assets/img/dontstartnow.png'
		}
	];
	const bodyElement = document.body;
	const wrapper = document.querySelector('.wrapper');
	const playPause = document.querySelector('.playPause');
	const next = document.querySelector('.nextPrev_next');
	const prev = document.querySelector('.nextPrev_prev');
	const durationElement = document.querySelector('.durationTime');
	const currentTimeDisplay = document.querySelector('.currentTime');
	const progressContainer = document.querySelector('.progress-container');
	const progress = document.querySelector('.progress');


	const audio = new Audio();
	let isPlay = false;
	let currentSongIndex = 0;

	const containerWidth = parseFloat(getComputedStyle(progressContainer).width);
		console.log(containerWidth);

	playPause.addEventListener('click', togglePlay);
	next.addEventListener('click', () => playNextPrevSong(1));
	prev.addEventListener('click', () => playNextPrevSong(-1));
	audio.addEventListener('loadedmetadata', () => {
		const duration = audio.duration;
		formatAndDisplayDuration(durationElement, duration);
	});
	audio.addEventListener('timeupdate', updateProgress);
	audio.addEventListener('ended', () => {
		togglePlay();
		setTimeout(()=>{playNextPrevSong(1)}, 2000);
	})
	audio.addEventListener('play', () => {
		document.querySelector('.audio-player__img').classList.add('playing');
	});
	audio.addEventListener('pause', () => {
		document.querySelector('.audio-player__img').classList.remove('playing');
	});


			

	progressContainer.addEventListener('click', (event) => {
		const clickX = event.offsetX;
		console.log(clickX)	;
		const duration = audio.duration;

		const progressPercent = clickX / containerWidth;
		const newTime = duration * progressPercent;

		progress.style.width = `${clickX}px`;
		audio.currentTime = newTime;
	})


	function togglePlay() {
		if (!isPlay) {
			playPause.classList.add('playPause_pause');
			playAudio();
		} else {
			playPause.classList.remove('playPause_pause');
			pauseAudio();
		}
	}

	function playAudio() {
		//audio.currentTime = 0;
		audio.play();
		isPlay = true;
	}

	function pauseAudio() {
		audio.pause();
		isPlay = false;
	}

	function playNextPrevSong(direction) {
		currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
		updatePlayer(songs[currentSongIndex]);
		isPlay = false;
		togglePlay();
	}


	function updatePlayer(song) {
		bodyElement.style.backgroundImage = `url(${song.img})`;
		wrapper.querySelector('.audio-player__img').src = song.img;
		wrapper.querySelector('.audio-player__artist').textContent = song.artist;
		wrapper.querySelector('.audio-player__song').textContent = song.name;
		audio.src = song.song;

	}

	function updateProgress() {
		//requestAnimationFrame(() => {
			const currentTime = audio.currentTime;
			const duration = audio.duration;
			formatAndDisplayDuration(currentTimeDisplay, currentTime);
			if (duration > 0) {
				console.log(containerWidth)
				const progressWidth = (containerWidth / duration) * currentTime;
				progress.style.width = `${progressWidth}px`;
			}
			
		//});
	}

	function formatAndDisplayDuration(element, time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
		element.textContent = `${minutes}:${formattedSeconds}`;
	}

	updatePlayer(songs[0]);

});