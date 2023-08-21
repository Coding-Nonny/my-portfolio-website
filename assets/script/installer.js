 const message = new AlertNotify(10000, "top-left", "#000000");
// Delay in milliseconds before showing the install prompt (e.g., 30 seconds)
const delayBeforePrompt = 60000; // 60 seconds

// Check if the user has already made a decision during this session
const hasPrompted = sessionStorage.getItem("hasPrompted");

if (!hasPrompted && "getInstalledRelatedApps" in navigator) {
  // Function to show the install prompt
  const showInstallPrompt = () => {
    try {
      const relatedAppsPromise = navigator.getInstalledRelatedApps();

      if (relatedAppsPromise) {
        relatedAppsPromise
          .then((relatedApps) => {
            if (!relatedApps.length) {
              const installPrompt = async () => {
                let deferredPrompt;

                const promptListener = async (event) => {
                  event.preventDefault();
                  deferredPrompt = event;

                  if (await message.alert_Confirm("Install This Website as an app?")) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === "accepted") {
                        message.alert_message("App successfully installed", "success","positioned-modal");
                        // Update the flag to indicate successful installation
                        sessionStorage.setItem("hasPrompted", "true");
                      }
                      deferredPrompt = null;
                    });
                  } else {
                    message.alert_message("You declined", "info","positioned-modal");
                    sessionStorage.setItem("hasPrompted", "false");
                  }
                };

                window.addEventListener("beforeinstallprompt", promptListener);
              };

              installPrompt();
            }
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          });
      };
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // Function to delay the prompt
  const delayInstallPrompt = () => {
    setTimeout(() => {
      showInstallPrompt();
    }, delayBeforePrompt);
  };

  // Call the function to delay the prompt after a specific condition is met
  // For example, after the user clicks on a link or spends a certain amount of time on the website
  // Replace the condition below with your specific requirements
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" || target.closest("a")) {
      // User clicked on a link, delay the prompt
      delayInstallPrompt();
    }
  });
}
