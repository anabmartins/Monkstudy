let users = []

let user = class {
    constructor(email, password, accType) {
        this.email = email
        this.password = password
        this.accType = accType
    }
}

if (localStorage.getItem("users") == null) {
    let defaultTeacher = new user("PROFESSOR@EMAIL.COM", "professorsenha", "teacher")
    let defaultStudent = new user("ALUNO@EMAIL.COM", "alunosenha", "student")
    users.push(defaultTeacher, defaultStudent)
    localStorage.setItem("users", JSON.stringify(users))
}

if (document.forms["loginForm"] != null) {
    document.forms["loginForm"].addEventListener("submit", () => {
        let form = document.forms["loginForm"]
        let email = form.elements["email"].value
        let password = form.elements["password"].value

        if (email.length != null && password.length != null) {
            let users = JSON.parse(localStorage.getItem("users"))
            users.every(user => {
                if (user.email != email.toUpperCase()) {
                    return true
                }
                if (user.password == password) {
                    window.location = window.location.toString().split("?")[0]
                    user.accType == "student" ? window.location.href = ("./home_aluno.html") : window.location.href = ("./home_professor.html")
                }
                else {
                    alert("Senha incorreta!")
                    return false
                }
            });
            alert("Email incorreto. Você possui uma conta?")
        }
        else {
            alert("Preencha todos os campos!")
        }
    })
}

if (document.forms["signupForm"] != null) {
    document.forms["signupForm"].addEventListener("submit", () => {
        let form = document.forms["signupForm"]
        let email = form.elements["email"].value
        let password = form.elements["password"].value
        let accType = form.elements["accType"].value

        if (email.length != null && password.length != null) {
            let users = JSON.parse(localStorage.getItem("users"))
            let newUser = new user(email.toUpperCase(), password, accType)
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users))
            alert("Usuário adicionado!")
            window.location = window.location.toString().split("?")[0]
            accType == "student" ? window.location.href = ("./home_aluno.html") : window.location.href = ("./home_professor.html")
        }
        else {
            alert("Preencha todos os campos!")
        }
    })
}