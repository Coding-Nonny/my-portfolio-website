var AlertNotify = (function () {
  'use strict';

  class AlertNotify {
    constructor(
      _timeOut = 10000,
      position = "top-right",
      alertColor = "#241f2b",
      _confirmBoxColor = "#241f2b"
    ) {
      this.alertTimeout = _timeOut;
      this.alertColor = alertColor;
      this.notifyBox = document.createElement("div");
      this.notifyBox.setAttribute("id", "notification-box-of-boxes");
      this.timeoutId = null;
      this._confirmBoxColor = _confirmBoxColor;
      if (!this.notifyBox) throw new Error("No Container found");

      if (!Number.isInteger(this.alertTimeout))
        throw new Error("timing must be number");

      if (typeof position !== "string")
        throw new Error("position must be a string");

      if (typeof alertColor !== "string")
        throw new Error("color must be a string");

      const positionArray = Array(
        "center",
        "bottom-center",
        "bottom-right",
        "bottom-left",
        "top-center",
        "top-left",
        "top-right"
      );

      if (!positionArray.includes(position.toLowerCase()))
        throw new Error(
          "position property is invalid choose between: center,bottom-center,bottom-right,bottom-left,top-center,top-left,top-right"
        );
      this.position = position;
      if (this.position == "top-right")
        this.placement = "right: 2%; top: 2%; z-index:1000000";
      if (this.position == "top-left")
        this.placement = "left: 2%; top: 2%; z-index:1000000";
      if (this.position == "top-center")
        this.placement =
          "top: 4%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
      if (this.position == "center")
        this.placement =
          "top: 50%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
      if (this.position == "bottom-left")
        this.placement = "left: 2%; bottom: 2%; z-index:1000000";
      if (this.position == "bottom-right")
        this.placement = "right: 2%; bottom: 2%; z-index:1000000";
      if (this.position == "bottom-center")
        this.placement =
          "bottom: 5%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
      this.notifyBox.addEventListener("click", (e) => {
        e.preventDefault();
        this.hideOnClick();
      });
    }

    alert_message(msg = "", type = "") {
      const msgBox  = `${msg}`;
      let alertLoader = "";
      switch (type) {
        case "success":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;background: #4caf50; color: ${this.alertColor};padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement}; border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;`;
          this.notifyBox.innerHTML = `<p style="width:fit-content; padding:0 0 6px 0; margin-right:10px; color: #f2f2f2;font-size:18px;line-height:20px;cursor:pointer;">&check; ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id","alertLoader");
          alertLoader.style = "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        case "danger":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;background: #f44336; color: ${this.alertColor};padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};border: 2px solid #ddd; word-wrap:break-word;cursor:pointer;`;
          this.notifyBox.innerHTML = `<p style="width:fit-content; padding:0 0 6px 0; margin-right:10px; color: #f2f2f2;font-size:18px;line-height:20px;cursor:pointer;">&times; ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id","alertLoader");
          alertLoader.style = "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        case "warning":
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;background: #ff9800; color: ${this.alertColor};padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19); ${this.placement};border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;`;
          this.notifyBox.innerHTML = `<p style="width:fit-content; padding:0 0 6px 0; margin-right:10px; color: #f2f2f2;font-size:18px;line-height:20px;cursor:pointer;">&#x26A0; ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id","alertLoader");
          alertLoader.style = "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
        default:
          document.body.appendChild(this.notifyBox);
          this.notifyBox.style = `position: fixed;background: rgb(92, 66, 208); color: ${this.alertColor};padding: 10px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};border: 2px solid #ddd;word-wrap:break-word;cursor:pointer;`;
          this.notifyBox.innerHTML = `<p style="width:fit-content; padding:0 0 6px 0; margin-right:10px; color: #242526;font-size:18px;line-height:20px;cursor:pointer;">&#63; ${msgBox}</p>`;
          alertLoader = document.createElement("span");
          alertLoader.setAttribute("id","alertLoader");
          alertLoader.style = "position:absolute;width:100%;height:6px;background:linear-gradient(90deg,rgb(92, 66, 208),rgb(82, 75, 122)); border-radius:12px;left:0;bottom:0;transition:all 2s;";
          this.notifyBox.appendChild(alertLoader);
          break;
      }
    }

    async hideOnClick() {
      if (document.body.contains(this.notifyBox)) {
        document.querySelectorAll("#alertLoader").forEach(loadIngTimeOut => {
          loadIngTimeOut.style.width = "0";
        });
        await new Promise(resolve => setTimeout(resolve,2000));
        this.notifyBox.style.display = "none";
      }
    }

    async autoHide(callback) {
      try {
        if (callback) {
          if (document.body.contains(this.notifyBox)) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(async () => {
              document.querySelectorAll("#alertLoader").forEach(loadIngTimeOut => {
                loadIngTimeOut.style.width = "0";
              });
              await new Promise(resolve => setTimeout(resolve, 2000));
              document.body.removeChild(this.notifyBox);
            }, this.alertTimeout);
          } else {
            console.log(false);
          }
        }
      } catch (error) {
        return `An error occurred: ${error}`;
      }
    }

    shouldAutoHide(callback = true) {
      this.autoHide(callback);
    }

    triggerBox(quest, callback) {
      const alertParentDiv = document.createElement("div");
      alertParentDiv.style =
        "position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.212);display: flex; justify-content: center;align-items: center;top:0;left:0;right:0;z-index: 1000000;";
      const alertContainerDiv = document.createElement("div");
      alertContainerDiv.style = `max-width: 450px; width: fit-content; background: ${this._confirmBoxColor};padding: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);border-radius: 5px;border: 2px solid #ddd;word-wrap:break-word;`;
      const alertTextArea = document.createElement("p");
      alertTextArea.style = "color: #eeeeee;font-weight:700;pointer-event: none";
      alertTextArea.innerHTML = `${quest}`;
      const alertBtn = document.createElement("div");
      alertBtn.style =
        "width: 100%;display: flex;justify-content: flex-end;align-items: center;gap: 20px;";
      const alertOkBtn = document.createElement("button");
      alertOkBtn.style =
        "border: 2px solid #242526;background: #fff; color: #242526;outline: none;padding:5px 10px;font-size: 16px;font-weight: 600;border-radius: 5px;";
      const alertCancelBtn = document.createElement("button");
      alertCancelBtn.style =
        "border: 2px solid #ddd; background: #242526;color: #fff;outline: none;padding:5px 10px;font-size: 16px;font-weight: 600;border-radius: 5px;";
      alertCancelBtn.innerHTML = "No";
      alertOkBtn.innerHTML = "Yes";
      alertOkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        callback(true);
        document.body.removeChild(alertParentDiv);
      });
      alertCancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        callback(false);
        document.body.removeChild(alertParentDiv);
      });
      alertBtn.appendChild(alertOkBtn);
      alertBtn.appendChild(alertCancelBtn);
      alertContainerDiv.appendChild(alertTextArea);
      alertContainerDiv.appendChild(alertBtn);
      alertParentDiv.appendChild(alertContainerDiv);
      document.body.appendChild(alertParentDiv);
    }

    alert_Confirm(msg) {
      return new Promise((resolve) => {
        this.triggerBox(msg, (callback) => {
          resolve(callback);
        });
      });
    }
  }

  return AlertNotify;

})();