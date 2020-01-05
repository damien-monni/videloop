const loopVideoEl = document.createElement("video");
loopVideoEl.src = "videos/loop.mp4";
loopVideoEl.muted = true;
document.getElementsByTagName("body")[0].appendChild(loopVideoEl);

const mainVideoEl = document.createElement("video");
mainVideoEl.src = "videos/main.mp4";
mainVideoEl.muted = true;
mainVideoEl.style.display = "none";
document.getElementsByTagName("body")[0].appendChild(mainVideoEl);

let status = "playing-loop";
loopVideoEl.addEventListener("timeupdate", e => {
  switch (status) {
    case "playing-loop": {
      if (loopVideoEl.currentTime > loopVideoEl.duration - 0.5) {
        loopVideoEl.currentTime = 0;
      }
      break;
    }

    case "exiting-loop": {
      if (loopVideoEl.currentTime > loopVideoEl.duration - 0.5) {
        status = "switching";
        mainVideoEl.play();
      }
      break;
    }

    case "switching": {
      mainVideoEl.style.display = "block";
      status = "ended";
      break;
    }

    default:
      break;
  }
});

window.addEventListener("click", () => {
  status = "exiting-loop";
});

loopVideoEl.play();
