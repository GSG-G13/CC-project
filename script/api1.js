const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("ans");

const xhr1 = new XMLHttpRequest();
xhr1.open("GET", "https://api.frankfurter.app/currencies");
xhr1.onload = function () {
  if (xhr1.status === 200 && xhr1.readyState == 4) {
    const data = JSON.parse(xhr1.responseText);
    display(data);
  }
};
xhr1.send();

function display(data) {
  const entries = Object.entries(data);

  for (let i = 0; i < entries.length; i++) {
    const option1 = document.createElement("option");
    option1.value = entries[i][0];
    const option2 = document.createElement("option");
    option2.value = entries[i][0];

    const text1 = document.createTextNode(entries[i][0]);
    const text2 = document.createTextNode(entries[i][0]);

    option1.appendChild(text1);
    option2.appendChild(text2);

    select[0].appendChild(option1);
    select[1].appendChild(option2);
  }
  select[0].value = "USD";
  select[1].value = "ILS";
}

btn.addEventListener("click", () => {
  let currency1 = select[0].value;
  let currency2 = select[1].value;
  let value = num.value;
  if (currency1 != currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("Choose Different Currencies !!!");
  }
});

function convert(currency1, currency2, value) {
  const xhr2 = new XMLHttpRequest();
  const host = "api.frankfurter.app";
  xhr2.open(
    "GET",
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  );
  xhr2.onload = function () {
    if (xhr2.status === 200 && xhr2.readyState == 4) {
      const val = JSON.parse(xhr2.responseText);
      ans.value = Number(Object.values(val.rates)[0]).toFixed(2);
    } else {
    }
  };
  xhr2.send();
}