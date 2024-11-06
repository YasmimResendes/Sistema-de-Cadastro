    const KYE_BD = '@usuariosestudo'
    var listRegistros = {
        ultimoIdGerado:0,
        usuario:[
            { id:1, nome:'Larissa', telefone: '32 99000-0000' },
            { id:2, nome:'Yasmim', telefone: '55 99000-0001' },
            { id:3, nome:'Thais', telefone:'32 99000-0002' }
        ]
    };

    function gravarBD(){
        localStorage.setItem(JEY_BD, JSON.stringify(listRegistros))

    }

    function lerBD(){
       const data = localStorage.getItem(KYE_BD)
       if(data){
        listRegistros = JSON.parse(data)
       }
       gravarBD()
       desenhar()
       vizualizar('list')
       

    }



    function desenhar() {
        const tbody = document.getElementById('listRegistrosBody');
        if (tbody) {
            listRegistros.usuario.sort((a, b) => {
                if (a.id === b.id) {
                    return a.nome.localeCompare(b.nome); 
                }
                return a.id - b.id;  
            });
    
            tbody.innerHTML = listRegistros.usuario
                .map(usuario => {
                    return `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.telefone}</td>
                        <td><button onclick="editarUsuario(${usuario.id})">Editar</button></td>
                        <td><button onclick="deletarUsuario(${usuario.id})">Deletar</button></td>
                    </tr>`;
                })
                .join('');
        }
    }

    listRegistros.usuario.sort((a, b) => {
        if (a.id === b.id) {
            return a.nome.localeCompare(b.nome); // Ordenação alfabética pelo nome
        }
        return a.id - b.id;  // Ordenação por ID crescente
    });


    function insert(nome, telefone, id) {
        const idExistente = listRegistros.usuario.some(usuario => usuario.id === id);
        if (idExistente) {
            alert("Erro: O ID informado já está em uso.");
            return;
        }
    
        listRegistros.usuario.push({ id, nome, telefone });
        desenhar();
    }

    function editarUsuario(id,nome,telefone){
        alert(`Editar usuário com ID: ${id}`);

    }

    function deleteUsuario(id){
        listRegistros.usuario = listRegistros.usuario.filter(usuario => usuario.id !== id);
    desenhar();  
    }


    function salvarCadastro(e) {
        e.preventDefault(); 
    
        const nomeElement = document.getElementById('nome');
        const telefoneElement = document.getElementById('telefone');
        const idElement = document.getElementById('id');
    
        if (nomeElement && telefoneElement && idElement) {
            const nome = nomeElement.value;
            const telefone = telefoneElement.value;
            const id = parseInt(idElement.value, 10); 
    
            if (!id || id <= 0) {
                alert("Erro: O ID deve ser um número válido.");
                return;
            }
    
            insert(nome, telefone, id);
            vizualizar('lista'); 
        } else {
            console.error("Erro: Não foi possível encontrar os campos necessários.");
        }
    }
    
   function vizualizar(secao) {
    const listRegistrosElement = document.getElementById('listRegistros');
    const cadastroRegistros = document.getElementById('cadastroRegistros');

    if (secao === 'cadastro') {
        listRegistrosElement.style.display = 'none';
        cadastroRegistros.style.display = 'block';
    } else if (secao === 'lista') {
        listRegistrosElement.style.display = 'block';
        cadastroRegistros.style.display = 'none';
    }
}


function submeter(e) { 
    e.preventDefault();  
    const idElement = document.getElementById('id').value;
    const nomeElement = document.getElementById('nome').value;
    const telefoneElement = document.getElementById('telefone').value;

    if (idElement && nomeElement && telefoneElement) {
        const data = {
            ID: idElement.value,    
            Nome: nomeElement.value,
            Telefone: telefoneElement.value,
        };
        console.log(data); 
    } else {
        console.log("Não foram encontrados.");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('formCadastro');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', salvarCadastro);  // Captura o evento de submit
    } else {
        console.log("Elemento com ID 'formCadastro' não encontrado.");
    }
});
    window.addEventListener('load', () => {
        lerBD();
        const cadastroForm = document.getElementById('formCadastro');
        if (cadastroForm) {
            cadastroForm.addEventListener('submit', submeter); 
        } else {
            console.log("Elemento com ID 'formCadastro' não encontrado.");
        }
    });