const totalCostIndex = 4;
const marketValueIndex = 5;
const shortTermGain = 6;
const longTermGain = 7;

const isDataRow = (tableRow) => {
  const tableColumns = tableRow.getElementsByTagName('td');
  if (tableColumns.length == 9) {
    return isDollarAmount(tableColumns[totalCostIndex].innerText) && isDollarAmount(tableColumns[marketValueIndex].innerText)
  }
  return false;
}

const isDollarAmount = (innerText) => {
  if (innerText) {
    let trimmedText = innerText.trim();
    if (trimmedText.charAt(0) === '–') {
      trimmedText = trimmedText.substring(2);
    }
    const dollarNumberCommaPeriod = /\$[0-9|\,|\.]*/;
    const regexMatch = trimmedText.match(dollarNumberCommaPeriod);
    if (regexMatch && regexMatch.length > 0) {
      return regexMatch[0] === trimmedText
    }
  }
  return false;
}

const calculatePercentage = (total, gain) => {
  const numberCommaPeriod = /[0-9|\,|\.]+/;
  const totalNumber = total.match(numberCommaPeriod)[0];
  const gainNumber = gain.match(numberCommaPeriod)[0];
  return parseFloat(gainNumber.replace(',',''))/parseFloat(totalNumber.replace(',',''));
}

const appendPercentageToCell = (totalCell, gainCell) => {
  if (gainCell && isDollarAmount(gainCell.innerText)) {
    const lineBreak = document.createElement("br");        
    const gainPercentage = calculatePercentage(totalCell.innerText, gainCell.innerText)
    const gainPercentageSpan = document.createElement("span");
    gainPercentageSpan.setAttribute("class", "betterVanguardPercentage");
    gainPercentageSpan.textContent = Number(gainPercentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    if (gainCell.getElementsByTagName('span') && gainCell.getElementsByTagName('span').length > 0) {
      gainPercentageSpan.className = gainCell.getElementsByTagName('span')[0].className;
    }
    gainCell.append(lineBreak);
    gainCell.append(gainPercentageSpan);
  }
}

const addPercentage = () => {
  const dataTables = document.getElementsByClassName('dataTable');
  for (dataTable of dataTables) {
    const tableRows = dataTable.getElementsByTagName('tr');
    for (tableRow of tableRows) {
      if (isDataRow(tableRow)) {
        const lineBreak = document.createElement("br");        
        const tableColumns = tableRow.getElementsByTagName('td');
        appendPercentageToCell(tableColumns[totalCostIndex], tableColumns[shortTermGain]);
        appendPercentageToCell(tableColumns[totalCostIndex], tableColumns[longTermGain]);
      }
    }
  }
};

const header = document.getElementById('cbaPortfolioSummary:mainBody');
const percentageButton = document.createElement("a");
percentageButton.setAttribute("id", "betterVanguardPercentageButton");
percentageButton.text = "Percentage"
percentageButton.addEventListener("click", function(){
  addPercentage();
});
header.prepend(percentageButton);