import React, {Component} from 'react'
import './Change.css'
import './Delete.css'

export default class Change extends Component {
    constructor(props){
        super(props)

        // Database conection
        this.database = props.database
        
        // Parse int ID because it's string
        this.id = window.location.search.slice(1)
        this.id = parseInt(this.id)

        this.state = ({
            ticket: []
        })

        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChange(event){
        const state = [...this.state.ticket]
        const field = event.target.id
        state[0][field] = event.target.value
        this.setState(state[0])
        console.log(state[0])
    }

    componentWillMount () {
        const data = [...this.state.ticket]
        const ticket_ref = this.database.orderByChild('id').equalTo(this.id)

        ticket_ref.on('child_added', snap => {
            data.push({
                id: snap.val().id,
                nome: snap.val().nome,
                email: snap.val().email,
                area: snap.val().area,
                atividade: snap.val().atividade,
                motivo: snap.val().motivoAtividade || 'Sem preenchimento',
                especifique: snap.val().especifique || 'Sem preenchimento',
                local: snap.val().localAtividade,
                url: snap.val().url,
                arquivos: snap.val().localArquivosRede || 'Sem preenchimento',
                trello:snap.val().cardTrello || 'Sem preenchimento',
                status: snap.val().status,
                responsavel: snap.val().responsavel,
                abertura: snap.val().abertura
            })
            this.setState({
                ticket: data
            })
        })
    }

    submit(e){
        e.preventDefault(e)

        // Clones the state
        let state = {...this.state.ticket[0]}
        
        // Biuld the object for send
        let data = {}
        data[state.id] = state

        // Send data for the firebase        
        this.database.update(data)
        
        //  User Redirect
        window.location.href= ('/ticketview?'+state.id)
    } 

    render(e){

        // console.log(this.state.ticket[0])

        e = {}
        this.state.ticket.map((ticket) => {return (
            e.id = ticket.id,
            e.nome = ticket.nome,
            e.email  = ticket.email,
            e.area = ticket.area,
            e.atividade = ticket.atividade,
            e.motivo = ticket.motivo,
            e.especifique = ticket.especifique,
            e.local = ticket.local,
            e.url = ticket.url,
            e.arquivos = ticket.arquivos,
            e.trello = ticket.trello, 
            e.status = ticket.status,
            e.responsavel = ticket.responsavel,
            e.abertura = ticket.abertura
        )})

        return(
            <React.Fragment>
                <h4>Edit Ticket {this.id}</h4>
                <div className="alert alert-danger hide" role="alert">
                    Preencha os campos obrigatórios!
                </div>
                <form className="form row" id="firebase-form-change">
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Nome:</strong> Campo obrigatório!</small>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder={e.nome}
                        id="nome" 
                        required 
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>E-mail:</strong> Campo obrigatório!</small>
                        <input 
                        type="email" 
                        className="form-control" 
                        placeholder={e.email}
                        id="email" 
                        required 
                        onChange={this.onChange} />
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Área:</strong> Campo obrigatório!</small>
                        <select 
                        className="custom-select"
                        value={e.area}
                        id="area" 
                        required 
                        onChange={this.onChange}>
                            <option>Informe sua área</option>
                            <option value="Desenvolvimento">Desenvolvimento</option>
                            <option value="Planejamento">Planejamento</option>
                            <option value="Criação">Criação</option>
                            <option value="Parcerias">Parcerias</option>
                            <option value="Marketplace">Marketplace</option>
                            <option value="Mercado">Mercado</option>
                            <option value="Tvs e áudio">Tvs e áudio</option>
                            <option value="Smartphones e tablets">Smartphones e tablets</option>
                            <option value="Informática, monitores e acessórios">Informática, monitores e acessórios</option>
                            <option value="Estilo, cultura e entretenimento">Estilo, cultura e entretenimento</option>
                            <option value="Auto e ferramentas">Auto e ferramentas</option>
                            <option value="Eletroportáteis">Eletroportáteis</option>
                            <option value="Eletromésticos">Eletromésticos</option>
                            <option value="Caso e Decoração">Caso e Decoração</option>
                            <option value="Esporte e Lazer">Esporte e Lazer</option>
                            <option value="Brinquedos e infantil">Brinquedos e infantil</option>
                            <option value="Fraldas">Fraldas</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Local da atividade:</strong> Campo obrigatório!</small>
                        <select 
                        className="custom-select" 
                        id="localAtividade" 
                        value= {e.atividade}
                        required
                        onChange={this.onChange}>
                            <option>A atividade será executada em</option>
                            <option value="Home">Home</option>
                            <option value="Mercado">Mercado</option>
                            <option value="Mundos e categorias">Mundos e categorias</option>
                            <option value="Páginas especiais">Páginas especiais</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>URL:</strong> Campo obrigatório!</small>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder={e.url} 
                        id="url" 
                        required 
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-12" >
                        <small id="messageValidation" className="form-text text-muted"><strong>Motivo:</strong></small>
                        <select
                        className="custom-select" 
                        id="motivoAtividade" 
                        value = {e.motivo}
                        required
                        onChange={this.onChange}>
                            <option>Motivo da atividade</option>
                            <option value="Troca diária ou semanal de conteúdo">Troca diária ou semanal de conteúdo</option>
                            <option value="Criação de novo conteúdo">Criação de novo conteúdo</option>
                            <option value="Exclusão de conteúdo">Exclusão de conteúdo</option>
                            <option value="Atualização de conteúdo">Atualização de conteúdo</option>
                            <option value="Alteração de conteúdo - Performance baixa">Alteração de conteúdo - Performance baixa</option>
                            <option value="Alteração de conteúdo - Erro de briefing da área Comercial">Alteração de conteúdo - Erro de briefing da área Comercial</option>
                            <option value="Alteração de conteúdo - Erro de briefing da área de Planejamento">Alteração de conteúdo - Erro de briefing da área de Planejamento</option>
                            <option value="Alteração de conteúdo - Erro de briefing da área de Parcerias">Alteração de conteúdo - Erro de briefing da área de Parcerias</option>
                            <option value="Alteração de conteúdo - Erro na arte (Criação)">Alteração de conteúdo - Erro na arte (Criação)</option>
                            <option value="Alteração de conteúdo - Erro de desenvolvimento (Front)">Alteração de conteúdo - Erro de desenvolvimento (Front)</option>
                            <option value="Alteração de conteúdo - Problemas sistêmicos ou operacionais (TI)">Alteração de conteúdo - Problemas sistêmicos ou operacionais (TI)</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div className="form-group  col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Atividade:</strong> Campo obrigatório!</small>
                        <textarea  
                        className="form-control" 
                        rows="2" id="atividade" 
                        required
                        placeholder={e.atividade}
                        onChange={this.onChange}>
                        </textarea>
                    </div>
                    <div className="form-group  col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Especifique:</strong></small>
                        <textarea  
                        className="form-control" 
                        rows="2" 
                        id="especifique" 
                        placeholder={e.especifique}
                        onChange={this.onChange}>
                        </textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Local dos arquivos na rede:</strong></small>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="localArquivosRede" 
                        placeholder={e.arquivos}
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Card trello:</strong></small>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder={e.trello}
                        id="cardTrello" 
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Responsável:</strong></small>
                        <select
                        value={e.responsavel} 
                        className="custom-select" 
                        id="responsavel" 
                        onChange={this.onChange}>
                            <option>Responsável</option>
                            <option value="Matheus">Matheus</option>
                            <option value="Kiria">Kiria</option>
                            <option value="Kiria">Fiama</option>
                            <option value="Rhandal">Rhandal</option>
                            <option value="Victor">Victor</option>
                            <option value="Cristiane">Cristiane</option>
                            <option value="Renee">Renee</option>
                            <option value="Raphael">Raphael</option>
                            <option value="Daniel">Daniel</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <small id="messageValidation" className="form-text text-muted"><strong>Status:</strong></small>
                        <select 
                        className="custom-select" 
                        id="status" 
                        onChange={this.onChange}>
                            <option>Status</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Executando">Executando</option>
                            <option value="Pausado">Pausado</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div className="div-btn form-group col-md-12">
                        <button 
                            type="submit" 
                            className="btn btn-cfr submit col-md-12"
                            onClick={this.submit}
                            >Enviar
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}