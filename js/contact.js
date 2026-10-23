//alert("hello contact!");

document.getElementById("form").onsubmit = () => {
    
    //assume it's valid to start until we check
    let isvalid = true;

    //clear all the errors each time to recheck
    clearErrors();

    let fname = document.getElementById("fname").value.trim();
    if(fname === "") {
        document.getElementById("err-fname").style.display = "block";
        isvalid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if(lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isvalid = false;
    }

    // //make a variable label email, get elementby id email, get the value, trim it
    // let email = document.getElementById("email").value.trim();
    // //if email != "" (only check if they put something in it)
    // if(email != "") { 
    //     //check if email includes @ || .
    //     if (!email.includes("@") || !email.includes(".")) {
    //         document.getElementById("err-email").style.display = "block";
    //         isvalid = false;
    //     }
    // }

    //regex test version
    let email = document.getElementById("email").value.trim();
    if(email != "") {
        // begin check / look for @ look for more than 1 of anything .+ look for . with escape \. end regex /
        let testEmail = /@.+\./.test(email);
        if(!testEmail) {
            document.getElementById("err-email").style.display = "block";
            isvalid = false;
        }
    }


    //if email address is checked then we email is required

    //if linked in address is provided then it must say linkedin.com/in

    //how we met is required
    //if how we met is marked as other, something must be put in the field

    return isvalid;
}

//clearErrors function (sets the css to not display error messeges)
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}