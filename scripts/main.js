class Video {
	constructor(selector) {
		this.selector = selector;
		this.playerElement = document.querySelector(selector);

		this.videoElement = document.querySelector(selector + " video");

		this.bindEvents();
	}

	bindEvents() {
		//Get Elements
		this.playPauseBtn = document.querySelector(this.selector + " .play-pause");
		this.showVolumeBtn = document.querySelector(
			this.selector + " .show-volume"
		);
		this.showSpeedBtn = document.querySelector(this.selector + " .show-speed");
		this.volumeRange = document.querySelector(this.selector + " #volume-range");
		this.progressBar = document.querySelector(this.selector + " .bar");

		this.fullScreenBtn = document.querySelector(
			this.selector + " .full-screen"
		);

		this.playBackRateBtn = document.querySelectorAll(
			this.selector + " .playBackRate"
		);

		this.progressContainerBar = document.querySelector(
			this.selector + " .progress"
		);
		//Events
		this.playPauseBtn.addEventListener("click", () => this.playPause());
		this.showVolumeBtn.addEventListener("click", () => this.toggleVolume());

		this.showSpeedBtn.addEventListener("click", () => this.toggleSpeed());

		this.videoElement.addEventListener("timeupdate", () =>
			this.updateProgress()
		);

		this.videoElement.addEventListener("durationchange", () =>
			this.setFullDuration()
		);

		this.volumeRange.addEventListener("input", () => this.updateVolume());

		this.fullScreenBtn.addEventListener("click", () => this.fullScreenVideo());

		this.playBackRateBtn.forEach((btn) => {
			btn.addEventListener("click", () => this.setPlayBackRate(btn));
		});

		this.progressContainerBar.addEventListener("click", (ev) =>
			this.setVideoTime(ev)
		);
	}

	setVideoTime(ev) {
		let el = this.progressContainerBar;
		let positions = getRelativeCoordinates(ev, this.progressContainerBar);

		let fullWidth = el.offsetWidth;

		let percentage = positions.x / fullWidth;

		let videoDuration = this.videoElement.duration;

		let seTimeNow = videoDuration * percentage;

		this.videoElement.currentTime = seTimeNow;
	}

	playPause() {
		if (this.videoElement.paused) {
			this.playPauseBtn.innerHTML = "pause";
			this.videoElement.play();
		} else {
			this.playPauseBtn.innerHTML = "play_arrow";
			this.videoElement.pause();
		}
	}

	toggleVolume() {
		document
			.querySelector(this.selector + " .volume")
			.classList.toggle("active");
	}

	toggleSpeed() {
		document
			.querySelector(this.selector + " .speed")
			.classList.toggle("active");
	}

	updateVolume() {
		this.videoElement.volume = this.volumeRange.value;

		if (this.volumeRange.value == 0) {
			this.showVolumeBtn.innerHTML = "volume_off";
		} else if (this.volumeRange.value <= 0.5) {
			this.showVolumeBtn.innerHTML = "volume_down";
		} else {
			this.showVolumeBtn.innerHTML = "volume_up";
		}
	}

	updateProgress() {
		var videoDuration = this.videoElement.duration;
		var videoPosition = this.videoElement.currentTime;

		let videoPercent = (videoPosition / videoDuration) * 100;

		this.progressBar.style.width = videoPercent.toString(10) + "%";

		//set time actual

		this.setDuration(videoPosition, " .time-actual");
	}

	setFullDuration() {
		let durationTime = this.videoElement.duration;

		this.setDuration(durationTime, " .full-duration");
	}

	setDuration(durationTime, selector) {
		let minutes = parseInt(durationTime / 60, 10);

		let seconds = parseInt(durationTime % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		document.querySelector(this.selector + " " + selector).innerHTML =
			minutes + ":" + seconds;
	}

	fullScreenVideo() {
		let fullScreenFuntion =
			this.videoElement.requestFullscreen ||
			this.videoElement.webkitRequestFullScreen ||
			this.videoElement.mozRequestFullScreen ||
			this.videoElement.msRequestFullscreen;

		fullScreenFuntion.call(this.videoElement);
	}

	setPlayBackRate(el) {
		let speed = parseFloat(el.dataset.value);

		this.videoElement.playbackRate = speed;

		this.toggleSpeed();
	}
}

function getRelativeCoordinates(e, container) {
	let pos = {},
		offset = {},
		ref;
	ref = container.offsetParent;
	pos.x = !!e.touches ? e.touches[0].pageX : e.pageX;
	pos.y = !!e.touches ? e.touches[0].pageY : e.pageY;
	offset.left = container.offsetLeft;
	offset.top = container.offsetTop;
	while (ref) {
		offset.left += ref.offsetLeft;
		offset.top += ref.offsetTop;
		ref = ref.offsetParent;
	}
	return {
		x: pos.x - offset.left,
		y: pos.y - offset.top,
	};
}
