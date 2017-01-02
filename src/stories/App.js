/**
 * Created by johnny on 01/01/2017.
 */
import React, {PropTypes, Component} from 'react'
import ItemView from './ItemView'
import $ from 'jquery'
require('../css/App.css')

const status = ['all', 'online', 'offline']
const baseAPI = 'https://wind-bow.gomix.me/twitch-api/'
const users = ['freecodecamp',
    'storbeck','ESL_SC2', 'test_dontexists']
const title = 'Twitch Borwser'

function Item(json) {
    return {
        logo: json.logo,
        name: json.display_name,
        detail: json.stream.channel.status,
        url: json.stream.channel.url,
    }
}

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
        var originalDatas = []
        const that = this
        users.forEach(function(v){
            const url = baseAPI + 'users/' + v
            $.ajax({
                url: url,
                jsonp: "callback",
                dataType: "jsonp",
                success: function( json ) {
                    console.log( json ); // server response
                    var item = {name: v}
                    if (json._id){
                        item.name = json.display_name
                        item.logo = json.logo
                    }

                    const streamUrl = baseAPI + 'streams/' + v
                    $.ajax({
                        url: streamUrl,
                        dataType: 'jsonp',
                        success: function(newJson) {
                            console.log(newJson)
                            if (newJson.stream) {
                                item.detail = newJson.stream.channel.status
                                item.url = newJson.stream.channel.url
                                item.status = 'online'
                            }else {
                                item.status = 'offline'
                            }
                            originalDatas.push(item)
                            if (originalDatas.length === 4) {
                                that.setState({datas: originalDatas, currentDatas: originalDatas})
                            }
                        }
                    })
                }
            });
        })
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
                    return <ItemView id={v.name} detail={v.detail} name={v.name} logo={v.logo} nameUrl={v.url} status={v.status}/>
                })}
            </div>
        );
    }
}