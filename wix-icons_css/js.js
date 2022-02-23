$(document).ready(function () {
    let iconGeneralRule = `[icon] {vertical-align: -0.35em; display: inline-block;}`
    $("style").append(iconGeneralRule)
    wsrIcons.forEach(element => {

        let iconSvg = element.svg

        let iconSvgMain = iconSvg.split('<svg')[1];
        let iconSvgRepQ = iconSvgMain.replace(/"/g, "'");
        let iconSvgRepL = iconSvgRepQ.replace(/</g, "%3C");
        let iconSvgRepG = iconSvgRepL.replace(/>/g, "%3E");
        let iconSvgEncoded = iconSvgRepG;

        let iconUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'${iconSvgEncoded}`

        let iconRule = `[icon="${element.name}"]{content: url("${iconUrl}")}`

        $("style").append(iconRule)
        $(".iconRulesCss").append(iconRule)
    });

    const iconCssData = $("style").html()
    const blob = new Blob([iconCssData], {type:"octet-stream"})
    const href = URL.createObjectURL(blob)

    const a = Object.assign(document.createElement("a"),{
        href,
        style: "display:none",
        download: "iconsCss.css"
    })

    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(href)
    a.remove()

});