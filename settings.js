  const currentUser =
   localStorage.getItem("currentUser");
   
  const theme =
      document.getElementById("theme");

    /* THEME */

    theme.addEventListener("change", () => {

      if(theme.value === "light"){
        document.body.classList.add("light-mode");
      }
      else{
        document.body.classList.remove("light-mode");
      }

    });

    /* SAVE SETTINGS */

    function saveSettings(){

      localStorage.setItem(
        "username",
        document.getElementById("username").value
      );

      localStorage.setItem(
        "email",
        document.getElementById("email").value
      );

      localStorage.setItem("theme_" + currentUser, theme.value);

localStorage.setItem(
  "fontSize_" + currentUser,
  document.getElementById("fontSize" + currentUser).value
);

localStorage.setItem(
  "emailNotify_" + currentUser,
  document.getElementById("emailNotify").checked
);

localStorage.setItem(
  "taskReminder_" + currentUser,
  document.getElementById("taskReminder").checked
);

localStorage.setItem(
  "desktopNotify_" + currentUser,
  document.getElementById("desktopNotify").checked
);

localStorage.setItem(
  "showCompleted_" + currentUser,
  document.getElementById("showCompleted").checked
);

localStorage.setItem(
  "animations_" + currentUser,
  document.getElementById("animations").checked
);

localStorage.setItem(
  "autosave_" + currentUser,
  document.getElementById("autosave").checked
);

localStorage.setItem(
  "twofactor_" + currentUser,
  document.getElementById("twofactor").checked
);

localStorage.setItem(
  "remember_" + currentUser,
  document.getElementById("remember").checked
);

      applyFontSize(
        document.getElementById("fontSize").value
      );

      const message =
        document.getElementById("message");

      message.style.display = "block";

      setTimeout(() => {
        message.style.display = "none";
      },3000);

    }

    /* LOAD SETTINGS */

    
     window.onload = function () {

  const currentUser =
    localStorage.getItem("currentUser");

  document.getElementById("username").value =
    localStorage.getItem("username_" + currentUser) || "";

  document.getElementById("email").value =
    localStorage.getItem("email_" + currentUser) || "";

  const theme = document.getElementById("theme");
  theme.value =
    localStorage.getItem("theme_" + currentUser) || "dark";

  document.getElementById("fontSize").value =
    localStorage.getItem("fontSize_" + currentUser) || "Medium";

  document.getElementById("emailNotify").checked =
    localStorage.getItem("emailNotify_" + currentUser) === "true";

  document.getElementById("taskReminder").checked =
    localStorage.getItem("taskReminder_" + currentUser) === "true";

  document.getElementById("desktopNotify").checked =
    localStorage.getItem("desktopNotify_" + currentUser) === "true";

  document.getElementById("showCompleted").checked =
    localStorage.getItem("showCompleted_" + currentUser) !== "false";

  document.getElementById("animations").checked =
    localStorage.getItem("animations_" + currentUser) !== "false";

  document.getElementById("autosave").checked =
    localStorage.getItem("autosave_" + currentUser) !== "false";

  document.getElementById("twofactor").checked =
    localStorage.getItem("twofactor_" + currentUser) === "true";

  document.getElementById("remember").checked =
    localStorage.getItem("remember_" + currentUser) === "true";

  /* APPLY THEME */
  if (theme.value === "light") {
    document.body.classList.add("light-mode");
  }

  applyFontSize(
    document.getElementById("fontSize").value
  );
};

    function applyFontSize(size) {

  document.body.classList.remove(
    "small-font",
    "medium-font",
    "large-font"
  );

  if(size === "Small"){
    document.body.classList.add("small-font");
  }
  else if(size === "Large"){
    document.body.classList.add("large-font");
  }
  else{
    document.body.classList.add("medium-font");
  }

}

function saveProfile() {

    const currentUser =
        localStorage.getItem("currentUser");

    localStorage.setItem(
        "name_" + currentUser,
        document.getElementById("name").value
    );

    localStorage.setItem(
        "about_" + currentUser,
        document.getElementById("about").value
    );

    alert("Profile Saved");
}

document.getElementById("image")
.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const currentUser =
        localStorage.getItem("currentUser");

    const reader = new FileReader();

    reader.onload = function(){
       console.log("Saved for:", currentUser);

        localStorage.setItem(
            "profileImage_" + currentUser,
            reader.result
        );

    };

    reader.readAsDataURL(file);

});