// Initialize Lenis
$(document).ready(function () {
	const lenis = new Lenis();
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
});

gsap.registerPlugin(SplitText, ScrollTrigger);

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

// Footer
$(document).ready(function () {
	gsap.from("footer form input", {
		display: "none",
		width: "0%",
		duration: 0.8,
		scrollTrigger: {
			trigger: "footer form",
			start: "top 80%",
		},
	});
	gsap.from("footer form button", {
		display: "none",
		right: "100%",
		duration: 0.8,
		scrollTrigger: {
			trigger: "footer form",
			start: "top 80%",
		},
	});
	gsap.from("#footer-brand .letter", {
		y: "100%",
		opacity: 0,
		duration: 0.5,
		stagger: {
			amount: -0.3,
		},
		scrollTrigger: {
			trigger: "#footer-brand",
			start: "top 80%",
		},
	});
});

// First View Line Reveal Animation
$(document).ready(function () {
	["#about-title", "#work-title", "#contact-title"].forEach((selector) => {
		new SplitText(selector, {
			type: "lines",
			linesClass: "lineChild",
		});
		new SplitText(selector, {
			type: "lines",
			linesClass: "lineParent",
		});
		gsap.fromTo(
			`${selector} .lineChild`,
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.15,
				ease: "power3.out",
			}
		);
	});
});

// Line Reveal Animation
$(document).ready(function () {
	[
		"#about-describe",
		"#models-title",
		"#approach-description",
		"#attention-text",
		"#founder-describe",
		"#about-company p",
		"#experts-title",
	].forEach((selector) => {
		new SplitText(selector, {
			type: "lines",
			linesClass: "lineChild",
		});
		new SplitText(selector, {
			type: "lines",
			linesClass: "lineParent",
		});
		gsap.fromTo(
			`${selector} .lineChild`,
			{ yPercent: 100, opacity: 0 },
			{
				yPercent: 0,
				opacity: 1,
				duration: 0.7,
				stagger: 0.15,
				ease: "power3.out",
				scrollTrigger: {
					trigger: selector,
					start: "top 80%",
					end: "top 20%",
					scrub: 2,
					toggleActions: "play none none reverse",
				},
			}
		);
	});
});

// Video Scroll Animation
$(document).ready(function () {
	const video = document.getElementById("approach-video");
	gsap.from(video, {
		width: "60%",
		duration: 4,
		scrollTrigger: {
			trigger: video,
			scrub: 2,
			end: "0%",
		},
	});
});

// Sliders
$(document).ready(function () {
	function initializeSwiper(selector) {
		return new Swiper(selector, {
			freeMode: true,
			grabCursor: true,
			loop: true,
			speed: 7000,
			spaceBetween: 30,
			autoplay: {
				delay: 0,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				640: {
					slidesPerView: 2,
				},
				1280: {
					slidesPerView: 3,
				},
				1536: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			},
		});
	}

	// Initialize Sliders
	initializeSwiper(".workGlance");
	initializeSwiper(".experts");
});

// Title Reveal Animation
$(document).ready(function () {
	const $Title = $("#know-us-title, #join-title");
	const $defaultTitle = $("#default-title");
	const $revealTitle = $("#reveal-title");
	const $border = $("#bottom-border");
	$Title.width($defaultTitle.outerWidth());
	$Title.height($defaultTitle.outerHeight());
	$border.width($defaultTitle.outerWidth());
	const $split = new SplitText($defaultTitle, { type: "chars" });
	const $split2 = new SplitText($revealTitle, { type: "chars" });

	let gsapTl = gsap.timeline({ paused: true });
	gsapTl.to($split.chars, {
		y: "-100%",
		opacity: 0,
		duration: 0.3,
		stagger: -0.02,
		onComplete: function () {
			$border.width($revealTitle.outerWidth());
		},
	});
	gsapTl.from($split2.chars, {
		y: "100%",
		opacity: 0,
		stagger: 0.02,
	});

	$($Title).on("mouseenter", function () {
		gsapTl.play();
	});
	$($Title).on("mouseleave", function () {
		gsapTl.reverse().eventCallback("onReverseComplete", function () {
			$border.width($defaultTitle.outerWidth());
		});
	});
});
