async function ipAddress(){
    try{
        let response = await fetch('https://api.ipify.org?format=json');
        let ip = await response.json();
        ip = ip.ip;
        localStorage.setItem('ip',ip);
            let ipspan = document.getElementById('ipSpan');
            ipspan.innerText = ip;
    }catch(error){
        console.log("An Error Occured : ",error);
    }
}

ipAddress();

async function IPData(){
    try{

        let ip = localStorage.getItem('ip');
        let response = await fetch(`https://ipinfo.io/${ip}?token=233ab3f971fbd1`);
        let ipData = await response.json();
        localStorage.setItem('ipData',JSON.stringify(ipData))
        location.href = './Page2/index.html'
    }catch(error){
        console.log("An Error Occured : ",error);
    }
}

const started = document.getElementById('btnGetStarted');
started.addEventListener('click',(e)=>{
    IPData();
});

