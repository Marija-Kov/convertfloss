
  const url = "https://devfel.github.io/convertfloss/data/flosscolor.json";
  //const url = "../data/flosscolor.json"; //Local Data

  const form = document.querySelector('form');
  const flossTable = document.querySelector(".floss-table");
  const searchBtn = document.querySelector('.search');
  const showAllBtn = document.querySelector(".show-all");
  const searchInput = document.querySelector('#searchInput')
  const searchOptions = document.getElementById("ColumnValue");

  let arrayColors = [];
  let searchTerm = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })
  searchInput.addEventListener('input', ()=> {
    filterData()
  })
  searchBtn.addEventListener('click', filterData);
  showAllBtn.addEventListener('click', fetchColors)

  init();

  function init() {
    fetchColors();
  }

  async function fetchColors() {
    cleanTable();
    try {
      const colorsRespose = await fetch(url);
      const colorsJSON = await colorsRespose.json();
      createTableTitles();
      arrayColors = colorsJSON.map((floss) => floss);
      arrayColors.forEach((e) => createElementLIs(e));
    } catch (erro) {
      console.log(erro);
      return [];
    }
  }

  async function filterData() {
    cleanTable();
    try {
      const colorsRespose = await fetch(url);
      const colorsJSON = await colorsRespose.json();
      createTableTitles();
      let searchTerm = searchInput.value;
      let searchOption = searchOptions.value;
      if (searchOption === "name" || searchOption === "rgb") {
        arrayColors = colorsJSON.filter((floss) =>
          floss[searchOption].includes(searchTerm.toLowerCase())
        );
      } else {
        arrayColors = colorsJSON.filter((floss) =>
          floss[searchOption].match(new RegExp(`^${searchTerm.toLowerCase()}`))
        );
      }

      arrayColors.forEach((e) => createElementLIs(e));
    } catch (erro) {
      console.log(erro);
      return [];
    }
  }

  function cleanTable() {
    let cleanTable = flossTable;
    cleanTable.innerHTML = "";
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

  function createElementLIs(elem) {
    let ulNode = document.createElement("tr");
    ulNode.classList.add("floss-id-" + elem.id);

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
        ? (td.style.backgroundColor = elem.hexa)
        : (td.textContent = elem[brand]);
      ulNode.appendChild(td);
    }
    flossTable.appendChild(ulNode);
  }







