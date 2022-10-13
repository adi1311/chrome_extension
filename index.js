// chrome://extensions/
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")

let varr= JSON.parse(localStorage.getItem("myLeads"))
if(varr){
    myLeads=varr
    renderLeads()
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads()
    })
    
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    renderLeads()

})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads()

})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
