//Globais
var db = firebase.firestore();

//Usuário

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function (result) {
            console.log(result);
            window.alert("Logado na conta " + email);
            window.location.href = "../index.html";
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            window.alert("Falha ao logar. O email não existe ou a senha foi digitada errada!");
        });

}

function cadastro() {

    var usuarios = db.collection("users");

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var nascimento = document.getElementById("nascimento").value;
    var radio = document.getElementsByName("genero");
    var genero = getChecked(radio);

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function () {
            usuarios.doc(email).set({
                name: nome,
                email: email,
                birthday: nascimento,
                gender: genero,
            });
        })
        .catch(function (error) {
            usuarios.doc(email).get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!", doc.data());
                }
            }).catch(function (error) {
                console.log("Erro ao pegar o documento: ", error);
            });
        });

}

function logout() {
    var sure = window.confirm("Você está saindo da sua conta!\nTem certeza que deseja continuar?");
    if (sure) {
        firebase.auth().signOut().then(function () {
            window.location.href = "login.html";
        }, function (error) {
            console.error(error);
        });
    }
}

// Update de usuário

// Validação

function validacao(){
    var user = firebase.auth().currentUser;
    if (user == null) {
        window.location.href = "html/login.html";
    }
}