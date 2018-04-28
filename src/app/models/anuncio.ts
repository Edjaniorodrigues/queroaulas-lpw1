export interface Anuncio{
    assunto: string;
    //materia: string;
    matSelecionada: string;
    horario: string;
    valor: string;
    //testando c essas duas variaveis
    user: string;
    email:string;
    //testando c essa variavel para respProf - mas penso que vai bugar os outros componentes
    //valorResp: string;
    /*respProf: [
        {valorResp: string, nomeProf: string }
    ];*/
    id?: string
}