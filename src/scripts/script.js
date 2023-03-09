/* ../data.json */

async function insertChart() {
  const response = await fetch("../data.json");
  const text = await response.text();
  const data = JSON.parse(text);

  for (let i = 0; i < data.length; i++) {
    chart.innerHTML += `
        <div class="flex flex-col items-center">
          <div class="w-7 h-10 bg-[#ec775f] rounded-sm">
  
          </div>
          <span class="text-[0.625rem] text-[#382314]">
            mon
          </span>
        </div>
      `;
  }
}

insertChart();
