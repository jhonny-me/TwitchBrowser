/**
 * Created by johnny on 01/01/2017.
 */
import React, {PropTypes, Component} from 'react'
import ItemView from './ItemView'
import $ from 'jquery'
require('../css/App.css')

const status = ['all', 'online', 'offline']
const baseAPI = ''
const users = []
const title = 'Twitch Borwser'

export default class App extends Component {

    // var datas = [];
    constructor(props) {
        super(props)
        this.state = {
            currentStatus: 'all',
            currentDatas: [1,1,1],
            datas: [],
        }
        this.handleStatusChange = this.handleStatusChange.bind(this)
    }

    componentDidMount() {

    }

    handleStatusChange(e) {
        const currentStatus = e.target.id
        status.forEach(function(s){
            $('#'+ s).removeClass('selected');
        })
        $('#' + currentStatus).addClass('selected');

        const newDatas = this.state.datas.filter(function(v){
            if (currentStatus == 'all') {
                return true
            }else {
                return v.status == currentStatus
            }
        })
        this.setState({currentStatus: currentStatus, currentDatas: newDatas})
    }

   render() {
        return (
            <div className="container">
                <div className="header">
                    <h2 className="title">{title}</h2>
                    <button className="labelBtn all selected" id="all" onClick={this.handleStatusChange}>all</button>
                    <button className="labelBtn online" id="online" onClick={this.handleStatusChange}>online</button>
                    <button className="labelBtn offline" id="offline" onClick={this.handleStatusChange}>offline</button>
                </div>
                {this.state.currentDatas.map(function(v){
                    return <ItemView/>
                })}
            </div>
        );
    }
}