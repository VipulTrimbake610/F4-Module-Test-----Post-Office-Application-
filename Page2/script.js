// Header
const ipadd = document.getElementById('ipAdd');
const lat = document.getElementById('lat');
const long = document.getElementById('long');
const city = document.getElementById('city');
const region = document.getElementById('region');
const org = document.getElementById('org');
const hostname = document.getElementById('host');
const myFrame = document.getElementById('myFrame');

// section 2
const timezone = document.getElementById('timezone');
const date = document.getElementById('date');
const pin = document.getElementById('pin');
const msg = document.getElementById('msg');


// section 3
let offices = document.getElementById('offices');
let isearch = document.getElementById('iSearch');
let postOffices;

async function getIpData(){
    try{
       
        let ipData = JSON.parse(localStorage.getItem('ipData')); 
        let a = ipData.loc.split(","); 
        ipadd.innerText = ipData.ip;
        lat.innerText = a[0];
        long.innerText = a[1];
        city.innerText = ipData.city;
        region.innerText = ipData.region;
        org.innerText = ipData.org;  
        if(ipData.hostname == undefined){
            hostname.innerText = 'Not Available';
        }else{
            hostname.innerText = ipData.hostname;     
        }
        myFrame.src = `https://maps.google.com/maps?q=${ipData.loc}&z=15&output=embed`
        
        let datetime = new Date().toLocaleString("en-US", { timeZone: ipData.timeZone });
        response = await fetch(`https://api.postalpincode.in/pincode/${ipData.postal}`);
        let posts = await response.json();
        console.log(posts);
        
        timezone.innerText = ipData.timezone;
        date.innerText = datetime;
        pin.innerText = ipData.postal;
        msg.innerText = posts[0].Message;
    
        postOffices =  posts[0].PostOffice;
        getOffices(postOffices);
    }catch(error){
        alert("Some Error Occured!");
        console.log("An Error Occured : ",error);
    }

}


function getOffices(postOffices){
    offices.innerHTML = "";
    postOffices.forEach((e)=>{
        let office = document.createElement('div');
        office.className = 'office';
        office.innerHTML = `    <div>Name : <span id="name">${e.Name}<span></div>
                                <div>Branch Type : <span id="name">${e.BranchType}<span></div>
                                <div>Delivery Status : <span id="name">${e.DeliveryStatus}<span></div>
                                <div>District : <span id="name">${e.District}<span></div>
                                <div>Division : <span id="name">${e.Division}<span></div>`;
        offices.appendChild(office);
        
    });
}


isearch.addEventListener('keyup',(e)=>{
    let searchedValue = e.target.value;
    let filteredOffices = postOffices.filter((e)=>{
        if(e.Name.toLowerCase().includes(searchedValue.trim().toLowerCase()) || e.BranchType.toLowerCase().includes(searchedValue.trim().toLowerCase())){
            return true;
        }
        return false;
    });
    getOffices(filteredOffices)
});

getIpData();