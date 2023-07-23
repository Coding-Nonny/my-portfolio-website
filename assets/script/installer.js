const message = new AlertNotify(10000, "top-left", "#000000");

if ("getInstalledRelatedApps" in navigator) {
    try {
      const relatedAppsPromise = navigator.getInstalledRelatedApps();
  
      if (relatedAppsPromise) {
        relatedAppsPromise
          .then((relatedApps) => {
            if (!relatedApps.length) {
              const installPrompt = async () => {
                let deferredPrompt;
  
                window.addEventListener("beforeinstallprompt",  async (event) => {
                  event.preventDefault(); 
                  deferredPrompt = event; 
                  if(await message.alert_Confirm("Add This Website To home screen")){
                    deferredPrompt.prompt(); 
                    deferredPrompt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === "accepted") {
                        message.alert_message(
                          "App successfully added to the home screen",
                          "success"
                        );
                      } else {
                        message.alert_message("You declined", "info");
                      }
                    });
  
                    deferredPrompt = null; 
                  };
                });
              };
              installPrompt();
            }
          })
          .catch((error) => {
            message.alert_message(`Error: ${error}`, "danger");
          });
      }
    } catch (error) {
        message.alert_message(`Error: ${error}`, "danger");
    }
  }