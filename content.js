const tabContainer = document.getElementsByClassName('sncTabSetContainer')[0];

const betterVanguardTabs = document.createElement('ul');
betterVanguardTabs.setAttribute("class", "betterVanguard")

const graphTab = document.createElement("li");
graphTab.setAttribute("class", "betterVanguardUnselectedTab")

const graphAnchor = document.createElement("a");
graphAnchor.setAttribute("id", "betterVanguardGraphTab");
graphAnchor.setAttribute("href", "");
graphAnchor.setAttribute("role", "tab");
graphAnchor.setAttribute("tabindex", "-1");
graphAnchor.setAttribute("aria-selected", "false");
graphAnchor.setAttribute("aria-controls", "betterVanguardGraphTab");
graphAnchor.setAttribute("class", "sncTabSetUnselectedLink");
graphAnchor.text = "Graph"

graphTab.append(graphAnchor);
betterVanguardTabs.append(graphTab);
tabContainer.after(betterVanguardTabs);