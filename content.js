// "Ακούει για εισερχόμενα μηνύματατα script της επέκτασης ή άλλα στοιχεία.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Έλεγχος αν η ενέργεια του μηνύματος είναι "getSelectedText."
    if (message.action === "getSelectedText") {
      // Ανάκτηση του επιλεγμένου κειμένου στη σελίδα.
      const selectedText = window.getSelection().toString();
      sendResponse(selectedText);
    }
  });
