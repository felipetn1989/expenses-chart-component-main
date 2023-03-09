async function insertChart() {
  const response = await fetch("../data.json");
  const text = await response.text();
  const data = JSON.parse(text);

  let maxExpense = data.reduce((max, obj) => Math.max(max, obj.amount), 0);

  for (let i = 0; i < data.length; i++) {
    chart.innerHTML += `
    <div class="flex flex-col gap-3.5 items-center">
      <div class="chart_bar w-[2.0625rem] bg-[#ec775f] rounded-sm">

      </div>
      <span class="text-[0.625rem] text-[#382314]">
        ${data[i].day}
      </span>
    </div>
  `;
  }

  const chartBars = document.querySelectorAll(".chart_bar")

  chartBars.forEach((bar,index) => {
    bar.style.height = `${9.1875 * (data[index].amount/maxExpense)}rem`
  })
}

insertChart();
