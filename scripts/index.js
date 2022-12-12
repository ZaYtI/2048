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
        document.getElementById(`${i}${j}`).style.backgroundColor = chooseColor(matrix[i][j])
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
            nb = FusionGauchePossible(matrix)
            if(nb!=0){
                AddInMatrix(matrix)
            }
            break;
        case 38:
            nb = FusionHautPossile(matrix)
            if(nb!=0){
                AddInMatrix(matrix)
            }
            break;
        case 39:
            nb = FusionDroitePossible(matrix)
            if(nb!=0){
                AddInMatrix(matrix)
            }
            break;
        case 40:
            
            nb = FusionBasPossible(matrix)
            if(nb!=0){
                AddInMatrix(matrix)
            }
            break;
    }
}


function FusionGauchePossible(matrix){
    nb_fusion = 0
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix.length;j++){
            nb_voisins = 0
            for(let k=0;k<matrix.length;k++){
                if(k==j && j<3){
                    k++
                }
                if(matrix[i][j]!=0 && matrix[i][k]!=0 && k>j){
                    console.log(i,j,i,k)
                    console.log(i,j,"jai",nb_voisins)
                    nb_voisins ++
                }
                if(matrix[i][j]!=0 && matrix[i][k]!=0 && matrix[i][k]==matrix[i][j] && k>j && j<4 && nb_voisins<=1){
                    console.log("je suis la")
                    matrix[i][j]=matrix[i][j]*2
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                    nb_fusion ++
                    chooseColor(matrix[i][j])
                }
                if(matrix[i][j]==0 && matrix[i][k]!=0 && k>j && j<4){
                    matrix[i][j]=matrix[i][k]
                    matrix[i][k]=0
                    fusionDroiteGauche(i,j,k)
                    nb_fusion ++
                }
            }
        }
    }
    return nb_fusion
}


function FusionDroitePossible(matrix){
    nb_fusion=0
    for(let i=0;i<matrix.length;i++){
        for(let j=3;j>=0;j--){
            nb_voisins = 0;
            for(let k=3;k>=0;k--){
                if(k==j && j>0){
                    k--
                }
                if(matrix[i][j]!=0 && matrix[i][k]!=0 && k<j){
                    nb_voisins ++
                }
                if(matrix[i][j]!=0 && matrix[i][k]!=0 && matrix[i][k]==matrix[i][j] && k<j && j>0 && nb_voisins<=1){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[i][k]=0
                    nb_fusion++
                    fusionDroiteGauche(i,j,k)
                }
                if(matrix[i][j]==0 && matrix[i][k]!=0 && k<j && j>0){
                    console.log(i,j,i,k," ","+a un voisins de droite non null est lui est nul")
                    matrix[i][j]=matrix[i][k]
                    matrix[i][k]=0
                    nb_fusion++
                    fusionDroiteGauche(i,j,k)
                }
            }
        }
    }
    return nb_fusion
}

function fusionDroiteGauche(i,j,k){
    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
    document.getElementById(`h1${i}${k}`).innerHTML=""
    document.getElementById(`${i}${j}`).style.backgroundColor=chooseColor(matrix[i][j])
    document.getElementById(`${i}${k}`).style.backgroundColor=chooseColor(matrix[i][k])
}


function FusionHautPossile(matrix){
    nb_fusion=0
    for(let j=0;j<matrix.length;j++){
        for(let i=0;i<matrix.length;i++){
            nb_voisins=0
            for(let k=0;k<matrix.length;k++){
                if(k==i && i<3){
                    k++
                }
                if(matrix[i][j]!=0 && matrix[k][j]!=0 && k>i){
                    nb_voisins++
                }
                if(matrix[i][j]!=0 && matrix[k][j]!=0 && matrix[k][j]==matrix[i][j] && k>i && i<4 && nb_voisins<=1){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[k][j]=0
                    nb_fusion++
                    FusionBasetHaut(i,j,k)
                }
                if(matrix[i][j]==0 && matrix[k][j]!=0 && k>i && i<4){
                    matrix[i][j]=matrix[k][j]
                    matrix[k][j]=0
                    nb_fusion++
                    FusionBasetHaut(i,j,k)
                }
            }
        }
    }
    return nb_fusion
}

function FusionBasetHaut(i,j,k){
    document.getElementById(`h1${i}${j}`).innerHTML=matrix[i][j]
    document.getElementById(`h1${k}${j}`).innerHTML=""
    document.getElementById(`${i}${j}`).style.backgroundColor=chooseColor(matrix[i][j])
    document.getElementById(`${k}${j}`).style.backgroundColor=chooseColor(matrix[k][j])
}

function FusionBasPossible(matrix){
    nb_fusion=0
    for(let j=0;j<matrix.length;j++){
        for(let i=3;i>=0;i--){
            nb_voisins=0
            for(let k=3;k>=0;k--){
                if(k==i && i>0){
                    k--
                }
                if(matrix[i][j]!=0 && matrix[k][j]!=0 && k<i){
                    nb_voisins ++ 
                }
                if(matrix[i][j]!=0 && matrix[k][j]==matrix[i][j] && k<i && i>0 && nb_voisins<=1){
                    matrix[i][j]=matrix[i][j]*2
                    matrix[k][j]=0
                    nb_fusion++
                    FusionBasetHaut(i,j,k)
                }
                if(matrix[i][j]==0 && matrix[k][j]!=0 && k<i && i>0){
                    matrix[i][j]=matrix[k][j]
                    matrix[k][j]=0
                    nb_fusion++
                    FusionBasetHaut(i,j,k)
                }
            }
        }
    }
    return nb_fusion
}

function chooseColor(nb){
    switch(nb){
        case 0:
            return "#dedede "
        case 2:
            return "rgb(238, 228, 218)"
            break
        case 4:
            return "rgb(237, 224, 200)"
            break
        case 8:
            return "rgb(242, 177, 121)"
            break
        case 16:
            return "rgb(245, 149, 99)"
            break
        case 32:
            return "rgb(246, 124, 95)"
            break
        case 64:
            return "rgb(246, 94, 59)"
            break
        case 128:
            return "rgb(237, 207, 114)"
            break
        case 256:
            return "rgb(237, 204, 97)"
            break
        case 512:
            return "rgb(237, 200, 80)"
            break
        case 1024:
            return "rgb(237, 197, 63)"
            break
        case 2048:
            return "rgb(237, 194, 46)"
            break
        default:
            return "rgb(205, 193, 180)"
            break
    }
}