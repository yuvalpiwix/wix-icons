/* --------------------------------- Template Data ------------------------------- */

// Prototype Panel
let panelInfo = {
  prototypeDescription : "...",
  prototypeHowToUse: "Explain how to start using the prototype (1-2 statements).",
  panelDirection : "..."
};

// The relevant data for the top bar:
let topbar = {
  topbarLogo: "wix", // wix / editorx
  topbarItems: [{ name: "My Sites", chevron: true, class: "topbar-my-site", popoverSrc:"./images/topbar/mysites-overlay.png", popoverBtn: "mySite" },
  { name: "Explore", chevron: true, popoverSrc:"./images/topbar/explore-overlay.png", popoverBtn: "explore" },
  { name: "Help", popoverSrc:"./images/topbar/help-overlay.png", popoverBtn: "help" }],
  topbarIcons: [
    { iconType: "Chat", iconTooltip: "Inbox", popoverSrc:"./images/topbar/inbox-overlay.png", popoverBtn:"inbox" },
    { iconType: "Notification", iconTooltip: "Notification", popoverSrc:"./images/topbar/notification-overlay.png", popoverBtn:"notification" },
    { iconType: "Promote", iconTooltip: "New Releases", popoverBtn:"newReleases"}],
  // topbarProfileImg: "https://static.wixstatic.com/media/11062b_c1e15248e1ed41cdbbfff226cdc37975~mv2.jpg/v1/crop/x_744,y_0,w_2233,h_2240/fill/w_147,h_147,al_c,q_80,usm_0.66_1.00_0.01/Model%20in%20Denim%20Shirt.webp",
  topbarProfileName: "John Doe", popoverBtn:"accountMenue"
}

// The relevant data for the sidebar:´
let sidebar = {
  sidebarApps: [{ name: "Blog", chevron: true }],
  sidebarServices: [
    { name: "Customer Management", chevron: true },
    { name: "Marketing & SEO", chevron: true },
    { name: "Analytics & Reports", chevron: true },
    { name: "Finances", chevron: true }],
  sidebarGeneralActions: [{ name: "Settings" },
  { name: "Apps", chevron: true },
  { name: "Content Manager" }]
}

/* The relevant data for the internal menus (you can add or remove mues):
   For example, if you add a new item to the main menu - you need to add its internal menu here. */
let drillInContent = [
  {
    for: "Blog",
    firstPage: "Published",
    structure: [
      { name: "Published" },
      { name: "Drafts" },
      { name: "Scheduled" },
      { name: "Trash" },
      { name: "Categories" }]
  },
  {
    for: "Customer Management",
    firstPage: "CRM Home",
    structure: [{ name: "Customer Management" },
    { name: "CRM Home" },
    { name: "Inbox" },
    { name: "Contact List" },
    { name: "Automations" },
    { name: "Workflows" },
    { name: "Tasks & Reminders" },
    { name: "Site Members" }]
  },
  {
    for: "Marketing & SEO",
    firstPage: "Markting Home",
    structure: [{ name: "Marketing & SEO" },
    { name: "Markting Home" },
    { name: "Get Found on Google" },
    { name: "SEO Tools" },
    { name: "Email Markting" },
    { name: "Google My Business" },
    { name: "Social Posts" },
    { name: "Video Maker" },
    { name: "Marketing Integrations" },
    { name: "Logo Maker" },
    { name: "Business Crads & More" },
    { name: "Triggered Emails" }]
  },
  {
    for: "Analytics & Reports",
    firstPage: "Traffic",
    structure: [{ name: "Analytics Overview" },
    { name: "Traffic" },
    { name: "Sales" },
    { name: "People" },
    { name: "Reports" },
    { name: "Alerts" },
    { name: "Insights" }]
  },
  {
    for: "Finances",
    firstPage: "Payments",
    structure: [{ name: "Finances" },
    { name: "Payments" },
    { name: "Price Quotes" },
    { name: "Invoices" },
    { name: "Financial Integrations" }]
  },
  {
    for: "Apps",
    firstPage: "Manage Apps",
    structure: [{ name: "Apps" },
    { name: "Manage Apps" },
    { name: "App Market" }]
  }
]

// The relevant data for the page header:
let contentHeader = {
  title:
    { name: "header 3", descr: "Decide what settings your customers can customize in the Wix Editor", backBtn: true },
  breadCrumbs:
    [{ name: "Breadcrumb 1" },
    { name: "Breadcrumb 2" },
    { name: "Breadcrumb 3" }],
  actionsBtns: [
    {
      type: "regular-btn", content: "button", skin: "premium", priority: "primary"
    },
    {
      type: "prefix-btn", content: "prefix", skin: "standard", priority: "secondary", iconUrl: "./images/sidebar/chevron-left.svg"
    },
    {
      type: "suffix-btn", content: "suffix", skin: "standard", priority: "primary", iconUrl: "./images/topbar/search-icon.svg"
    },
    {
      type: "icon-btn", size: "medium", skin: "light", priority: "primary", iconUrl: "./images/content/more-icon.svg"
    }
  ]
}
