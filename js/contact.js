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
        // begin check / look for @ look for more than 1 of anything .+ look for . with escape \. then some other characters .+ end regex /
        let testEmail = /@.+\..+/.test(email);
        if(!testEmail) {
            document.getElementById("err-email").style.display = "block";
            isvalid = false;
        }
    }

    //google recommended: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ or /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //these seem waaaaay overcomplicated for what we are doing, but possibly worthwhile to just copy paste

    //if add mailing list is checked then email is required
    let mailinglist = document.getElementById("mailing").checked;
    if(mailinglist) {
        if (email == "") {
            //use the email required for mailing list error!
            document.getElementById("err-req-email").style.display = "block";
            isvalid = false;
        }
    }

    //if linked in address is provided then it must say linkedin.com/in
    //linkedin verification
    let linkurl = document.getElementById("linkedIn").value.trim();
    if(linkurl != "") {
        //must start ^ (wierd that : doesn't need an escape)
        let testLinkedIn = /^https:\/\/linkedin\.com\/in\//.test(linkurl);
        if(!testLinkedIn) {
            document.getElementById("err-linkedIn").style.display = "block";
            isvalid = false;
        }
    }

    //how we met is required
    let meet = document.getElementById("meeting").value;
    if(meet == "none") {
        document.getElementById("err-meeting").style.display = "block";
        isvalid = false;
    //if how we met is marked as other, something must be put in the field
    } else if(meet == "other") {
        let other = document.getElementById("other").value.trim();
        if(other == "") {
            document.getElementById("err-other").style.display = "block";
            isvalid = false;
        }
    }

    return isvalid;
}

//clearErrors function (sets the css to not display error messeges)
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}