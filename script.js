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
  const emailReward = document.getElementById("email-reward");
  const emailButton = document.getElementById("email-button");
  const tooltip = document.getElementById("tooltip");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.querySelector(".close");
  const nodes = document.querySelectorAll(".node");
  const expBar = document.getElementById("exp-bar");
  const expLabel = document.getElementById("exp-label");

  nodes.forEach(node => {
    const skill = node.dataset.skill;

    node.addEventListener("mouseenter", () => {
      if (lockedSkill) return;
      tooltip.innerText = skillData[skill]?.title || skill;
      tooltip.style.display = "block";
    });

    node.addEventListener("mousemove", e => {
      if (!lockedSkill) {
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
      }
    });

    node.addEventListener("mouseleave", () => {
      if (!lockedSkill) tooltip.style.display = "none";
    });

    node.addEventListener("click", () => {
      lockedSkill = skill;
      tooltip.style.display = "none";
      modalTitle.innerText = skillData[skill]?.title || skill;
      modalDescription.innerText = skillData[skill]?.description || "More details coming soon.";
      modal.style.display = "block";

      // Pulse animation
      node.classList.add("pulsing");
      setTimeout(() => node.classList.remove("pulsing"), 600);

      // Flash closest path (simple logic)
      const paths = document.querySelectorAll("line.path");
      paths.forEach(path => {
        const x2 = path.getAttribute("x2");
        const y2 = path.getAttribute("y2");
        if (x2 == node.getAttribute("cx") && y2 == node.getAttribute("cy")) {
          path.classList.add("glow");
          setTimeout(() => path.classList.remove("glow"), 600);
        }
      });

      // Update skill progress
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

  // ✅ Email button click - OUTSIDE other listeners
  emailButton.addEventListener("click", () => {
    alert("📫 You can reach me at: Ramessar40@gmail.com");
  });
}
