// Filename: script.js

let skillData = {};

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    skillData = data;
    setupNodes();
  });

function setupNodes() {
  const tooltip = document.getElementById("tooltip");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.querySelector(".close");
  const nodes = document.querySelectorAll(".node");

  nodes.forEach(node => {
    node.addEventListener("mouseenter", e => {
      const skill = node.dataset.skill;
      tooltip.innerText = `${skillData[skill].title}`;
      tooltip.style.display = "block";
    });

    node.addEventListener("mousemove", e => {
      tooltip.style.left = e.pageX + 15 + "px";
      tooltip.style.top = e.pageY + 15 + "px";
    });

    node.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    node.addEventListener("click", () => {
      const skill = node.dataset.skill;
      modalTitle.innerText = skillData[skill].title;
      modalDescription.innerText = skillData[skill].description;
      modal.style.display = "block";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
