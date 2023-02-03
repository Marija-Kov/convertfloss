
  const url = "https://devfel.github.io/convertfloss/data/flosscolor.json";
  //const url = "../data/flosscolor.json"; //Local Data
  const table = ".floss-table";
  const form = document.querySelector('form');
  const flossTable = document.querySelector(table);
  let arrayColors = [];
  let searchTerm = null;
  let searchColumn = "name";

  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  init();

  function init() {
    fetchColors();
  }

  async function fetchColors() {
    cleanTable();
    try {
      const colorsRespose = await fetch(url);
      const colorsJSON = await colorsRespose.json();
      createTableTitles(flossTable);
      arrayColors = colorsJSON.map((floss) => floss);
      arrayColors.forEach((e) => createElementLIs(e, flossTable));
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
      createTableTitles(flossTable);
      let searchTerm = document.getElementById("searchInput").value;
      let searchColumn = document.getElementById("ColumnValue").value;
      if (searchColumn === "name" || searchColumn === "rgb") {
        arrayColors = colorsJSON.filter((floss) =>
          floss[searchColumn].includes(searchTerm.toLowerCase())
        );
      } else {
        arrayColors = colorsJSON.filter(
          (floss) => floss[searchColumn] === searchTerm.toLowerCase()
        );
      }

      arrayColors.forEach((e) => createElementLIs(e, flossTable));
    } catch (erro) {
      console.log(erro);
      return [];
    }
  }

  function cleanTable() {
    let cleanTable = flossTable;
    cleanTable.innerHTML = "";
  }

  function createTableTitles(container) {
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

    container.appendChild(trNode);
  }

  function createElementLIs(elem, container) {
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
    container.appendChild(ulNode);
  }







