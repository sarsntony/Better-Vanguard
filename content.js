const tabContainer = document.getElementsByClassName('sncTabSetList')[0];

if (tabContainer) {
  const betterVanguardTabs = document.createElement('ul');
  betterVanguardTabs.setAttribute("class", "betterVanguard")

  const graphTab = document.createElement("li");
  graphTab.setAttribute("class", "betterVanguardUnselectedTab")

  const graphAnchor = document.createElement("a");
  graphAnchor.setAttribute("id", "betterVanguardGraphTab");
  graphAnchor.setAttribute("aria-controls", "betterVanguardGraphTab");
  graphAnchor.text = "Graph"

  graphTab.append(graphAnchor);
  betterVanguardTabs.append(graphTab);
  tabContainer.after(betterVanguardTabs); 
}