// Initialize Lenis
$(document).ready(function () {
	const lenis = new Lenis();
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
});

// First View
$(document).ready(function () {
	let gsapTl = gsap.timeline();
	// Header
	gsapTl.from("header", {
		y: "-100%",
		duration: 0.4,
	});
	// Hero Title
	gsapTl.from(
		$("#hero-title .letter"),
		{
			y: "100%",
			opacity: 0,
			stagger: {
				amount: -0.3,
			},
		},
		"-=0.1"
	);
});

// Main Menu
$(document).ready(function () {
	let gsapTl = gsap.timeline();
	gsapTl.to("#main-menu", {
		maxHeight: "100dvh",
		top: 0,
		duration: 0.5,
	});
	gsapTl.from("#main-menu .menu-item", {
		y: 30,
		opacity: 0,
		stagger: {
			amount: 0.25,
		},
	});
	gsapTl.pause();

	// Open
	$("#menu-open").on("click", function () {
		gsapTl.play();
	});
	// Close
	$("#menu-close").on("click", function () {
		gsapTl.reverse();
	});
});

// Hero Cursor
$(document).ready(function () {
	const $heroSec = $("#hero-section");
	const $heroCursor = $("#hero-play-reel");
	// Move Cursor
	$heroSec.on("mouseenter", function () {
		gsap.to($heroCursor, {
			scale: 1,
			opacity: 1,
		});
	});
	$heroSec.on("mousemove", function (e) {
		gsap.to($heroCursor, {
			x: e.pageX,
			y: e.pageY,
			duration: 0.6,
		});
	});
	// Hide Cursor
	$heroSec.on("mouseleave", function () {
		gsap.to($heroCursor, {
			scale: 0,
			opacity: 0,
		});
	});
});

// Hero Reel
$(document).ready(function () {
	const $fullReel = $("#hero-full-reel");
	let gsapTl = gsap.timeline();
	gsapTl.to($fullReel, {
		width: "100vw",
		height: "100vh",
		rotate: 0,
		duration: 0.8,
	});
	gsapTl.to("#hero-reel-controls", {
		width: "90%",
	});
	gsapTl.pause();

	// Open
	$("#hero-title, #hero-reel").on("click", function () {
		$("body").addClass("overflow-hidden");
		$("#hero-close-reel").addClass("lg:block");
		gsapTl.play();
		$fullReel.prop("muted", false);
		$fullReel[0].play();
	});
	// Move Cursor
	$($fullReel).on("mousemove", function (e) {
		gsap.to("#hero-close-reel", {
			x: e.pageX + 10,
			y: e.pageY - 15,
		});
	});
	// Close
	$($fullReel).on("click", function () {
		$fullReel[0].pause();
		$fullReel.prop("muted", true);
		gsapTl.reverse();
		$("body").removeClass("overflow-hidden");
		$("#hero-close-reel").removeClass("lg:block");
	});
});

// Video Controls
$(document).ready(function () {
	const $fullReel = $("#hero-full-reel");
	// Play Pause
	const $playPause = $("#reel-play");
	$playPause.on("click", function () {
		if ($fullReel[0].paused) {
			$fullReel[0].play();
			$playPause.html(
				`<path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd"/>`
			);
		} else {
			$fullReel[0].pause();
			$playPause.html(
				`<path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />`
			);
		}
	});
	// Progress
	const $progressBar = $("#reel-progress-bar");
	$fullReel.on("timeupdate", function () {
		$progressBar.val(
			($fullReel[0].currentTime / $fullReel[0].duration) * 100
		);
	});
	$progressBar.on("input", function () {
		$fullReel[0].currentTime =
			($(this).val() / 100) * $fullReel[0].duration;
	});
	// Mute Unmute
	const $muteUnmute = $("#reel-unmute");
	$muteUnmute.on("click", function () {
		if ($fullReel.prop("muted")) {
			$fullReel.prop("muted", false);
			$muteUnmute.html(
				`<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"/> <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"/>`
			);
		} else {
			$fullReel.prop("muted", true);
			$muteUnmute.html(
				`<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />`
			);
		}
	});
});

// About Us Describe
$(document).ready(function () {
	gsap.registerPlugin(SplitText, ScrollTrigger);
	let split = new SplitText("#about-describe", {
		type: "lines",
		linesClass: "lineChild",
	});

	gsap.fromTo(
		split.lines,
		{ yPercent: 100, opacity: 0 },
		{
			yPercent: 0,
			opacity: 1,
			duration: 0.7,
			stagger: 0.15,
			ease: "power3.out",
			scrollTrigger: {
				trigger: "#about-describe",
				start: "top 80%",
				end: "top 20%",
				scrub: 2,
				toggleActions: "play none none reverse",
			},
		}
	);
});
