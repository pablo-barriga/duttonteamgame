//e.target.closest("div")
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase,
    ref,
    update,
    onValue } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
const firebaseConfig = {
    databaseURL:"https://qualified-leads-tracker-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceinDB = ref(database,"teams")
const rcunicorns = []
const labubus = []

document.addEventListener('click', function(e){
    if(e.target.classList.contains("minus")){
        handleDecrement(e.target)
    }else if(e.target.classList.contains("plus")){
        handleIncrement(e.target)
    }
    

})



function handleDecrement(minus){
    let parentDiv = minus.closest("div")
    if(parentDiv.children[1].value == "" || parseInt(parentDiv.children[1].value) <= 0){
        parentDiv.children[1].value = 0;
        //Need to do a bit of testing, but I think I can get rid of the 
        //first part in the if statement
        
    }else{
        parentDiv.children[1].value = parseInt(parentDiv.children[1].value) - 1;
        const id = parentDiv.id
        const newVal = parentDiv.children[1].value
        const splitKey = id.split("-")
        const key = splitKey[0]
        const subKey = splitKey[1]
        const teamRef = ref(database, 'teams/'+key);
        console.log(teamRef)
        update(teamRef, {
            [subKey]: newVal,
        }).then(() => {
            console.log("Successfully updated values for labubus");
        });
        
    }
    
}
function handleIncrement(plus){
    let parentDiv = plus.closest("div")
    if(parentDiv.children[1].value == ""){
        parentDiv.children[1].value = 1;
        //Need to do a bit of testing, but I dont think I need this anymore
        
    }else{
        parentDiv.children[1].value = parseInt(parentDiv.children[1].value) + 1;
        const id = parentDiv.id
        const newVal = parentDiv.children[1].value
        const splitKey = id.split("-")
        const key = splitKey[0]
        const subKey = splitKey[1]
        const teamRef = ref(database, 'teams/'+key);
        console.log(teamRef)
        update(teamRef, {
            [subKey]: newVal,
        }).then(() => {
            console.log("Successfully updated values for labubus");
        });
        
    }
}
function datalabubus(key, values){

        Object.entries(values).forEach(([subKey, subValue]) => {
            const teamCS = document.getElementById(key + '-' + subKey)
            teamCS.children[1].value = subValue
    
        });
}
function datarcunicorns(key, values){
        Object.entries(values).forEach(([subKey, subValue]) => {
            const teamCS = document.getElementById(key + '-' + subKey)
            teamCS.children[1].value = subValue
          
        });
}

function render(){
    onValue(referenceinDB, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key; 
        const values = childSnapshot.val(); 

        if(key == "labubus"){
            datalabubus(key, values);
        }else{
            datarcunicorns(key,values);
        }
        // console.log(`Key: ${key}`);
        // Object.entries(values).forEach(([subKey, subValue]) => {
        // console.log(`  ${subKey}: ${subValue}`);
        // });
  });
});
}
render()