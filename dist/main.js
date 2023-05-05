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
//const url = "https://devfel.github.io/convertfloss/data/flosscolor.json";
const url = "../data/flossData.json"; //Local Data
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
        clearTable();
        try {
            const response = yield fetch(url); // maybe store this so you don't have to fetch with every filterData()
            const json = yield response.json();
            createTitlesTRow();
            json.forEach((floss) => createTRowsFromSearchRes(floss));
            searchInput.value = "";
            searchOptions.value = "name";
        }
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
function filterData() {
    return __awaiter(this, void 0, void 0, function* () {
        clearTable();
        try {
            const response = yield fetch(url);
            const json = yield response.json();
            createTitlesTRow();
            let searchTerm = searchInput.value;
            let searchOption = searchOptions.value;
            let result;
            if (searchOption === "name" || searchOption === "rgb") {
                const regExp = new RegExp(`${searchTerm.toLowerCase()}`);
                result = json.filter((floss) => floss[searchOption].match(regExp))
                    .map((floss) => createTRowsFromSearchRes(floss));
            }
            else {
                result = json.filter((floss) => floss[searchOption].match(new RegExp(`^${searchTerm.toLowerCase()}`)))
                    .map((floss) => createTRowsFromSearchRes(floss));
            }
            if (result.length === 0)
                flossTable.innerHTML = `<p class='no-floss-found'>No flosses found by your query.</p>`;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
function clearTable() {
    flossTable.innerHTML = "";
}
function createTitlesTRow() {
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
        "Ljubica"
    ];
    titles.map((title) => {
        createTitleCell(title);
    });
    function createTitleCell(title) {
        let node = document.createElement("td");
        node.textContent = title;
        trNode.appendChild(node);
    }
    flossTable.appendChild(trNode);
}
function createTRowsFromSearchRes(floss) {
    let ulNode = document.createElement("tr");
    ulNode.classList.add(`floss-id-${floss.id}`);
    const cols = [
        "sample",
        "name",
        "rgb",
        "dmc",
        "anchor",
        "maxi",
        "sullivans",
        "coats",
        "ljubica"
    ];
    cols.map((col) => {
        createTDataCells(col);
    });
    function createTDataCells(brand) {
        let td = document.createElement("td");
        //td.classList.add(brand);
        brand === "sample"
            ? (td.style.backgroundColor = floss.hexa)
            : (td.textContent = floss[brand]);
        ulNode.appendChild(td);
    }
    flossTable.appendChild(ulNode);
}
