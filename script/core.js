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

    firebase.auth().onAuthStateChanged(function (user) {
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

}

function update() {
    let user = firebase.auth().currentUser;

    let usuarios = db.collection("users");

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let nascimento = document.getElementById("nascimento").value;
    let radio = document.getElementsByName("genero");
    let genero = getChecked(radio);

    let emailAtual = user.email;

    firebase.auth().signInWithEmailAndPassword(emailAtual, senha).then(function () {
        user.updateEmail(email).then(function () {
            usuarios.doc(emailAtual).set({
                name: nome,
                email: email,
                birthday: nascimento,
                gender: genero,
            }, {
                merge: true
            });
            usuarios.doc(emailAtual).get().then(function (doc) {
                if (doc.exists) {
                    let usuario = doc.data();
                    usuarios.doc(user.email).set(usuario); //Criando novo usuário
                    if (emailAtual !== user.email) {
                        usuarios.doc(emailAtual).delete().then(function () {}).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                }
            });


        }).catch(function (error) {
            window.alert("Email não pôde ser atualizado")
        });
    }).catch(function (error) {
        window.alert("Senha incorreta")
    });

    document.getElementById("senha").value = "";
}

// Atualizando informações sobre o que o usuário procura
function preencheBusca() {
    let usuarios = db.collection("users");

    let email;
    let lista = document.getElementsByName("genero");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Há logado!");
            email = user.email;
            usuarios.doc(email).get().then(function (doc) {
                if (doc.exists) {
                    let usuario = doc.data()
                    document.getElementById("minimo").value = usuario.minWantedAge;
                    document.getElementById("maximo").value = usuario.maxWantedAge;
                    for (let i = 0; i < lista.length; i++) {
                        if (lista[i].value === usuario.wantedGender) {
                            lista[i].checked = true;
                        }
                    }
                }
            });
        } else {
            validacao();
        }
    });

}

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

// Delete de usuário

function remove() {
    let usuarios = db.collection("users");
    var user = firebase.auth().currentUser;
    let senha = document.getElementById("senha").value;
    let email = user.email;
    firebase.auth().signInWithEmailAndPassword(email, senha).then(function () {
        usuarios.doc(email).delete().then(function () {
            user.delete().then(function () {
                //User deleted.
                console.log("")
            }).catch(function (error) {
                console.log("Remover")
            });
        }).catch(function (error) {
            window.alert("Error removing document: ", error);
        });
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