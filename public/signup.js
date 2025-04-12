Button_SignUp.onclick = SignUp;
    
    Input_Email.oninput = EmailCheck;
    Input_Fullname.oninput = InputCheck;
    Input_Password.oninput = PasswordCheck;
    Input_ConfirmPassword.oninput = ConfirmPasswordCheck;

    Input_Email.onkeydown = InputEnter;
    Input_Fullname.onkeydown = InputEnter;
    Input_Password.onkeydown = InputEnter;
    Input_ConfirmPassword.onkeydown = InputEnter;

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

    
    function ConfirmPasswordCheck()
    {
        if (this.value == Input_Password.value)
        {
            $(this).parent().removeClass("error");
            $(Text_ErrorConfirmPassword).hide();
            this.onblur = null;
            InputCheck();
        }
        else
        {
            this.onblur = function()
            {
                $(this).parent().addClass("error");
                $(Text_ErrorConfirmPassword).css("display", "grid");
                this.onblur = null;
                InputCheck();
            }
        }
    }

    function InputCheck()
    {
        let disabled = false;
        let inputs = [Input_Email, Input_Password, Input_ConfirmPassword, Input_Fullname];

        for (let input of inputs)
            if (input.value.trim() == "" || $(input).parent().hasClass("error"))
            {
                disabled = true;
                break;
            }

        Button_SignUp.disabled = disabled;
    }
    function InputEnter(e)
    {
        if (e.key == "Enter")
        {
            if (this == Input_Email)
                Input_Fullname.focus();
            else if (this == Input_Fullname)
                Input_Password.focus();
            else if (this == Input_Password)
                Input_ConfirmPassword.focus();
            else if (this == Input_ConfirmPassword)
                Button_SignUp.click();
        }
    }

    async function SignUp()
    {
        $(".panel").addClass("loading");
        $(".panel .inputs #Text_ErrorSignUp").hide();
        $(".panel .inputs input, .panel .inputs button").attr("disabled", "");
       
        try
        {
            const res = await fetch("/auth/signup", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    fullname: Input_Fullname.value, 
                    password: Input_Password.value,
                    email: Input_Email.value
                }),
            });

            if (res.ok == false)
                throw res;
            
            $(".panel").removeClass("loading");
            $(".panel .inputs input, .panel .inputs button").removeAttr("disabled");
            window.location.replace("/classroom");
        }
        catch (data)
        {
            $(".panel").removeClass("loading");
            $(".panel .inputs input, .panel .inputs button").removeAttr("disabled");
            
            if (data.status == 409)
            {
                $(".panel .inputs #Text_ErrorSignUp").html("Email sudah terdaftar di akun lain");
            }
            else if (data.status == 0)
            {
                $(".panel .inputs #Text_ErrorSignUp").html("Hubungkan ke internet");
            }
            else if (data.status >= 500 && data.status < 600)
            {
                $(".panel .inputs #Text_ErrorSignUp").html("Server sedang bermasalah. Coba lagi nanti.");
            }
            else
            {
                $(".panel .inputs #Text_ErrorSignUp").html("Ada sesuatu yang salah");
            }

            $(".panel .inputs #Text_ErrorSignUp").show();
            Input_Email.focus();
        }
    }