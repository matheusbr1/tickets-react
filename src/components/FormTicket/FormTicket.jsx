import React, {Component} from 'react'
import './FormTicket.css'

import $ from 'jquery'

export default class FormTicket extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            id: 0,
            nome : '',
            email: '',
            url: '',
            atividade: '',
            localArquivosRede: '',
            cardTrello: '',
            area: '',
            localAtividade: '',
            motivoAtividade: '',
            responsavel: 'Matheus',
            status: 'Pendente'
        }
        this.database = this.props.database
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
        this.getTime = this.getTime.bind(this)
    }

    // Biuld the time
    getTime () {
        let time = new Date()
    
        // Date
        let year = time.getFullYear()
        let mounth = time.getMonth()
        let day = time.getDate()
        let date = (day+'/'+mounth+'/'+year)
        
        // Time
        let hour = time.getHours()
        let minutes = time.getMinutes()
        let hours = (hour+':'+minutes)

        // Complete time
        let fullTime = (date+' | '+hours)

        console.log(fullTime)
        
        return fullTime        
    }

    onChange(event){
        const state = {...this.state}
        const field = event.target.id
        state[field] = event.target.value
        state["abertura"] = this.getTime()
        this.setState(state)
    }

    submit(e){
        e.preventDefault(e)

        // Clones the state and add id
        let state = {...this.state}
        state.id = Date.now()
        
        // Biuld the object for send
        let data = {}
        data[state.id] = state

       

        // Form validation
         alert = $('.alert.alert-danger')
         if(
             $('#nome').val() === '' ||
             $('#email').val() === '' ||
             $('#area').val() === 'Informe sua área' ||
             $('#localAtividade').val() === 'A atividade será executada em' ||
             $('#url').val() === '' ||
             $('#motivoAtividade').val() === 'Motivo da atividade' ||
             $('#atividade').val() === ''
         ){
             $('.alert.alert-danger').addClass('show')
         }else{
            // Send data for the firebase        
            this.database.update(data)
            
            //  Redirect the user for message
            window.location.href='/sended'
         }
    } 

    render () {
        return(
            <React.Fragment>
            <h4>Open Ticket</h4>

            <div className="alert alert-danger hide" role="alert">
                Preencha os campos obrigatórios!
            </div>

            <form className="form row" id="firebase-form">
                <div className="form-group col-md-12">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite o seu nome" 
                    id="nome" 
                    required 
                    value={this.state.nome}
                    onChange={this.onChange}/>
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group col-md-12">
                    <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Digite o seu e-mail" 
                    id="email" 
                    required 
                    value={this.state.email}
                    onChange={this.onChange} />
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group col-md-12">
                    <select 
                    className="custom-select" 
                    id="area" 
                    required 
                    value={this.state.area}
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
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group col-md-12">
                    <select 
                    className="custom-select" 
                    id="localAtividade" 
                    required
                    value={this.state.localAtividade}
                    onChange={this.onChange}>
                        <option>A atividade será executada em</option>
                        <option value="Home">Home</option>
                        <option value="Mercado">Mercado</option>
                        <option value="Mundos e categorias">Mundos e categorias</option>
                        <option value="Páginas especiais">Páginas especiais</option>
                    </select>
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group col-md-12">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="URL da página que será alterada"  
                    id="url" 
                    required 
                    value={this.state.url}
                    onChange={this.onChange}/>
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group col-md-12" >
                    <select
                    className="custom-select" 
                    id="motivoAtividade" 
                    required
                    value={this.state.motivoAtividade}
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
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group  col-md-12">
                    <textarea  
                    className="form-control" 
                    rows="2" id="atividade" 
                    required
                    placeholder="Descreva a atividade que deve ser feita" 
                    value={this.state.atividade}
                    onChange={this.onChange}>
                    </textarea>
                    <small id="messageValidation" className="form-text text-muted">Campo obrigatório!</small>
                </div>
                <div className="form-group  col-md-12">
                    <textarea  
                    className="form-control" 
                    rows="2" 
                    id="especifique" 
                    placeholder="Especifique o motivo (baseado na resposta anterior)"
                    value={this.state.especifique}
                    onChange={this.onChange}>
                    </textarea>
                </div>
                <div className="form-group col-md-12">
                    <input 
                    type="text" 
                    className="form-control" 
                    id="localArquivosRede" 
                    placeholder="Local dos arquivos na rede" 
                    value={this.state.localArquivosRede}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group col-md-12">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Card no Trello" 
                    id="cardTrello" 
                    value={this.state.cardTrello}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group col-md-12">
                    <select 
                    className="custom-select" 
                    id="responsavel" 
                    value={this.state.responsavel}
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
                    <select 
                    className="custom-select" 
                    id="status" 
                    value={this.state.status}
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