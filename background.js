// Χειρισμός του click στο μενού context για την αντιγραφή κειμένου
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyText" && info.selectionText) {
      const selectedText = info.selectionText;

      // Αντιγραφή του επιλεγμένου κειμένου στο πρόχειρο
      const input = document.createElement("textarea");
      input.value = selectedText;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  });

  // Δημιουργία ενός context menu για αναζήτηση κειμένου
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "searchText",
      title: "Search for '%s'",
      contexts: ["selection"]
    });
  });

  // Χειρισμός του κλικ στο context menu για αναζήτηση κειμένου
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchText" && info.selectionText) {
      const searchText = encodeURIComponent(info.selectionText);
      const searchUrl = `https://www.google.com/search?q=${searchText}`;

      chrome.tabs.create({ url: searchUrl });
    }
  });
