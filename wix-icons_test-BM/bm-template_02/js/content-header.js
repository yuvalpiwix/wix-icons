function initContentHeader(contentHeader) {
    //breadCrumbs DOM
    let breadCrumbs = '';
    let breadCrumbsArray = contentHeader.breadCrumbs;
    // check if there is breadcrumbs
    if (breadCrumbsArray) {
        // add the breascrumbs items and chevrons
        for (i = 0; i < breadCrumbsArray.length; i++) {
            if (i != (breadCrumbsArray.length) - 1) {
                breadCrumbs +=
                    `<span class="breadcrumb-item">${breadCrumbsArray[i].name}</span>
                <i class="breadcrumb-icon" icon="ChevronRightLarge"></i>`
            }
            // last breadcrumb without chevron
            else {
                breadCrumbs +=
                    `<span class="breadcrumb-item">${breadCrumbsArray[i].name}</span>`
            }
        }
    }

    //header content DOM (breadcrumbs + backBtn + title + descr)
    let headerContent =
        `<div class="page-header-content">
        ${breadCrumbs ? `<div class="page-breadcrumb">${breadCrumbs}</div>` : ``}
        <span class="page-title">
            ${contentHeader.title.backBtn ? `<span class="page-title-chevron"><i icon="ChevronLeftLarge"></i></span>` : ``}
            <label class="page-title-label">${contentHeader.title.name}</label>
        </span>
        ${contentHeader.title.descr ? `<span class="title-descr">${contentHeader.title.descr}</span>` : ``}
    </div>`;

    // actions btns DOM
    let actionBtns = ``;
    if (contentHeader.actionsBtns) {
        // check the attributes of every btn and create DOM btn
        contentHeader.actionsBtns.forEach((actionsBtn) => {
            let icon = "";
            let addClass = "";
            let img = `<i icon="${actionsBtn.iconUrl}"></i>`;
            let text = `${actionsBtn.content}`;
            let size = "";
            let btnContent = "";
            // the type of the btn and thire attributes
            switch (actionsBtn.type) {
                case "regular-btn":
                    btnContent = text;
                    break;

                case "prefix-btn":
                    icon = `icon="prefix"`;
                    addClass = `pcu-button-affix`;
                    btnContent = img + text;
                    break;

                case "suffix-btn":
                    icon = `icon="suffix"`;
                    addClass = `pcu-button-affix`;
                    btnContent = text + img;
                    break;

                case "icon-btn":
                    size = `size="${actionsBtn.size}"`;
                    addClass = `pcu-icon-button`;
                    btnContent = img;
                    break;
            }
            //create DOM btns
            actionBtns += `<button class="pcu-button ${addClass}" skin="${actionsBtn.skin}" priority="${actionsBtn.priority}" ${icon} ${size} >
                        ${btnContent}
                        </button>`;
        });
    }

    // header actions DOM
    let headerActions =
        `<div class="page-header-actions">
            ${actionBtns}
        </div>`;

    // the div of the header DOM
    let header = headerContent + headerActions;
    document.querySelector('.page-header').insertAdjacentHTML('beforeend', header);

    //minimize header DOM
    let headerFixed = `<div class="header-fixed" style="display: none;">
                            <div class="page-header">
                                <div>${contentHeader.title.name}</div>
                                <div>${headerActions}</div>
                            </div>
                        </div>`
    document.querySelector('.page-stage').insertAdjacentHTML('afterbegin', headerFixed);

    //minimize header on scroll
    $(".page-stage").scroll(function () {
        if ($(".page-stage").scrollTop() > 72) {
            $(".header-fixed").show();
            $(".header-fixed").addClass("show-header");
        } else {
            $(".header-fixed").hide();
            $(".header-fixed").removeClass("show-header");
        }
    })

}
