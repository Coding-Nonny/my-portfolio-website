class NonnyAlert {
  constructor(
    divName = "nonny-alert",
    $timeOut = 10000,
    position = "top-right",
    nonnyColor = "#241f2b"
  ) {
    this.nonnyTimeout = $timeOut;
    this.nonnyColor = nonnyColor;
    this.nonnyAlertDiv = document.querySelector(`${divName}`);
    if (!this.nonnyAlertDiv)
      throw new Error("No Container found for the alert box");
    this.nonnyAlertDiv.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeNonny();
    });
    this.position = position;
    if (this.position == "top-right")
      this.placement = "right: 2%; top: 2%; z-index:1000000";
    if (this.position == "top-left")
      this.placement = "left: 2%; top: 2%; z-index:1000000";
    if (this.position == "top-center")
      this.placement =
        "top: 7%; left: 50%; transform: translate(-50%, -50%); z-index:1000000";
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
  }
  alert_message(msg = "", type= "") {
    switch (type) {
      case "success":
        this.nonnyAlertDiv.style = `position: fixed;max-width:450px; width: fit-content;background: #4caf50; color: ${this.nonnyColor};padding: 8px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};font-weight: 700; border: 2px solid #ddd;word-wrap:break-word`;
        this.nonnyAlertDiv.innerHTML = `<span style="margin-right:10px; color: #f2f2f2; font-weight:900;font-size:22px;line-height:20px;cursor:pointer;">&check;</span> ${msg}`;
        this.hideNonnyAlert();
        break;
      case "danger":
        this.nonnyAlertDiv.style = `position: fixed;max-width:450px; width: fit-content;background: #f44336; color: ${this.nonnyColor};padding: 8px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};font-weight: 700;border: 2px solid #ddd; word-wrap:break-word`;
        this.nonnyAlertDiv.innerHTML = `<span style="margin-right:10px; color: #f2f2f2;font-weight:900;font-size:22px;line-height:20px;cursor:pointer;">&times;</span> ${msg}`;
        this.hideNonnyAlert();
        break;
      case "warning":
        this.nonnyAlertDiv.style = `position: fixed;max-width:450px; width: fit-content;background: #ff9800; color: ${this.nonnyColor};padding: 8px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19); ${this.placement};font-weight: 700;border: 2px solid #ddd;word-wrap:break-word`;
        this.nonnyAlertDiv.innerHTML = `<span style="margin-right:10px; color: #f2f2f2; font-weight:900;font-size:22px;line-height:20px;cursor:pointer;">&#x26A0;</span> ${msg}`;
        this.hideNonnyAlert();
        break;
      default:
        this.nonnyAlertDiv.style = `position: fixed;max-width:450px; width: fit-content;background: #f2f2f2; color: ${this.nonnyColor};padding: 8px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);${this.placement};font-weight: 700;border: 2px solid #ddd;word-wrap:break-word`;
        this.nonnyAlertDiv.innerHTML = `<span style="margin-right:10px; color: #242526; font-weight:900;font-size:22px;line-height:20px;cursor:pointer;">&#63;</span> ${msg}`;
        this.hideNonnyAlert();
        break;
    }
  }
  closeNonny() {
    this.nonnyAlertDiv.style.display = "none";
  }
  async hideNonnyAlert() {
    await new Promise(resolve => setTimeout(resolve, this.nonnyTimeout));
    this.nonnyAlertDiv.style.display = "none";
  }
  
  nonny_Conf(quest, callback) {
    const nonnyParentDiv = document.createElement("div");
    nonnyParentDiv.style =
      "position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.212);display: flex; justify-content: center;align-items: center;top:0;left:0;right:0;z-index: 1000000;";
    const nonnyContainerDiv = document.createElement("div");
    nonnyContainerDiv.style =
      `max-width: 450px; width: fit-content; background: ${this.nonnyColor};padding: 10px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0,0,0,0.19);border-radius: 5px;border: 2px solid #ddd;word-wrap:break-word;`;
    const nonnyStrong = document.createElement("p");
    nonnyStrong.style = "color: #eeeeee;font-weight:700;pointer-event: none";
    nonnyStrong.innerHTML = `${quest}`;
    const nonnyBtn = document.createElement("div");
    nonnyBtn.style =
      "width: 100%;display: flex;justify-content: flex-end;align-items: center;gap: 20px;";
    const nonnyOkBtn = document.createElement("button");
    nonnyOkBtn.style =
      "border: 2px solid #242526;background: #fff; color: #242526;outline: none;padding:5px 10px;font-size: 16px;font-weight: 600;border-radius: 5px;";
    const nonnyCancelBtn = document.createElement("button");
    nonnyCancelBtn.style =
      "border: 2px solid #ddd; background: #242526;color: #fff;outline: none;padding:5px 10px;font-size: 16px;font-weight: 600;border-radius: 5px;";
    nonnyCancelBtn.innerHTML = "No";
    nonnyOkBtn.innerHTML = "Yes";
    nonnyOkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      callback(true);
      document.body.removeChild(nonnyParentDiv);
    });
    nonnyCancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      callback(false);
      document.body.removeChild(nonnyParentDiv);
    });
    nonnyBtn.appendChild(nonnyOkBtn);
    nonnyBtn.appendChild(nonnyCancelBtn);
    nonnyContainerDiv.appendChild(nonnyStrong);
    nonnyContainerDiv.appendChild(nonnyBtn);
    nonnyParentDiv.appendChild(nonnyContainerDiv);
    document.body.appendChild(nonnyParentDiv);
  }

  alert_Confirm(msg) {
    return new Promise((resolve) => {
      this.nonny_Conf(msg, (callback) => {
        resolve(callback);
      });
    });
  }
}
