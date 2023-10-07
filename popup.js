// Αναμονή για την πλήρη φόρτωση του DOM πριν από την εκτέλεση των ενεργειών
document.addEventListener("DOMContentLoaded", () => {
  // Επιλογή του στοιχείου "searchButton"
  const searchButton = document.getElementById("searchButton");

  // Προσθήκη ενός event listener στο "searchButton"
  searchButton.addEventListener("click", () => {
    // Λήψη του κειμένου που έχει καταχωρηθεί στο πεδίο "searchText"
    const searchText = document.getElementById("searchText").value;

    // Κατασκευή μιας διεύθυνσης URL αναζήτησης Google με το καταχωρημένο κείμενο
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;

    // Άνοιγμα νέας καρτέλας με τη διεύθυνση URL του μαρκαρισμένου κειμένου
    chrome.tabs.create({ url: searchUrl }, (tab) => {
      // Εκτέλεση ενός content script στη νέα ανοιχτή καρτέλα
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          // Λήψη του επιλεγμένου κειμένου στη σελίδα
          const selectedText = window.getSelection().toString();

          // Δημιουργία προσωρινής περιοχής για την "αντιγραφή" του κειμένου
          const textarea = document.createElement('textarea');
          textarea.value = selectedText;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);

          // Paste action στο Google search input bar
          const searchInput = document.querySelector('input[name="q"]');
          if (searchInput) {
            searchInput.focus();
            document.execCommand('paste');
          }
        }
      });
    });
  });
});
