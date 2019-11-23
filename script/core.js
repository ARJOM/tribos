//Globais
let db = firebase.firestore();

//Usuário

function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
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

    let usuarios = db.collection("users");

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let nascimento = document.getElementById("nascimento").value;
    let radio = document.getElementsByName("genero");
    let genero = getChecked(radio);

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function () {
            usuarios.doc(email).set({
                name: nome,
                email: email,
                birthday: nascimento,
                gender: genero,
                minWantedAge: null,
                maxWantedAge: null,
                wantedGender: null,
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
    let sure = window.confirm("Você está saindo da sua conta!\nTem certeza que deseja continuar?");
    if (sure) {
        firebase.auth().signOut().then(function () {
            // window.location.href = "html/login.html";
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// Update de usuário

async function preencheUpdate() {
    let usuarios = db.collection("users");

    let email;
    let lista = document.getElementsByName("genero");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Há logado!");
            email = user.email;
            usuarios.doc(email).get().then(function (doc) {
                if (doc.exists) {
                    let usuario = doc.data()
                    document.getElementById("nome").value = usuario.name;
                    document.getElementById("email").value = email;
                    document.getElementById("nascimento").value = usuario.birthday;
                    for (let i = 0; i < lista.length; i++) {
                        if (lista[i].value === usuario.gender) {
                            lista[i].checked = true;
                        }
                    }
                }
            });
        } else {
            validacao();
        }
    });

    //



}

// Atualizando informações sobre o que o usuário procura
function busca() {
    let user = firebase.auth().currentUser;
    let email;
    if (user != null) {
        email = user.email;
    }
    let usuarios = db.collection("users");

    let minimo = document.getElementById("minimo").value;
    minimo = parseInt(minimo);
    let maximo = document.getElementById("maximo").value;
    maximo = parseInt(maximo);
    let radio = document.getElementsByName("genero");
    let genero = getChecked(radio);

    usuarios.doc(email).set({
        minWantedAge: minimo,
        maxWantedAge: maximo,
        wantedGender: genero,
    }, {
        merge: true
    });

}

// Validação

function validacaoIndex() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user == null) {
            window.location.href = "html/login.html";
        }
    });
}

function validacao() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user == null) {
            window.location.href = "login.html";
        }
    });
}
// Funções auxiliares

function getChecked(lista) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].checked) {
            return lista[i].value;
        }
    }
    return null;
}