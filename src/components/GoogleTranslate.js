import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if script is already added
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;

      // Append script to body
      document.body.appendChild(script);

      // Define initialization function globally
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,zh,kn,te,ta,hi,ml", // Add more if needed
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };

      // Error handling
      script.onerror = () => {
        console.error("Google Translate script failed to load.");
      };
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
