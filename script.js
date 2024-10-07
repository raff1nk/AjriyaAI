document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("backsound");
  var audioSource = document.getElementById("audio-source");
  var musicTitle = document.getElementById("music-title");

  // List of songs
  var songs = [
    { title: "Lifeline", src: "Lifeline.mp3" },
    { title: "Take Me On", src: "TakeMeOn.mp3" },
  ];
  var currentSongIndex = 0;

  // Play the first song
  audio.play();

  // Function to change to the next song
  function changeSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0; // Go back to the first song if the list ends
    }
    audioSource.src = songs[currentSongIndex].src;
    musicTitle.innerHTML = songs[currentSongIndex].title + ' <button id="skip-button" onclick="skipMusic()">Skip Music</button>';
    audio.load(); // Load the new audio source
    audio.play(); // Start playing the new song
  }

  // Change song when the current one ends
  audio.addEventListener("ended", changeSong);

  // Function to skip music manually
  window.skipMusic = function () {
    changeSong();
  };

  document.body.addEventListener("click", function () {
    if (audio.paused) {
      audio.play().catch(function (error) {
        console.log("Autoplay prevented:", error);
      });
    }
    audio.muted = false;
  });

  audio.play().catch(function (error) {
    console.log("Autoplay prevented:", error);
  });

  const sections = [
    { id: 1, colors: ["#ff9a9e", "#fad0c4"] },
    { id: 2, colors: ["#fbc2eb", "#a6c0fe"] },
    { id: 3, colors: ["#f3cfe6", "#e2b0ff"] },
    { id: 4, colors: ["#a1c4fd", "#c2e9fb"] },
    { id: 5, colors: ["#d4fc79", "#96e6a1"] },
    { id: 6, colors: ["#84fab0", "#8fd3f4"] },
    { id: 7, colors: ["#f093fb", "#f5576c"] },
  ];

  function updateBackground(sectionId) {
    const section = sections.find((s) => s.id === sectionId);
    document.body.style.background = `linear-gradient(to bottom, ${section.colors.join(", ")})`;
  }

  window.navigate = function (direction, currentSection) {
    let nextSection;

    if (direction === "next") {
      nextSection = currentSection + 1;
    } else {
      nextSection = currentSection - 1;
    }

    if (nextSection < 1 || nextSection > 7) {
      return;
    }

    document.querySelector(".section.active").classList.remove("active");
    document.getElementById(`section${nextSection}`).classList.add("active");
    updateBackground(nextSection);
  };

  window.login = function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "c" && password === "c") {
      document.getElementById("login-section").classList.remove("active");
      document.getElementById("main-content").style.display = "block";
      updateBackground(1); // Set background for section 1
    } else {
      document.getElementById("error-message").textContent = "Login salah!";
    }
  };
});
