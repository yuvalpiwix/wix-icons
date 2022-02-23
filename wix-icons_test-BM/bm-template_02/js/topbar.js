/* This function builds the topbar, and appends it to the topbar element in the index file.
Call this function from one of your .js files in the project.
Parameters: topbsr - the object with all the content of the topbar. */

function initTopbar(topbar) {
  let topbarItems = "";
  let topbarIcons = "";
  // Init Left Part
  topbar.topbarItems.forEach((item) => {
    topbarItems += `<div class="topbar-links-item ${item.class ? item.class : ``} popoverBtn" for="${item.popoverBtn}">
    <div>${item.name}</div>
    ${item.chevron ? `<i class="chevron-down-icon" icon="ChevronDown"></i>` : ``}
    <div id="${item.popoverBtn}" class="topbar-popovers topbar-links-item-popover" style="display:none"><img src="${item.popoverSrc}"/></div>
    </div>`
  });
  let topbarLeftPart = `<div class="topbar-left-part">
  <div class="${topbar.topbarLogo}-logo">
  <img src="./images/topbar/${topbar.topbarLogo}-logo.svg"/>
  </div>
  <div class="topbar-links">
  ${topbarItems}
  </div>
  </div>`;
  document.querySelector('.bm-topbar').insertAdjacentHTML('beforeend', topbarLeftPart);
  // Init Right Part
  topbar.topbarIcons.forEach((icon, index) => {
    topbarIcons +=
      `<div class="topbar-icon pcu-tooltip popoverBtn" dir="bottom" for="${icon.popoverBtn}">
      <i icon=${icon.iconType}></i>
      <div class="pcu-popover pcu-tooltip-content">
      ${icon.iconTooltip} 
      </div> 
      ${icon.popoverSrc ? `<div id="${icon.popoverBtn}" class="topbar-popovers topbar-icon-popover" style="display:none"><img src="${icon.popoverSrc}"/></div>` : ``}
      </div>`
  });
  let topbarRightPart = `<div class="topbar-right-part">
  ${(topbar.topbarSearch == false) ? "" : `<div class="topbar-search">
  <i icon="SearchSmall"></i>
  <input class="topbar-search-input" placeholder="Search for tools, apps, help & more..." style="text-overflow: clip;">
  </div>
  <span class="topbar-divider"></span>`}
  <div class="topbar-icons-row">${topbarIcons}</div>
  <span class="topbar-divider"></span>
  <div class="topbar-profile popoverBtn" for="${topbar.popoverBtn}">
  ${topbar.topbarProfileImg ?
      `<div class="topbar-profile-img" style="background-image: url('${topbar.topbarProfileImg}');"></div>` :
      `<div class="topbar-profile-img"><img src="./images/topbar/profile-img.svg"/></div>`
    }
  <span class="topbar-profile-name">${topbar.topbarProfileName}</span>
  <i class="chevron-down-icon" icon="ChevronDown"></i>
  <div id="${topbar.popoverBtn}" class="topbar-popovers" style="display:none" ><img src="./images/topbar/account-menue.png"/></div>
  </div>
  </div>`;
  document.querySelector('.bm-topbar').insertAdjacentHTML('beforeend', topbarRightPart);

  $(window).resize(function () {
    if ($(window).width() < 1285) {
      console.log("small");
      $(".topbar-search-input").attr("placeholder", "Search");
    } else {
      $(".topbar-search-input").attr("placeholder", "Search for tools, apps, help & more...");
    }
  });

  $(".popoverBtn").click(function (e) {
    let popoverBtnName = $(this).attr("for");
    let popover = $(this)[0].children[popoverBtnName];
    if ($(popover).css('display') == 'block') {
      $(".topbar-popovers").hide();
    } else {
      $(".topbar-popovers").hide();
      $(popover).show();
    }
    if(popoverBtnName == "newReleases"){
      console.log("gg");
      $("#releasesPanel").toggleClass("show-releaspanel");
    }
  });

  $("#releasesPanel > div > svg").click(function (e) { 
    $("#releasesPanel").removeClass("show-releaspanel");
  });

  $(window).mouseup(function (e) {
    var container = $(".popoverBtn");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(".topbar-popovers").hide();
    }
  });
}