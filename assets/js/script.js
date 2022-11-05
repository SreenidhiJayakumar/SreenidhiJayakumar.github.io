"use strict";

var url = document.URL,
  index = url.indexOf("#"),
  hash = index != -1 ? url.substring(index + 1) : "";

if (hash === "") {
  location.hash = "#about";
}

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const sections = document.querySelectorAll("article[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;

    const sectionTop =
      current.getBoundingClientRect().top + window.pageYOffset - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".navbar-item a[href*=" + sectionId + "]")
        .classList.add("active");
      // location.hash = "#" + sectionId;
    } else {
      document
        .querySelector(".navbar-item a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

// view projects variables
const projectItems = document.getElementsByClassName("project-item");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const projectImagesList = document.getElementsByClassName("testimonials")[0];

// modal toggle function
const projectsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

const pdfMap = {
  "CAMPUS1.1": 25,
  "Dissertation research paper": 52,
  "MIXED USE1.1": 24,
  png2pdf: 11,
  SAC: 14,
  "SPRINT 2 SOCIAL INFRA": [8, true], // Sometimes 01, 02 not present
  "SRPINT 1 ROAD INFRA": [8, true],
  "UD SEM": 17,
  "VIRTUAL REALITY IN ARCHITECTURE": 25,
};

// add click event to all modal items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function () {
    console.log("Clicked");

    var imgSrc = this.querySelector("[data-project-img]").src.replaceAll(
      "%20",
      " "
    );

    // One image projects first
    if (imgSrc.includes("MOOD BOARD")) {
      let innerHTMLString = "<ul class='testimonials-list has-scrollbar'>";

      innerHTMLString +=
        `<li class="testimonials-item">
              <div class="content-card" data-testimonials-item>
                  <img src="` +
        imgSrc +
        `" alt="Project Images" width="100%" height="100%" style="object-fit: cover;" />
              </div>
            </li>`;

      innerHTMLString += "</ul>";

      projectImagesList.innerHTML = innerHTMLString;

      projectsModalFunc();
    } else {
      // Multiple images. Open separate screen

      var folderPath = imgSrc.split("/").slice(0, -1).join("/");
      folderPath = folderPath.replaceAll("%20", " ");
      var dirName = folderPath.split("/").pop();

      let i = 1;
      let innerHTMLString = "<ul style='text-align: center; display: inline'>";
      let value = Array.isArray(pdfMap[dirName])
        ? pdfMap[dirName][0]
        : pdfMap[dirName];
      let check = Array.isArray(pdfMap[dirName]);
      while (i <= value) {
        let finalPath;
        if (i.toString().length == 1 && !check) {
          finalPath = folderPath + "/" + dirName + "-0" + i + ".jpg";
        } else {
          finalPath = folderPath + "/" + dirName + "-" + i + ".jpg";
        }
        innerHTMLString +=
          `<li style='align-items: center'>
                  <img src="` +
          finalPath +
          `" alt="Project Images" width="84%" height="84%" style="margin-left: 8%; margin-right: 8%"/>
              </div>
            </li>`;
        i++;
      }

      if (folderPath.includes("VIRTUAL REALITY")) {
        // Add report pdf link at last

        innerHTMLString += `
          <li style='align-items: center'>
            <div style="width: 84%; height: 84%; margin-left: 8%; margin-right: 8%; align-items: center">
              <a class="form-btn" href="assets/pdfs/Virtual Reality Report.pdf" target="_blank" data-form-btn>
                <ion-icon name="document-outline"></ion-icon>
                <span>View Paper</span>
              </a>
            </div>
          </li>`;
      }

      innerHTMLString += "</ul>";

      sections.forEach((current) => {
        current.style.display = "none";

        let sectionId = current.getAttribute("id");

        document
          .querySelector(".navbar-item a[href*=" + sectionId + "]")
          .classList.toggle("active");
      });

      document.getElementById("project").style.display = "block";

      document.getElementById("project").innerHTML = innerHTMLString;
    }
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", projectsModalFunc);
overlay.addEventListener("click", projectsModalFunc);

// projectItems[0].click();

window.addEventListener("hashchange", function () {
  var url = document.URL,
    index = url.indexOf("#"),
    hash = index != -1 ? url.substring(index + 1) : "";
  console.log("HASH CHANGE: " + hash);

  if (hash != "project" && hash != "") {
    document.getElementById("project").style.display = "none";

    var sections = document.querySelectorAll("article[id]");

    sections.forEach((current) => {
      current.style.display = "block";
      document
        .querySelector(".navbar-item a[href*=" + hash + "]")
        .classList.add("active");

      this.document.getElementById(hash + "-a").click();
    });
  }
});