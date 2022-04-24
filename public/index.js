const Listbtn = document.getElementById('card-list')
const btn = document.getElementById('btn-three')
const btnLogin = document.getElementById('btn-login')
const inpUser = document.getElementById('input-user')
const formLogin = document.getElementById('form-login')
const btnList = document.getElementById('list-card')
const btnPaginate = document.getElementById('btn-three')
const inputSearch = document.getElementById('inp-search')
const buttonSearch = document.getElementById('btn-search')
const clearForm = document.getElementById('form-search')


const listCardCompaniesPage = async (numPage) => {
    try {
        const res = await fetch(`http://localhost:3000/companies?page=${numPage}`)
        const data = await res.json()
        return data.data
    } catch (error) {
        return error.message
    }
}

const paginate = (num) => {
    Listbtn.innerHTML = ""
    listCompanies(num)
}

const listCompanies = async (numPage) => {
    let data = await listCardCompaniesPage(numPage)
    btnPaginate.innerHTML = `<button class="btn-paginate" onclick="paginate(1)">1</button>
    <button class="btn-paginate" onclick="paginate(2)">2</button>
    <button class="btn-paginate" onclick="paginate(3)">3</button>`
    data.forEach(e => {
        company = document.createElement('div')
        company.innerHTML = `
        <div class = "list">
        <div class = "companyName">${e.name}</div>
        <div>${e.description.slice(0, 200)}...</div>
        <div class = "numJobs">Num of Jobs: ${e.numOfJobs}</div>
        </div>
        `
        Listbtn.appendChild(company)
        company.addEventListener('click', () => {
            btn.innerHTML = ""
            Listbtn.innerHTML = `<div class="box-detail">
            <div class = "detail">
            <div class = "companyName">${e.name}</div>
            <div>${e.description}</div>
            <div class = "numJobs">Num of Jobs: ${e.numOfJobs}</div>
            <button id="del-btn">Delete</button>
            </div>
            </div>`
            if (btnLogin.innerText === "Logout") {
                const deleteCompanies = document.getElementById("del-btn")
                deleteCompanies.addEventListener('click', () => {
                    var req = new XMLHttpRequest();
                    req.open("DELETE", `http://localhost:3000/companies/${e.id}`, false);
                    req.setRequestHeader("access-token", "123/json; charset=UTF-8")
                    req.send(null)
                    Listbtn.innerHTML = ""
                    listCompanies(1)
                })
            }
        })
    })
}

const fetDataSearch = async () => {
    try {
        const res = await fetch(`http://localhost:3000/companies`)
        const data = await res.json()
        console.log(data)
        inputSearch.addEventListener('change', event => {
            const e = data.data.find(e =>
                (event.target.value === e.name.toLowerCase())
            )
            event.target.value = ""
            Listbtn.innerHTML = ""
            btnList.innerHTML = ""
            company = document.createElement('div')
            company.innerHTML = `
                        <div class = "list">
                        <div class = "companyName">${e.name}</div>
                        <div>${e.description.slice(0, 200)}...</div>
                        <div class = "numJobs">Num of Jobs: ${e.numOfJobs}</div>
                        </div>
                        `
            Listbtn.appendChild(company)
            company.addEventListener('click', () => {
                btn.innerHTML = ""
                Listbtn.innerHTML = `<div class="box-detail">
                <div class = "detail">
                <div class = "companyName">${e.name}</div>
                <div>${e.description}</div>
                <div class = "numJobs">Num of Jobs: ${e.numOfJobs}</div>
                <button id="del-btn">Delete</button>
                </div>
                </div>`
                if (btnLogin.innerText === "Logout") {
                    const deleteCompanies = document.getElementById("del-btn")
                    deleteCompanies.addEventListener('click', () => {
                        var req = new XMLHttpRequest();
                        req.open("DELETE", `http://localhost:3000/companies/${e.id}`, false);
                        req.setRequestHeader("access-token", "123/json; charset=UTF-8")
                        req.send(null)
                        Listbtn.innerHTML = ""
                        listCompanies(1)
                    })
                }
            })
        })


    } catch (error) {
        console.log("error")
    }
}

btnLogin.addEventListener('click', () => {
    clearForm.innerHTML = ""
    if (btnLogin.textContent === "Login") {
        Listbtn.innerHTML = ""
        btn.innerHTML = ""
        login = document.createElement("div")
        login.innerHTML = `<div class="login-page">
        <div class = "form">
    <label>Username</label>
    <input id="user-inp" class = "input-submit"  type= "text" />
    <label>Password</label>
    <input id="pass-inp" class = "input-submit" type= "password" />
    <button class ="btn-submit"  id="user-form">Submit</button>
    <div>
    </div>
    `
        Listbtn.appendChild(login)
        const userForm = document.getElementById('user-form')
        userForm.addEventListener('click', () => {
            const inpUser = document.getElementById('user-inp')
            const inputPass = document.getElementById('pass-inp')
            if (inpUser.value !== "admin" || inputPass.value !== "admin") {
                console.log("Error")
            } else {
                var req = new XMLHttpRequest();
                req.open("POST", "http://localhost:3000/companies/admin", false);
                req.setRequestHeader("access-token", "123/json; charset=UTF-8")
                req.send({
                    "accessToken": "123"
                })
                Listbtn.innerHTML = ""
                listCompanies(1)
                btnLogin.textContent = "Logout"
            }
        })
    } else {
        btnLogin.textContent = "Login"
    }
})

btnList.addEventListener('click', () => {
    Listbtn.innerHTML = ""
    fetDataSearch()
    listCompanies(1)
})

fetDataSearch()
listCompanies(1)









