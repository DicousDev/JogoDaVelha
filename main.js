const celulas = document.querySelectorAll(".celula");

let checarTurno = true;
const jogadorX = "X";
const jogadorO = "O";

const combinacoes = [
    // Linhas
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 

    // Colunas
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 

    // Diagonais
    [0, 4, 8], 
    [2, 4, 6]  
];


document.addEventListener("click", (event) => {
    if(event.target.matches(`.celula`)) {
        Jogar(event.target.id);
    }
});

function Jogar(id) {
    const celulaClicked = document.getElementById(id);
    const turno = (checarTurno)? jogadorX : jogadorO;
    celulaClicked.textContent = turno;
    celulaClicked.classList.add(turno);

    ChecarVencedor(turno);
}

function ChecarVencedor(turno) {
    // Explicação da função
    // https://www.youtube.com/watch?v=-OzkboKR2_M&ab_channel=LucasCavalcante
    const vencedor = combinacoes.some((combinacao) => {
        return combinacao.every((index) => {
            return celulas[index].classList.contains(turno);
        });
    });
    
    if(vencedor) {
        EncerrarJogo(turno);
    }
    else if(ChecarEmpate()) {
        EncerrarJogo();
    }
    else {
        checarTurno = !checarTurno;
    }
}

function EncerrarJogo(vencedor = null) {
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);

    if(vencedor) {
        h2.innerHTML = `O player <span>${vencedor}</span> venceu`;
    }
    else {
        h2.innerHTML = `Empatou`;
    }

    let segundosParaReiniciar = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${segundosParaReiniciar--}`;
    }, 1000);

    // Reinicia página
    setTimeout(() => location.reload(), 4000);
}

function ChecarEmpate() {
    let x = 0;
    let o = 0;

    for(index in celulas) {
        if(!isNaN(index)) {
            if(celulas[index].classList.contains(jogadorX)) {
                x++;
            }
    
            if(celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        } 
    }

    return x + o === 9 ? true : false;
}