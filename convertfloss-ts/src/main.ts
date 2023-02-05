 export {} // Why does this fix error: Duplicate Function Implementation ?

// Types of values that floss object will contain
interface Floss {
  [key: string] : string
}
  
  const url = "https://devfel.github.io/convertfloss/data/flosscolor.json";
  //const url = "../data/flosscolor.json"; //Local Data

  const form = <HTMLFormElement>document.querySelector('form');
  const flossTable = <HTMLDivElement>document.querySelector(".floss-table");
  const searchBtn = <HTMLButtonElement>document.querySelector('.search');
  const showAllBtn = <HTMLButtonElement>document.querySelector(".show-all");
  const searchInput = <HTMLInputElement>document.querySelector('#searchInput');
  const searchOptions = <HTMLSelectElement>document.querySelector("#ColumnValue");

  form.addEventListener('submit', (e) => {
    e.preventDefault()
  });
  searchInput.addEventListener('input', ()=> {
    filterData()
  });
  searchBtn.addEventListener('click', filterData);
  showAllBtn.addEventListener('click', fetchColors);

  fetchColors();

  async function fetchColors() {
    clearTable();
    try {
      const response = await fetch(url); // maybe store this so you don't have to fetch with every filterData()
      const json = await response.json();
      createTitlesTRow();
      json.forEach((floss : Floss) => createTRowsFromSearchRes(floss));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async function filterData() {
    clearTable();
    try {
      const response = await fetch(url);
      const json = await response.json();
      createTitlesTRow();
      let searchTerm : string = searchInput.value;
      let searchOption : string = searchOptions.value;
       if (searchOption === "name" || searchOption === "rgb") {
         json.filter((floss : Floss) => floss[searchOption].includes(searchTerm.toLowerCase()))
             .map((floss : Floss) => createTRowsFromSearchRes(floss))
       } else {
         json.filter((floss : Floss) => floss[searchOption].match(new RegExp(`^${searchTerm.toLowerCase()}`)) )
             .map((floss: Floss) => createTRowsFromSearchRes(floss))
      }
    } catch (err) {
       console.log(err);
      return []
    }
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
    ];

    titles.map((title : string) => {
      createTitleCell(title);
    });

    function createTitleCell(title:string) {
      let node = document.createElement("td");
      node.textContent = title;
      trNode.appendChild(node);
    }
    
    flossTable.appendChild(trNode);
  }

  function createTRowsFromSearchRes(floss : Floss) {
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
    ];

    cols.map((col) => {
      createTDataCells(col);
    });

    function createTDataCells(brand: string) {
      let td = document.createElement("td");
      //td.classList.add(brand);
      brand === "sample"
        ? (td.style.backgroundColor = floss.hexa)
        : (td.textContent = floss[brand]);
      ulNode.appendChild(td);

    }
    flossTable.appendChild(ulNode);

  }