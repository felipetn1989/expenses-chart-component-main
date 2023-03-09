let selected = true;

async function insertChart() {
  const response = await fetch("../data.json");
  const text = await response.text();
  const data = JSON.parse(text);

  let maxExpense = data.reduce((max, obj) => Math.max(max, obj.amount), 0);

  for (let i = 0; i < data.length; i++) {
    chart.innerHTML += `
    <div class="relative flex flex-col gap-3.5 items-center">
      <div class="expense_box hidden top-[-3rem] bg-black text-white font-bold p-1 rounded-lg text-xs">$${data[i].amount}</div>
      <div class="chart_bar w-[2.0625rem] bg-[#ec775f] rounded-sm hover:cursor-pointer hover:opacity-60">

      </div>
      <span class="text-[0.625rem] text-[#382314]">
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
    bar.addEventListener("mouseenter", () => {
      displayExpenseBoxes(index);
    });
    bar.addEventListener("mouseout", () => {
      displayExpenseBoxes(index);
    });
    bar.addEventListener("click", () => {
      const expenseBoxes = document.querySelectorAll(".expense_box");
      bar.classList.remove("bg-[#ec775f]");
      bar.style.backgroundColor = selected ? "#76b5bc" : "#ec775f";
      expenseBoxes[index].classList.toggle("hidden");
      expenseBoxes[index].classList.toggle("absolute");
      selected = !selected;
    });
  });
}

function displayExpenseBoxes(i) {
  const expenseBoxes = document.querySelectorAll(".expense_box");
  expenseBoxes[i].classList.toggle("hidden");
  expenseBoxes[i].classList.toggle("absolute");
}

insertChart();
