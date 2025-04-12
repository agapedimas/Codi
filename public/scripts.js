Image_Profile.onclick = function()
{
    Components.PopOver.Open(PopOver_Profile, this);
}

Select_Theme.value = localStorage.getItem("theme") || "system";
Select_Theme.onchange = function()
{
    localStorage.setItem("theme", this.value);
    CheckTheme();
}

Button_SignOut.onclick = function()
{
    Components.ActionSheet.Open(
    {
        Title: "Apakah Anda yakin ingin keluar?",
        Description: "Anda bisa kembali masuk ke akun Anda kapan saja.",
        Actions: [
            { 
                Title: "Keluar", Type: "Options.Critical", 
                Action: o => window.location.href = "/signout"
            },
            { 
                Title: "Batal", Type: "Footer", 
                Action: Components.ActionSheet.Close
            }
        ]
    });
}