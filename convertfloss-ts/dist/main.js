"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = "https://devfel.github.io/convertfloss/data/flosscolor.json";
//const url = "../data/flosscolor.json"; //Local Data
const form = document.querySelector('form');
const flossTable = document.querySelector(".floss-table");
const searchBtn = document.querySelector('.search');
const showAllBtn = document.querySelector(".show-all");
const searchInput = document.querySelector('#searchInput');
const searchOptions = document.querySelector("#ColumnValue");
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
searchInput.addEventListener('input', () => {
    filterData();
});
searchBtn.addEventListener('click', filterData);
showAllBtn.addEventListener('click', fetchColors);
fetchColors();
function fetchColors() {
    return __awaiter(this, void 0, void 0, function* () {
        cleanTable();
        try {
            const response = yield fetch(url);
            const json = yield response.json();
            createTableTitles();
            json.forEach((floss) => createElementLIs(floss));
        }
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
function filterData() {
    return __awaiter(this, void 0, void 0, function* () {
        cleanTable();
        try {
            const response = yield fetch(url);
            const json = yield response.json();
            createTableTitles();
            let searchTerm = searchInput.value;
            let searchOption = searchOptions.value;
            if (searchOption === "name" || searchOption === "rgb") {
                json.filter((floss) => floss[searchOption].includes(searchTerm.toLowerCase()))
                    .map((floss) => createElementLIs(floss));
            }
            else {
                json.filter((floss) => floss[searchOption].match(new RegExp(`^${searchTerm.toLowerCase()}`)))
                    .map((floss) => createElementLIs(floss));
            }
        }
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
function cleanTable() {
    flossTable.innerHTML = "";
}
function createTableTitles() {
    let trNode = document.createElement("tr");
    trNode.classList.add("table-title");
    const titles = [
        "Sample",
        "Color Name",
        "RGB",
        "DMC",
        "Anchor",
        "Maxi Mouline",
        "Sullivans",
        "J&P Coats",
    ];
    titles.map((title) => {
        createTitle(title);
    });
    function createTitle(title) {
        let node = document.createElement("td");
        node.textContent = title;
        trNode.appendChild(node);
    }
    flossTable.appendChild(trNode);
}
function createElementLIs(floss) {
    let ulNode = document.createElement("tr");
    ulNode.classList.add("floss-id-" + floss.id);
    const cols = [
        "sample",
        "name",
        "rgb",
        "dmc",
        "anchor",
        "maxi",
        "sullivans",
        "coats",
    ];
    cols.map((col) => {
        createListForBrand(col);
    });
    function createListForBrand(brand) {
        let td = document.createElement("td");
        //td.classList.add(brand);
        brand === "sample"
            ? (td.style.backgroundColor = floss.hexa)
            : (td.textContent = floss[brand]);
        ulNode.appendChild(td);
    }
    flossTable.appendChild(ulNode);
}
