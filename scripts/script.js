let day = new Date().getDay(); //getting the day of the week to display the corresponding bar in a different color

// creating an async function to display the JSON data in the page

async function insertChart() {
  const response = await fetch("https://api.npoint.io/98e81cbb1d573936175c");
  const text = await response.text();
  const data = await JSON.parse(text);

  let maxExpense = data.reduce((max, obj) => Math.max(max, obj.amount), 0); // retrieving the maximum value of the daily expenses to use it as the scale parameter for the bar heights

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
  `; //creating the bars and corresponding labels dinamically
  }

  const chartBars = document.querySelectorAll(".chart_bar");

  chartBars.forEach((bar, index) => {
    bar.style.height = `${9.1875 * (data[index].amount / maxExpense)}rem`; // the bar heights follow a scale in which the largest expense corresponds to 100% height and the other percentages are calculated in relation to the maxExpense; the base height is 9.1875rem
    bar.addEventListener("mouseenter", () => {
      displayExpenseBoxes(index);
    });
    bar.addEventListener("mouseout", () => {
      displayExpenseBoxes(index);
    }); // adding hover events
    if (index === day - 1) {
      bar.classList.remove("bg-[#ec775f]");
      bar.style.backgroundColor = "#76b5bc"; //changing the current day bar's color
    }
  });
}

function displayExpenseBoxes(i) {
  const expenseBoxes = document.querySelectorAll(".expense_box");
  expenseBoxes[i].classList.toggle("hidden");
  expenseBoxes[i].classList.toggle("absolute"); //function used in the hover events
}

insertChart();
