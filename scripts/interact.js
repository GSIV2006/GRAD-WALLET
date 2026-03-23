<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>GRAD Wallet</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #0f172a;
  color: white;
}

header {
  text-align: center;
  padding: 20px;
  font-size: 26px;
  font-weight: bold;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

input {
  padding: 10px;
  width: 95%;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
}

button {
  padding: 10px;
  background: #38bdf8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.tx {
  padding: 5px;
  margin: 5px 0;
  background: #0f172a;
  border-radius: 5px;
}
</style>

</head>

<body>

<header>🚀 GRAD Wallet (Shardeum)</header>

<div class="container">

<div class="card">
<h3>Wallet</h3>
<p><b>Address:</b> <span id="address">Not created</span></p>
<p><b>Balance:</b> <span id="balance">0 SHM</span></p>

<button onclick="createWallet()">Create Wallet</button>
<button onclick="copyAddress()">Copy Address</button>
<button onclick="receive()">Receive +100</button>

<p id="copyMsg"></p>
<p>🛡️ SmartGuard Protection Active</p>
</div>

<div class="grid">

<div class="card">
<h3>Send Tokens</h3>
<input id="to" placeholder="Recipient Address"><br>
<input id="amount" placeholder="Amount"><br>
<button onclick="send()">Send</button>
<p id="tx"></p>
</div>

<div class="card">
<h3>Blockchain</h3>
<p>🟢 Connected to Shardeum</p>
<p>Contract: 0xe7f17...0512</p>
</div>

</div>

<div class="card">
<h3>Transaction History</h3>
<div id="history"></div>
</div>

<div class="card">
<h3>Smart Insights</h3>
<ul id="insights">
<li>No data yet</li>
</ul>
</div>

</div>

<!-- AI BOX -->
<div id="aiBox" style="display:none; position:fixed; bottom:20px; right:20px; background:#1e293b; padding:15px; border-radius:10px; width:250px;">
<b>🤖 SmartGuard AI</b>
<p id="aiText">Analyzing...</p>
<button onclick="confirmTx()">Proceed</button>
</div>

<script>

let balance = 0;
let address = "";
let pendingTx = null;

function createWallet() {
  address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  balance = 10000;

  document.getElementById("address").innerText = address;
  document.getElementById("balance").innerText = balance + " SHM";
}

function copyAddress() {
  if (!address) return alert("Create wallet first");
  document.getElementById("copyMsg").innerText =
    "Address: " + address;
}

function receive() {
  balance += 100;
  updateBalance();
  addHistory("Received 100 SHM");
}

function send() {
  let to = document.getElementById("to").value;
  let amt = parseInt(document.getElementById("amount").value);

  if (!to || !amt) return alert("Enter details");
  if (amt > balance) return alert("Insufficient balance");

  pendingTx = { to, amt };

  document.getElementById("aiBox").style.display = "block";
  document.getElementById("aiText").innerText = "Analyzing...";

  setTimeout(() => {
    let risk = "Low Risk";

    if (amt > 500) risk = "⚠️ High amount";
    if (to.length < 10) risk = "🚨 Suspicious address";

    document.getElementById("aiText").innerText =
      "Risk: " + risk;
  }, 800);
}

function confirmTx() {
  if (!pendingTx) return;

  let to = pendingTx.to;
  let amt = pendingTx.amt;

  balance -= amt;
  updateBalance();

  document.getElementById("tx").innerText =
    "Transaction Successful ✅";

  addHistory("Sent " + amt + " SHM → " + to);

  generateInsights(amt);

  document.getElementById("aiBox").style.display = "none";
}

function updateBalance() {
  document.getElementById("balance").innerText = balance + " SHM";
}

function addHistory(text) {
  let div = document.createElement("div");
  div.className = "tx";
  div.innerText = text;
  document.getElementById("history").prepend(div);
}

function generateInsights(amount) {
  let insights = document.getElementById("insights");
  insights.innerHTML = "";

  if (amount > 500) {
    insights.innerHTML += "<li>High spending detected</li>";
  }

  insights.innerHTML += "<li>Track your usage</li>";
}

</script>

</body>
</html>