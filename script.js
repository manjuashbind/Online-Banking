// welcome msg

const loggedobj1=JSON.parse(localStorage.getItem('loggedobj'))
const username=loggedobj1.username;
document.getElementById("head").innerHTML=`Welcome ${username}`;


// Landingpage
function gotoregister(){
window.location='./register.html'

}
function gotolanding(){
    window.location='./index.html'
}
function gotologin(){

    window.location='./login.html'
}
// Register Page
        function register(event){
            event.preventDefault();

            if(uname.value==''|| accnum.value=='' || passwd.value==''){
                alert("Enter All Fields")
            }
            else{
                if(accnum.value in localStorage){
                    alert("User Already exist")
                    document.getElementById("formregister").reset()
                }
                else{
                    const userobj={
                        username:uname.value,
                        accnum:accnum.value,
                        passwd:passwd.value,
                        balance:0
                    }
                    localStorage.setItem(accnum.value,JSON.stringify(userobj))
                    alert("User Added Successfully")
                    document.getElementById("formregister").reset()
                    
                }
            }
        }
   
//Login Page

function login(event){
event.preventDefault();

if(acnum.value==''|| pswd.value==''){
    alert("Fill up all fields")
}
else{
    if(acnum.value in localStorage){
        const accobj=JSON.parse(localStorage.getItem(acnum.value))
        console.log(accobj);
        if(pswd.value==accobj.passwd){
            localStorage.setItem('loggedobj',JSON.stringify(accobj))
            // localStorage.setItem(username,accobj.accnum)
            window.location='./home.html'
                                    
        }
        else{
            alert("Incorrect Password :login Failed")
            document.getElementById("formlogin").reset()
        }
    }
    else{
        alert("Account Number does not exist")
        document.getElementById("formlogin").reset()
    }
}

}

//Home Page
function deposit(event){
    event.preventDefault();  
    const key=loggedobj1.accnum;  
    
    const loggedobj=JSON.parse(localStorage.getItem(key))   
    if(depamt.value=='' || deppswd.value==''){
        alert("Fill Up All details")
    }
    else{
        if(deppswd.value == loggedobj.passwd){
            //converting to number and adding 
             if(depamt.value <=0) {
                alert("Invalid Input")
                formdeposit.reset();
            }
             else{
                loggedobj.balance=parseFloat(loggedobj.balance)+parseFloat(depamt.value);
                      
                withdrawresult.innerHTML='';
                depositresult.innerHTML=`Amount Deposited ,Your Current Balance is Rs : ${loggedobj.balance}`;
                localStorage.setItem(loggedobj.accnum,JSON.stringify(loggedobj))
                formdeposit.reset();
                }
            
        }
        else{
             alert("Incorrect Password :Cannot Deposit ")
             formdeposit.reset();
            }
    }   
}

function withdraw(event){

    event.preventDefault();  
    const key=loggedobj1.accnum;  
    
    const loggedobj=JSON.parse(localStorage.getItem(key))   
    if(wamt.value=='' || wpswd.value==''){
        alert("Fill Up All details")
    }
    else{
        if(wpswd.value == loggedobj.passwd ){
             if(loggedobj.balance >= wamt.value)
            {
                if(wamt.value <=0 ){
                    alert("Invalid Amount ")
                    formwithdraw.reset();
                }
                else{//converting to number and subtraction 
                    console.log(loggedobj);   
                    loggedobj.balance=parseFloat(loggedobj.balance)-parseFloat(wamt.value);
                    
                    depositresult.innerHTML='';
                    withdrawresult.innerHTML=`Amount withdrawn,Your Current Balance is Rs : ${loggedobj.balance}`;
                    localStorage.setItem(loggedobj.accnum,JSON.stringify(loggedobj))
                    formwithdraw.reset();
                 }
            
            }
            else{ 
                depositresult.innerHTML='';
                withdrawresult.innerHTML=`Insufficient Balance , Available balance is Rs:${loggedobj.balance}`;
                formwithdraw.reset();
            }
        }
        else{
            alert("Incorrect Password :Cannot Withdraw ")
            formwithdraw.reset();
             }
    }
}

function logout(){
    localStorage.clear();
    window.location='./login.html'
}