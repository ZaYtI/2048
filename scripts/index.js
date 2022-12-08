const size = 4

function getRandomElement(){
    return Math.floor(Math.random() * 4)
}

const createMatrix = (size) => {
    const matrix = []
    for (let i = 0; i < size; i++) {    
        matrix.push([])
        for (let j = 0; j < size; j++) {    
            matrix[i].push(0)
        }
    }
    return matrix   
}
const matrix = createMatrix(size)


function createTab(matrix){
    let tab = document.createElement("div")
    tab.className = "container-grid"
    for(let i = 0; i < matrix.length; i++){
        let grid = document.createElement("div")
        grid.className = "grid"
        grid.setAttribute("id", i)
        for(let j = 0; j < matrix[i].length; j++){
            let cellule = document.createElement("div")
            cellule.className = "cellule"
            cellule.setAttribute("id", `${i}${j}`)
            let number = document.createElement("h1")
            number.setAttribute("id", `h1${i}${j}`)
            number.innerHTML = ""
            cellule.appendChild(number)
            grid.appendChild(cellule)
        }
        tab.appendChild(grid)
    }
    document.body.appendChild(tab)
}

function AddInMatrix(matrix){
    let i = getRandomElement();
    let j = getRandomElement();
    if(matrix[i][j]==0){
        let number = document.getElementById(`h1${i}${j}`)
        matrix[i][j]=2;
        number.innerHTML = matrix[i][j]
        number.animate([
            {opacity: 0},
            {opacity: 1}    
        ], {
            duration: 500,
            iterations: 1
        })
    }
    else{
        AddInMatrix(matrix);
    }
}

createTab(matrix)
AddInMatrix(matrix)

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            FusionGauchePossible(matrix)
            AddInMatrix(matrix)
            break;
        case 38:
            FusionHautPossile(matrix)
            AddInMatrix(matrix)
            break;
        case 39:
            FusionDroitePossible(matrix)
            AddInMatrix(matrix)
            break;
        case 40:
            FusionBasPossible(matrix)
            break;
    }
}


function FusionGauchePossible(matrix){
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix.length;j++){
            for(let k=0;k<matrix.length;k++){
                if(k==j && j<3){
                    k++
                }
                if(matrix[i][j]!=0 && matrix[i][k]==matrix[i][j] && k>j && j<4){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                }
                if(matrix[i][j]==0 && matrix[i][k]!=0 && k>j && j<4){
                    console.log(i,j,i,k," ","+a un voisins de droite non null est lui est nul")
                    matrix[i][j]=matrix[i][k]
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                }
            }
        }
    }
}


function FusionDroitePossible(matrix){
    for(let i=0;i<matrix.length;i++){
        for(let j=3;j>=0;j--){
            for(let k=3;k>=0;k--){
                if(k==j && j>0){
                    k--
                }
                if(matrix[i][j]!=0 && matrix[i][k]==matrix[i][j] && k<j && j>0){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                }
                if(matrix[i][j]==0 && matrix[i][k]!=0 && k<j && j>0){
                    console.log(i,j,i,k," ","+a un voisins de droite non null est lui est nul")
                    matrix[i][j]=matrix[i][k]
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                }
            }
        }
    }
}

function fusionDroiteGauche(i,j,k){
    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
    document.getElementById(`h1${i}${k}`).innerHTML=""
}


function FusionHautPossile(matrix){
    for(let j=0;j<matrix.length;j++){
        for(let i=0;i<matrix.length;i++){
            for(let k=0;k<matrix.length;k++){
                if(k==i && i<3){
                    k++
                }
                if(matrix[i][j]!=0 && matrix[k][j]==matrix[i][j] && k>i && i<4){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[k][j]=0
                    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
                    document.getElementById(`h1${k}${j}`).innerHTML=""
                }
                if(matrix[i][j]==0 && matrix[k][j]!=0 && k>i && i<4){
                    matrix[i][j]=matrix[k][j]
                    matrix[k][j]=0
                    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
                    document.getElementById(`h1${k}${j}`).innerHTML=""
                }
            }
        }
    }
}

function FusionBasPossible(matrix){
    for(let j=0;j<matrix.length;j++){
        for(let i=3;i>=0;i--){
            for(let k=3;k>=0;k--){
                if(k==i && i>0){
                    k--
                }
                if(matrix[i][j]!=0 && matrix[k][j]==matrix[i][j] && k<i && i>0){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[k][j]=0
                    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
                    document.getElementById(`h1${k}${j}`).innerHTML=""
                }
                if(matrix[i][j]==0 && matrix[k][j]!=0 && k<i && i>0){
                    matrix[i][j]=matrix[k][j]
                    matrix[k][j]=0
                    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
                    document.getElementById(`h1${k}${j}`).innerHTML=""
                }
            }
        }
    }
}


