Button_SignIn.onclick = SignIn;
    
    Input_Email.oninput = EmailCheck;
    Input_Password.oninput = PasswordCheck;

    Input_Email.onkeydown = InputEnter;
    Input_Password.onkeydown = InputEnter;

    function EmailCheck()
    {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let valid = reg.test(this.value);

        if (valid)
        {
            $(this).parent().removeClass("error");
            $(Text_ErrorEmail).hide();
            this.onblur = null;
        }
        else
        {
            this.onblur = function()
            {
                $(this).parent().addClass("error");
                $(Text_ErrorEmail).css("display", "grid");
                this.onblur = null;
            }
        }

        InputCheck();
    }

    function PasswordCheck()
    {
        let reg = /^[^\s](?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}[^\s]$/;
        let valid = reg.test(this.value);

        if (valid)
        {
            $(this).parent().removeClass("error");
            $(Text_ErrorPassword).hide();
            $(Text_ErrorPasswordSpace).hide();
            this.onblur = null;
            InputCheck();
        }
        else
        {
            this.onblur = function()
            {
                $(this).parent().addClass("error");
                
                if (this.value.startsWith(" ") || this.value.endsWith(" "))
                {
                    $(Text_ErrorPassword).hide();
                    $(Text_ErrorPasswordSpace).css("display", "grid");
                }
                else
                {
                    $(Text_ErrorPassword).css("display", "grid");
                    $(Text_ErrorPasswordSpace).hide();
                }

                this.onblur = null;
                InputCheck();
            }
        }
    }

    function InputCheck()
    {
        let disabled = false;
        let inputs = [Input_Email, Input_Password];

        for (let input of inputs)
            if (input.value.trim() == "" || $(input).parent().hasClass("error"))
            {
                disabled = true;
                break;
            }

        Button_SignIn.disabled = disabled;
    }
    function InputEnter(e)
    {
        if (e.key == "Enter")
        {
            if (this == Input_Email)
                Input_Password.focus();
            else if (this == Input_Password)
                Button_SignIn.click();
        }
    }

    async function SignIn()
    {
        $(".panel").addClass("loading");
        $(".panel .inputs #Text_ErrorSignIn").hide();
        $(".panel .inputs input, .panel .inputs button").attr("disabled", "");
       
        try
        {
            const res = await fetch("/auth/signin", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    email: Input_Email.value,
                    password: Input_Password.value
                }),
            });

            if (res.ok == false)
                throw res;
            
            window.location.replace("/classroom");
        }
        catch (data)
        {
            $(".panel").removeClass("loading");
            $(".panel .inputs input, .panel .inputs button").removeAttr("disabled");
            
            if (data.status == 401)
            {
                $(".panel .inputs #Text_ErrorSignIn").html("Email atau password salah");
            }
            else if (data.status == 0)
            {
                $(".panel .inputs #Text_ErrorSignIn").html("Hubungkan ke internet");
            }
            else if (data.status >= 500 && data.status < 600)
            {
                $(".panel .inputs #Text_ErrorSignIn").html("Server sedang bermasalah. Coba lagi nanti.");
            }
            else
            {
                $(".panel .inputs #Text_ErrorSignIn").html("Ada sesuatu yang salah");
            }

            $(".panel .inputs #Text_ErrorSignIn").show();
            Input_Email.focus();
        }
    }