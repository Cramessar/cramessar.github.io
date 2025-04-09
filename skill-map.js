// skill-map.js
const nodes = document.querySelectorAll(".node");
const tooltip = document.getElementById("tooltip");

nodes.forEach(node => {
  node.addEventListener("mouseenter", (e) => {
    const skill = node.getAttribute("data-skill");
    tooltip.innerText = `${skill} - Click to learn more`;
    tooltip.style.display = "block";
    tooltip.style.left = e.pageX + "px";
    tooltip.style.top = e.pageY + "px";
  });

  node.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  node.addEventListener("click", () => {
    alert(`Info about ${node.getAttribute("data-skill")} coming soon!`);
  });
});
