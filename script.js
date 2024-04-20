console.log("====================================");
console.log("Connected");
console.log("====================================");
let data = [];
document.addEventListener("DOMContentLoaded", function () {
  let p = fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  p.then((response) => {
    return response.json();
  })
    .then((response) => {
      data = response?.categories;
      console.log(data);
      renderList(data);
    })
    .catch((error) => console.log(error));
});

function renderList(items) {
  const itemsList = document.getElementById("categories");

  // Clear the existing items
  itemsList.innerHTML = "";

  // Loop through the items and render each one
  items.forEach((item) => {
    const li = document.createElement("li");
    li.append(item.category_name);
    li.className = "category";
    li.id = item.category_name.toLowerCase();
    li.onclick = function (event) {
      openTab(event, item.category_name.toLowerCase());
    };
    itemsList.appendChild(li);
    renderContent(item);
  });
  document.getElementById("men").classList.add("active");
  document.getElementById("men-content").style.display = "flex";
}
function renderContent(card) {
  const content = document.getElementById("content");
  const productsDiv = document.createElement("div");
  productsDiv.classList.add("products");
  productsDiv.classList.add(card.category_name.toLowerCase());
  productsDiv.id = card.category_name.toLowerCase() + "-content";
  content.appendChild(productsDiv);
  renderCard(card);
}
function renderCard(card) {
  console.log("card", card);
  const productsDiv = document.getElementById(
    card.category_name.toLowerCase() + "-content"
  );
  card.category_products.forEach((item) => {
    const cardsDiv = document.createElement("div");
    cardsDiv.className = "cards";
    productsDiv.appendChild(cardsDiv);
    const btnSecDiv1 = document.createElement("div");
    btnSecDiv1.className = "btn-sec1";
    cardsDiv.appendChild(btnSecDiv1);
    const badge = document.createElement("button");
    badge.className = "badge-text";
    badge.append(item.badge_text);
    btnSecDiv1.appendChild(badge);
    const imgSecDiv = document.createElement("div");
    imgSecDiv.className = "img-sec";
    const imgTag = document.createElement("img");
    imgTag.src = item.image;
    imgTag.alt = "card-img";
    imgSecDiv.appendChild(imgTag);
    cardsDiv.appendChild(imgSecDiv);
    const discriptionDiv = document.createElement("div");
    discriptionDiv.className = "discription";
    cardsDiv.appendChild(discriptionDiv);
    const headDiv = document.createElement("div");
    headDiv.className = "head";
    discriptionDiv.appendChild(headDiv);
    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.append(item.title + " . ");
    headDiv.appendChild(titleSpan);
    const brancdSpan = document.createElement("span");
    brancdSpan.className = "brand";
    brancdSpan.append(item.vendor);
    headDiv.appendChild(brancdSpan);
    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    discriptionDiv.appendChild(priceDiv);
    const offPriceSpan = document.createElement("span");
    offPriceSpan.className = "offPrice";
    offPriceSpan.append("Rs " + item.price + ".00");
    priceDiv.appendChild(offPriceSpan);
    const originalPriceSpan = document.createElement("span");
    originalPriceSpan.className = "originalPrice";
    originalPriceSpan.append("   " + item.compare_at_price + "  ");
    priceDiv.appendChild(originalPriceSpan);
    const offerSpan = document.createElement("span");
    offerSpan.className = "offer";
    offerSpan.append("50% OFF");
    priceDiv.appendChild(offerSpan);
    const btnSecDiv = document.createElement("div");
    btnSecDiv.className = "btn-sec";
    cardsDiv.appendChild(btnSecDiv);
    const btn = document.createElement("button");
    btn.className = "add-to-cart";
    btn.append("Add To cart");
    btnSecDiv.appendChild(btn);
  });
}
function openTab(evt, category) {
  let i, products, categories;
  products = document.getElementsByClassName("products");
  for (i = 0; i < products.length; i++) {
    products[i].style.display = "none";
  }
  categories = document.getElementsByClassName("category");
  for (i = 0; i < categories.length; i++) {
    categories[i].classList.remove("active");
  }
  document.getElementById(category + "-" + "content").style.display = "flex";
  evt.currentTarget.classList.add("active");
}
