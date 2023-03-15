let api_2 = "https://api.coincap.io/v2/assets";
let cc_row = document.querySelector(".coin-2 main");
let amount = 0;
let bc = 0;

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let conv = JSON.parse(xhr.responseText);
    conv.data.forEach((e) => {
      let row = document.createElement("div");
      row.classList.add("row");
      cc_row.append(row);
      let rankR = document.createElement("div");
      let nameR = document.createElement("a");
      let inf24R = document.createElement("div");
      let priceR = document.createElement("div");
      rankR.classList.add("crypto-rank");
      nameR.classList.add("crypto-name");
      inf24R.classList.add("crypto-inflation-24H");
      priceR.classList.add("crypto-price");
      row.append(rankR);
      row.append(nameR);
      row.append(inf24R);
      row.append(priceR);
      nameR.href = e.explorer;
      nameR.setAttribute("target", "_blank");
      rankR.appendChild(document.createTextNode(e.rank));
      nameR.appendChild(document.createTextNode(e.symbol));
      inf24R.appendChild(
        document.createTextNode(`${Number(e.changePercent24Hr).toFixed(2)}%`)
      );
      priceR.appendChild(
        document.createTextNode(Number(e.priceUsd).toFixed(2))
      );
      if (Number(e.changePercent24Hr) < 0) {
        inf24R.style.color = "red";
        row.style.backgroundColor = "#ff00000d";
      } else {
        inf24R.style.color = "green";
      }
    });
  }
};
xhr.open("GET", api_2);
xhr.send();
