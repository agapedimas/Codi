window.onload = function()
{
    Header_Check();
    $(".main").on("scroll", Header_Check);
    $("#Grid_Features .navigation [ad-name]").eq(0).addClass("active");
    $("#Grid_Features .content [ad-name]").eq(0).addClass("active");
}

function Header_Check()
{
    if (this.scrollTop > 90)
        Header.classList.add("scroll");
    else
        Header.classList.remove("scroll");
}

$("#Grid_Features > .navigation > [ad-name]").on("click", function()
{
    let name = this.getAttribute("ad-name");
    $("#Grid_Features [ad-name]").removeClass("active");
    $("#Grid_Features [ad-name=" + name + "]").addClass("active");
})

$("#Header > nav > a[ad-name]").on("click", function()
{
    let name = this.getAttribute("ad-name");
    $(".main")[0].scrollTop = $("#" + name)[0].offsetTop - 150;
})