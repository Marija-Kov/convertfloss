 export {} // Why does this fix error: Duplicate Function Implementation ?

  
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
    cleanTable();
    try {
      const response = await fetch(url);
      const json = await response.json();
      createTableTitles();
      json.forEach((floss) => createElementLIs(floss));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async function filterData() {
    cleanTable();
    try {
      const response = await fetch(url);
      const json = await response.json();
      createTableTitles();
      let searchTerm = searchInput.value;
      let searchOption = searchOptions.value;
       if (searchOption === "name" || searchOption === "rgb") {
       json.filter((floss) =>floss[searchOption].includes(searchTerm.toLowerCase()))
           .map((floss) => createElementLIs(floss))
       } else {
         json.filter((floss) =>floss[searchOption].match(new RegExp(`^${searchTerm.toLowerCase()}`)) )
             .map((floss) => createElementLIs(floss))
      }
    } catch (err) {
       console.log(err);
      return []
    }
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

    function createTitle(title:string) {
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

    function createListForBrand(brand:string) {
      let td = document.createElement("td");
      //td.classList.add(brand);
      brand === "sample"
        ? (td.style.backgroundColor = floss.hexa)
        : (td.textContent = floss[brand]);
      ulNode.appendChild(td);

    }
    flossTable.appendChild(ulNode);

  }