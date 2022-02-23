/* This function builds the sidebar and the inside content for items that allow drill in, and appends it to the sidebar element in the index file.
Call this function from one of your .js files in the project.
Parameters: sidebar - the object with all the content of the sidebar.
            visibleContect[OPTIONAL] - the name of the menu (the name of the item leading to this menu) that you would like to display. */

function initSidebar(sidebar, visibleContect) {
  //start - create the header
  let header =
    `<div class="sidebar-header">
    <div class="sidebar-prog-bar">
      <div>
        <span class="sidebar-setup-title">Set Up Your Site</span>
        <div class="sidebar-setup-title-descr">
          <span class="sidebar-setup-steps">3 steps left</span>
          <img class="chevron-right-icon white-icon" src="./images/sidebar/chevron-right.svg"/>
        </div>
      </div>
      <div class="sidebar-prog-circ-wrapper">
        <div class="sidebar-prog-circ">
          <span class="sidebar-prog-circ-text">1/4<span/>
        </div>
        <div class="sidebar-prog-line"></div>
      </div>
    </div>
  </div>
  <span class="sidebar-divider"></span>`
  document.querySelector('.bm-sidebar').insertAdjacentHTML('beforeend', header);
  //end - create the header

  // side bar main parts
  let apps = generateItems(sidebar.sidebarApps);
  let services = generateItems(sidebar.sidebarServices);
  let generalActions = generateItems(sidebar.sidebarGeneralActions);

  //create siderbar items and their drillin content for each sidebar parts
  function generateItems(sidebarItems) {
    let items = "";
    //run on sidebar items array
    sidebarItems.forEach((sidebarItem, i) => {
      // check if there is a title between items and create the title
      if (sidebarItem.type == "title") {
        items += `<div class="sidebar-content-item item-title">
                    <div class="sidebar-item-title">${sidebarItem.name}</div>
                  </div>`
      } else {
        let drillinIndex;
        //run on sidebar drillin content array
        // check if there is a drillin content to the item in the array and saving the index of the drillin
        drillInContent.forEach((content, index) => {
          content.for == sidebarItem.name ? drillinIndex = index : "";
        })
        // create items that are not title & check if there is a chevron to the itmem
        items +=
          `<div class="sidebar-content-item collapsible" for="${sidebarItem.name}" tooltip=${sidebarItem.chevron ? "true" : "false"}>
              <div class="sidebar-item-text">${sidebarItem.name}</div>
              ${sidebarItem.chevron ? `<img class="chevron-right-icon white-icon" src="./images/sidebar/chevron-right.svg"/>` : ``}
          </div>
        ${sidebarItem.chevron ? drillinContent(drillinIndex) : ''}`
        // if chevron so create drilling content with the saven index
      }
    });

    //return itmes divs
    return items;

  }

  //start - create the content
  let content =
    `<div class="sidebar-content" delay="false">
    <div class="sidebar-main-content" content="main">
      <div class="sidebar-content-item selected">
        <div class="sidebar-item-text">Home</div>
      </div>
      ${apps}
      <span class="padding-divider">
        <span class="sidebar-divider"></span>
      </span>
      ${services}
      <span class="padding-divider">
        <span class="sidebar-divider"></span>
      </span>
      ${generalActions}
    </div>
  </div>`;
  document.querySelector('.bm-sidebar').insertAdjacentHTML('beforeend', content);
  //end - create the content

  //start - create the footer
  let footer =
    `<div class="sidebar-footer">
    <div class="sidebar-upgrade">
      <button class="upgrade-btn purple-btn">Upgrade</button>
    </div>
    <span class="sidebar-divider"></span>
    <div class="sidebar-quick-access">
      <img class="white-icon" src="./images/sidebar/quick-access-icon.svg"/>
      Quick Access
    </div>
  </div>`;
  document.querySelector('.bm-sidebar').insertAdjacentHTML('beforeend', footer);
  //end - create the footer

  // display sepsific page from the sidebar items
  if (visibleContect !== undefined && visibleContect != "" && visibleContect != "main") {
    // remove "selected" from all the items
    document.querySelectorAll(`.sidebar-content-item`).forEach((item) => {
      item.classList.remove("selected")
    });
    openDrillInItemContent(visibleContect)
  }
  // create the sidebar items events
  sidebarEvents();
}

// crates the drillin content of the sidebar items
function drillinContent(index) {
  let drillin = "";

  drillin +=
    `<div class="sidebar-drillin-content" content="${drillInContent[index].for}" page-data="${drillInContent[index].firstPage}">`;
  //run on sidebar drillin content array
  drillInContent[index].structure.forEach((item, index) => {
    // check if there is a title between items and create the title
    if (item.type == "title") {
      drillin +=
        `<div class="sidebar-content-item drillin-content item-title">
                <div class="sidebar-item-title">${item.name}</div>
              </div>`
    } else {
      // create items that are not title
      drillin +=
        `<div class="sidebar-content-item drillin-content" page-data="${item.name}">
            <div class="sidebar-item-text">${item.name}</div>
          </div>`
    }
    // add divider at the and of the drillin content
    drillin += `${item.divider ? `<span class="padding-divider"><span class="sidebar-divider"></span></span>` : ``}`;
  });
  drillin += `</div>`;

  //return drillin divs
  return drillin;
}

/* Defines the general events of the sidebar. */
function sidebarEvents() {
  let mainContent = document.querySelector(".sidebar-main-content");

  // Clicking on item in the sidebar
  let sidebarItems = document.querySelectorAll('.sidebar-content-item:not(.back-main-menu-btn):not(.item-title)')
  // add "click" & "hover" events to every sidebar itme
  sidebarItems.forEach((item) => {
    item.addEventListener('click', function () {
      selectSidebarItem(this);
      //show the chosen item drillin content
      collapsContent(this);
    });

    //start - on hover -> show/hide tooltip
    item.addEventListener("mouseover", function (event) {
      if (item.getAttribute("tooltip") == "true") {
        showTooltip(this, mainContent)
      }
    });

    item.addEventListener("mouseout", function (event) {
      hideTooltip()
    });
    //end - on hover -> show/hide tooltip
  });
}


/* Select the chosen item. */
function selectSidebarItem(selectedItem) {
  let sidebarItems = document.querySelectorAll(`.sidebar-content-item`);
  // remove "selected" from all the items
  sidebarItems.forEach((item) => { item.classList.remove("selected") });
  // add "selected" fto the chosen item
  selectedItem.classList.add("selected");

  if (selectedItem.classList.contains("collapsible")) {
    //first item inside drillin content
    let itemName = selectedItem.getAttribute("for");
    let drillinContent = document.querySelector(`.sidebar-drillin-content[content="${itemName}"]`);
    let firstItemDrillin = drillinContent.getElementsByClassName('sidebar-content-item')[0];

    //select first item inside drillin content
    firstItemDrillin.classList.add("selected");
    selectedItem.classList.remove("selected");
  }
}

// onClicking on item -> collapse the item content
function collapsContent(item) {
  //all sidebar Items
  let allSidebarItems = document.querySelectorAll(`.sidebar-content-item`)
  //the name of the sidebar item
  let itemName = item.getAttribute("for");
  //the drillin content of the item
  let drillinContent;
  //all drillin content
  let allDrillinContent = document.querySelectorAll(`.sidebar-drillin-content`);
  // all chevrons
  let allChevrons = document.querySelectorAll(`.chevron-right-icon`);
  //chevron
  let chevron = item.children[1];
  //delay collapse
  let collapseDelay = 0;
  //type of item that was clicked (sidebar item OR tooltip item)
  let clickItemType;

  //click on tooltip item
  if (!itemName) {
    clickItemType = "tooltipItem"
    //get tooltipItem his parent name (sidaebar item)
    itemName = $(item).parent()[0].attributes[1].value;
    //get tooltipItem his parent chevron
    chevron = document.querySelector(`.sidebar-content-item[for="${itemName}"]`).children[1];
    //add class sidebar item
    document.querySelector(`.sidebar-content-item[for="${itemName}"]`).classList.add("open-drillin-color");
  } else {
    //click on sidbar item
    clickItemType = "sidebarItem"
  }

  //drinlin content of the selected item
  drillinContent = document.querySelector(`.sidebar-drillin-content[content="${itemName}"]`);

  // click on drillin open
  if (drillinContent.style.maxHeight) {
    //click on sidebar item 
    if (clickItemType == "sidebarItem") {
      //close all collapse + chevrons
      allDrillinContent.forEach((drillinContent) => { drillinContent.style.maxHeight = null });
      allChevrons.forEach((chevron) => { chevron.classList.remove('chevron-up-icon') });
      allSidebarItems.forEach((sidebarItem) => { sidebarItem.classList.remove('open-drillin-color') });
    }
    //(else = clicking on tooltip item the the collapse will stay open)

    // click on drillin close
  } else {
    // if there is open drillin -> change delay
    allDrillinContent.forEach((drillinContent) => {
      if (drillinContent.style.maxHeight) {
        collapseDelay = 500;
      }
    });

    //close all collapse + chevrons
    allDrillinContent.forEach((drillinContent) => { drillinContent.style.maxHeight = null });
    allChevrons.forEach((chevron) => { chevron.classList.remove('chevron-up-icon') });
    allSidebarItems.forEach((sidebarItem) => { sidebarItem.classList.remove('open-drillin-color') });

    //open colapse drillin content
    setTimeout(() => {
      drillinContent.style.maxHeight = drillinContent.scrollHeight + "px";
      chevron.classList.add("chevron-up-icon");
    }, collapseDelay);

    //add class sidebar itemÍ
    item.classList.add("open-drillin-color")
    document.querySelector(`.sidebar-content-item[for="${itemName}"]`).classList.add("open-drillin-color");
  }

}

// display sepsific page from the sidebar items
function openDrillInItemContent(itemName) {
  let item = document.querySelector(`.sidebar-content-item[for="${itemName}"]`);
  selectSidebarItem(item);
  collapsContent(item);
}

function showTooltip(li) {
  let liPos = $(li).offset().top;
  let tooptilEl = $(".sidebar-tooltip-container .pcu-tooltip");
  let drillinIndex;
  drillInContent.forEach((content, index) => {
    content.for == li.getAttribute("for") ? drillinIndex = index : "";
  })
  tooptilEl.html(createTooltipContent(drillinIndex));
  tooptilEl.css("top", `${liPos + 0}px`).addClass("show");

  let tooltipItems = document.querySelectorAll(`.sidebar-tooltip-container .pcu-tooltip .sidebar-drillin-content .sidebar-content-item`);
  //clickble tooltip item
  for (i = 0; i < tooltipItems.length; i++) {
    let drillincontent = tooltipItems[i].parentElement;
    let drillinContentArrt = drillincontent.getAttribute("content");
    let sideBarItem = document.querySelector(`.sidebar-content-item[for="${drillinContentArrt}"]`);

    tooltipItems[i].addEventListener('click', function () {
      let pageData = this.getAttribute("page-data");
      let drillinItem = document.querySelector(`.drillin-content[page-data="${pageData}"]`)
      //select the item in the drillin content that was clicked in the tooltip
      selectSidebarItem(drillinItem);
      //collapse drillin content that belong to the clickble tooltip item
      collapsContent(drillinItem);
    })
  };
}

function hideTooltip() {
  let tooptilEl = $(".sidebar-tooltip-container .pcu-tooltip");
  tooptilEl.removeClass("show");
}

function createTooltipContent(i) {
  return `<div class="pcu-popover pcu-tooltip-content" dir="right">
  ${drillinContent(i)}
  </div>`
}
