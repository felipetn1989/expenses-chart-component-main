async function insertChart() {
  const response = await fetch("../data.json");
  const text = await response.text();
  const data = JSON.parse(text);

  let maxExpense = data.reduce((max, obj) => Math.max(max, obj.amount), 0);

  for (let i = 0; i < data.length; i++) {
    chart.innerHTML += `
    <div class="relative flex flex-col gap-3.5 items-center lg:mt-3">
      <div class="expense_box hidden top-[-3rem] bg-black text-white font-bold p-1 rounded-lg text-xs lg:text-base lg:p-2">$${data[i].amount}</div>
      <div class="chart_bar w-[2.0625rem] bg-[#ec775f] rounded-sm hover:cursor-pointer hover:opacity-60 lg:w-12 lg:rounded-md">

      </div>
      <span class="text-[0.625rem] text-[#382314] lg:text-[0.875rem]">
        ${data[i].day}
      </span>
    </div>
  `;
  }

  const chartBars = document.querySelectorAll(".chart_bar");

  chartBars.forEach((bar, index) => {
    bar.style.height = `${9.1875 * (data[index].amount / maxExpense)}rem`;
  });

  chartBars.forEach((bar, index) => {
    const expenseBoxes = document.querySelectorAll(".expense_box");
    bar.addEventListener("mouseenter", () => {
      if (!expenseBoxes[index].classList.contains("fixed_box")) {
        displayExpenseBoxes(index);
      }
    });
    bar.addEventListener("mouseout", () => {
      if (!expenseBoxes[index].classList.contains("fixed_box")) {
        displayExpenseBoxes(index);
      }
    });
  });
}

function displayExpenseBoxes(i) {
  const expenseBoxes = document.querySelectorAll(".expense_box");
  expenseBoxes[i].classList.toggle("hidden");
  expenseBoxes[i].classList.toggle("absolute");
}

insertChart();
