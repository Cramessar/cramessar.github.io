// Filename: script.js

let skillData = {};
let lockedSkill = null;
let unlockedSkills = new Set();

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    skillData = data;
    setupNodes();
  });

function setupNodes() {
  const TOTAL_REQUIRED = 7;
  const tooltip = document.getElementById("tooltip");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.querySelector(".close");
  const expBar = document.getElementById("exp-bar");
  const expLabel = document.getElementById("exp-label");
  const emailReward = document.getElementById("email-reward");
  const emailButton = document.getElementById("email-button");

  const nodeGroups = document.querySelectorAll(".node-group");

  nodeGroups.forEach(group => {
    const skill = group.dataset.skill;

    group.addEventListener("mouseenter", () => {
      if (!lockedSkill) {
        tooltip.innerText = skillData[skill]?.title || skill;
        tooltip.style.display = "block";
      }
    });

    group.addEventListener("mousemove", e => {
      if (!lockedSkill) {
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
      }
    });

    group.addEventListener("mouseleave", () => {
      if (!lockedSkill) {
        tooltip.style.display = "none";
      }
    });

    group.addEventListener("click", () => {
      lockedSkill = skill;
      tooltip.style.display = "none";

      modalTitle.innerText = skillData[skill]?.title || skill;
      modalDescription.innerText = skillData[skill]?.description || "More details coming soon.";
      modal.style.display = "block";

      // Pulse circle in group
      const circle = group.querySelector("circle");
      circle.classList.add("pulsing");
      setTimeout(() => circle.classList.remove("pulsing"), 600);

      // Highlight matching path
      const cx = circle.getAttribute("cx");
      const cy = circle.getAttribute("cy");
      const paths = document.querySelectorAll("line.path");

      paths.forEach(path => {
        if (path.getAttribute("x2") === cx && path.getAttribute("y2") === cy) {
          path.classList.add("glow");
          setTimeout(() => path.classList.remove("glow"), 600);
        }
      });

      // EXP logic
      if (!unlockedSkills.has(skill)) {
        unlockedSkills.add(skill);
        const percent = (unlockedSkills.size / TOTAL_REQUIRED) * 100;
        expBar.style.width = `${percent}%`;
        expLabel.innerText = `${unlockedSkills.size} / ${TOTAL_REQUIRED} Nodes Unlocked`;

        if (unlockedSkills.size === TOTAL_REQUIRED) {
          emailReward.style.display = "block";
        }
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    lockedSkill = null;
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      lockedSkill = null;
    }
  });

  emailButton.addEventListener("click", () => {
    alert("📫 You can reach me at: Ramessar40@gmail.com");
  });
}
