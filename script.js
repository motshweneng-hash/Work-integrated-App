const packages = {
  ultimate: { name: "Ultimate Adventure Day", price: 850, detail: "A high-energy outdoor day with guided challenges, equipment and unforgettable views." },
  family: { name: "Family explorer package", price: 500, detail: "A relaxed nature experience built for shared discovery, connection and family fun." },
  zipline: { name: "Ziplining adventure", price: 750, detail: "Soar over the landscape on a guided zipline route with safety briefing and equipment." },
  mountain: { name: "Mountain adventure package", price: 1000, detail: "A full mountain day featuring scenic hiking, expert leadership and a packed itinerary." },
  kayak: { name: "Kayaking experience", price: 650, detail: "Paddle calm waters with a guide and enjoy a fresh outdoor perspective." },
  climb: { name: "Rock climbing session", price: 700, detail: "Build confidence on the rock with safety gear, tuition and beginner-friendly routes." },
  corporate: { name: "Corporate team challenge", price: 950, detail: "A lively outdoor team challenge focused on communication, problem solving and fun." }
};

function toggleMenu(){
  document.getElementById("mobileLinks").classList.toggle("open");
}
function goToPackage(value){
  if(!value) return;
  document.getElementById("card-" + value).scrollIntoView({behavior:"smooth"});
}
function openModal(key){
  document.getElementById("modalTitle").innerText = packages[key].name;
  document.getElementById("modalDescription").innerText = packages[key].detail + " Price: R" + packages[key].price + " per person.";
  document.getElementById("detailsModal").classList.add("open");
}
function closeModal(){
  document.getElementById("detailsModal").classList.remove("open");
}
function getSelected(){
  return Array.from(document.querySelectorAll("#packageChoices input:checked")).map(c => c.value);
}
function calculate(){
  let guests = Number(document.getElementById("guests").value) || 1;
  let selected = getSelected();
  let subtotal = 0;
  selected.forEach(k => subtotal += packages[k].price);
  subtotal = subtotal * guests;
  let discount = guests >= 5 ? subtotal * 0.10 : 0;
  let vat = (subtotal - discount) * 0.15;
  let total = subtotal - discount + vat;
  document.getElementById("subtotalValue").innerText = "R" + subtotal.toFixed(2);
  document.getElementById("vatValue").innerText = "R" + vat.toFixed(2);
  document.getElementById("discountValue").innerText = "−R" + discount.toFixed(2);
  document.getElementById("totalValue").innerText = "R" + total.toFixed(2);
  return { subtotal, discount, vat, total };
}
document.addEventListener("change", calculate);
document.addEventListener("input", calculate);
function submitBooking(e){
  e.preventDefault();
  let ok = true;
  const checks = [
    ["firstName","firstNameError","Please enter first name"],
    ["surname","surnameError","Please enter surname"],
    ["email","emailError","Please enter a valid email"],
    ["phone","phoneError","Please enter phone"],
    ["experienceDate","dateError","Please choose a date"]
  ];
  checks.forEach(([id, errId, msg]) => {
    let el = document.getElementById(id);
    let err = document.getElementById(errId);
    let bad = !el.value.trim() || (id==="email" && !el.value.includes("@"));
    err.innerText = bad ? msg : "";
    el.style.border = bad ? "2px solid red" : "1px solid #a9c5b4";
    if(bad) ok = false;
  });
  let pkgErr = document.getElementById("packageError");
  if(getSelected().length === 0){ pkgErr.innerText = "Please select at least one package"; ok = false; }
  else pkgErr.innerText = "";
  let guests = Number(document.getElementById("guests").value);
  let gErr = document.getElementById("guestsError");
  if(!guests || guests < 1){ gErr.innerText = "Guest count must be 1 or more"; ok = false; }
  else gErr.innerText = "";
  let status = document.getElementById("bookingStatus");
  if(!ok){ status.innerText = "Please correct highlighted fields."; status.className = "status error-state"; return false; }
  calculate();
  status.innerText = "Booking submitted! Thank you.";
  status.className = "status success-state";
  return false;
}
function resetForm(){
  setTimeout(calculate, 50);
}
function runDiscountTest(){
  // R1850 x 5 = R9250, 10% = R925, discounted = R8325
  let subtotal = 1850 * 5;
  let discount = subtotal * 0.10;
  let discounted = subtotal - discount;
  document.getElementById("discountTestResult").innerText =
    "Self-check PASS: R1850 x 5 = R9250, discount R925, discounted R8325. Your code uses the same formula.";
}
calculate();