// Main Menu Open Close
const mainMenu = document.getElementById("main-menu");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
let gsapTl = gsap.timeline();
gsapTl.to(mainMenu, {
	maxHeight: "100vh",
	top: 0,
	duration: 0.5,
});
gsapTl.from("#main-menu .menu-item", {
	y: 30,
	opacity: 0,
	stagger: {
		amount: 0.3,
	},
});
gsap.to(mainMenu, {
	maxHeight: 0,
	top: "-100%",
	duration: 0.35,
});
gsapTl.pause();

// Menu Open
menuOpen.addEventListener("click", function () {
	gsapTl.play();
});
// Menu Close
menuClose.addEventListener("click", function () {
	gsapTl.reverse();
});

const reelOpen = document.getElementById("reel-open");
let isReelOpen = false;
reelOpen.addEventListener("click", function () {
	const reelCursor = document.querySelector("#main-menu #reel-cursor");
	const menuVideo = document.querySelector("#main-menu video");
	menuVideo.removeAttribute("muted");
	isReelOpen = true;
	// Open
	gsap.to(menuVideo, {
		x: "-32",
		y: "-60",
		minWidth: "100vw",
		minHeight: "100vh",
		borderRadius: 0,
		duration: 0.7,
	});
	// Cursor
	menuVideo.addEventListener("mousemove", function (dets) {
		if (!isReelOpen) return;
		reelCursor.classList.remove("hidden");
		gsap.to(reelCursor, {
			x: dets.x - 70,
			y: dets.y - 70,
		});
	});
	// Close
	menuVideo.addEventListener("click", function () {
		if (!isReelOpen) return;
		reelCursor.classList.add("hidden");
		gsap.to(menuVideo, {
			x: 0,
			y: 0,
			minWidth: 0,
			minHeight: 0,
			borderRadius: 6,
		});
		isReelOpen = false;
	});
});
