// Encontrando disparidade

function euclidiana(base, user1, user2) {
    let si = [];
    for (let item in base[user1]) {
        if (item in base[user2]) {
            si.push(item);
        }
    }

    if (si.length === 0) {
        return 0;
    }

    let soma = 0;
    for (let i in si) {
        let item = si[i];
        soma += Math.pow(base[user1][item] - base[user2][item], 2);
    }

    return 1 / (1 + Math.sqrt(soma));

}

function getSimilaridade(base, usuario) {
    let similaridade = [];
    for (let outro in base) {
        if (outro !== usuario) {
            similaridade.push([euclidiana(base, usuario, outro) * 100, outro]);
        }
    }
    similaridade.sort();
    similaridade.reverse();
    return similaridade;
}

// Testando
// for (usuario in avaliacoes){
//     console.log(usuario+":")
//     console.log(getSimilaridade(avaliacoes, usuario));
// }